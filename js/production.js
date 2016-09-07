// jquery.event.move
//
// 1.3.6
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.


(function (module) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], module);
	} else {
		// Browser globals
		module(jQuery);
	}
})(function(jQuery, undefined){

	var // Number of pixels a pressed pointer travels before movestart
	    // event is fired.
	    threshold = 6,
	
	    add = jQuery.event.add,
	
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    // Shim for requestAnimationFrame, falling back to timer. See:
	    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    requestFrame = (function(){
	    	return (
	    		window.requestAnimationFrame ||
	    		window.webkitRequestAnimationFrame ||
	    		window.mozRequestAnimationFrame ||
	    		window.oRequestAnimationFrame ||
	    		window.msRequestAnimationFrame ||
	    		function(fn, element){
	    			return window.setTimeout(function(){
	    				fn();
	    			}, 25);
	    		}
	    	);
	    })(),
	    
	    ignoreTags = {
	    	textarea: true,
	    	input: true,
	    	select: true,
	    	button: true
	    },
	    
	    mouseevents = {
	    	move: 'mousemove',
	    	cancel: 'mouseup dragstart',
	    	end: 'mouseup'
	    },
	    
	    touchevents = {
	    	move: 'touchmove',
	    	cancel: 'touchend',
	    	end: 'touchend'
	    };


	// Constructors
	
	function Timer(fn){
		var callback = fn,
		    active = false,
		    running = false;
		
		function trigger(time) {
			if (active){
				callback();
				requestFrame(trigger);
				running = true;
				active = false;
			}
			else {
				running = false;
			}
		}
		
		this.kick = function(fn) {
			active = true;
			if (!running) { trigger(); }
		};
		
		this.end = function(fn) {
			var cb = callback;
			
			if (!fn) { return; }
			
			// If the timer is not running, simply call the end callback.
			if (!running) {
				fn();
			}
			// If the timer is running, and has been kicked lately, then
			// queue up the current callback and the end callback, otherwise
			// just the end callback.
			else {
				callback = active ?
					function(){ cb(); fn(); } : 
					fn ;
				
				active = true;
			}
		};
	}


	// Functions
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	function preventDefault(e) {
		e.preventDefault();
	}
	
	function preventIgnoreTags(e) {
		// Don't prevent interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }
		
		e.preventDefault();
	}

	function isLeftButton(e) {
		// Ignore mousedowns on any button other than the left (or primary)
		// mouse button, or when a modifier key is pressed.
		return (e.which === 1 && !e.ctrlKey && !e.altKey);
	}

	function identifiedTouch(touchList, id) {
		var i, l;

		if (touchList.identifiedTouch) {
			return touchList.identifiedTouch(id);
		}
		
		// touchList.identifiedTouch() does not exist in
		// webkit yet… we must do the search ourselves...
		
		i = -1;
		l = touchList.length;
		
		while (++i < l) {
			if (touchList[i].identifier === id) {
				return touchList[i];
			}
		}
	}

	function changedTouch(e, event) {
		var touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		// Chrome Android (at least) includes touches that have not
		// changed in e.changedTouches. That's a bit annoying. Check
		// that this touch has changed.
		if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

		return touch;
	}


	// Handlers that decide when the first movestart is triggered
	
	function mousedown(e){
		var data;

		if (!isLeftButton(e)) { return; }

		data = {
			target: e.target,
			startX: e.pageX,
			startY: e.pageY,
			timeStamp: e.timeStamp
		};

		add(document, mouseevents.move, mousemove, data);
		add(document, mouseevents.cancel, mouseend, data);
	}

	function mousemove(e){
		var data = e.data;

		checkThreshold(e, data, e, removeMouse);
	}

	function mouseend(e) {
		removeMouse();
	}

	function removeMouse() {
		remove(document, mouseevents.move, mousemove);
		remove(document, mouseevents.cancel, mouseend);
	}

	function touchstart(e) {
		var touch, template;

		// Don't get in the way of interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

		touch = e.changedTouches[0];
		
		// iOS live updates the touch objects whereas Android gives us copies.
		// That means we can't trust the touchstart object to stay the same,
		// so we must copy the data. This object acts as a template for
		// movestart, move and moveend event objects.
		template = {
			target: touch.target,
			startX: touch.pageX,
			startY: touch.pageY,
			timeStamp: e.timeStamp,
			identifier: touch.identifier
		};

		// Use the touch identifier as a namespace, so that we can later
		// remove handlers pertaining only to this touch.
		add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
		add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
	}

	function touchmove(e){
		var data = e.data,
		    touch = changedTouch(e, data);

		if (!touch) { return; }

		checkThreshold(e, data, touch, removeTouch);
	}

	function touchend(e) {
		var template = e.data,
		    touch = identifiedTouch(e.changedTouches, template.identifier);

		if (!touch) { return; }

		removeTouch(template.identifier);
	}

	function removeTouch(identifier) {
		remove(document, '.' + identifier, touchmove);
		remove(document, '.' + identifier, touchend);
	}


	// Logic for deciding when to trigger a movestart.

	function checkThreshold(e, template, touch, fn) {
		var distX = touch.pageX - template.startX,
		    distY = touch.pageY - template.startY;

		// Do nothing if the threshold has not been crossed.
		if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

		triggerStart(e, template, touch, distX, distY, fn);
	}

	function handled() {
		// this._handled should return false once, and after return true.
		this._handled = returnTrue;
		return false;
	}

	function flagAsHandled(e) {
		e._handled();
	}

	function triggerStart(e, template, touch, distX, distY, fn) {
		var node = template.target,
		    touches, time;

		touches = e.targetTouches;
		time = e.timeStamp - template.timeStamp;

		// Create a movestart object with some special properties that
		// are passed only to the movestart handlers.
		template.type = 'movestart';
		template.distX = distX;
		template.distY = distY;
		template.deltaX = distX;
		template.deltaY = distY;
		template.pageX = touch.pageX;
		template.pageY = touch.pageY;
		template.velocityX = distX / time;
		template.velocityY = distY / time;
		template.targetTouches = touches;
		template.finger = touches ?
			touches.length :
			1 ;

		// The _handled method is fired to tell the default movestart
		// handler that one of the move events is bound.
		template._handled = handled;
			
		// Pass the touchmove event so it can be prevented if or when
		// movestart is handled.
		template._preventTouchmoveDefault = function() {
			e.preventDefault();
		};

		// Trigger the movestart event.
		trigger(template.target, template);

		// Unbind handlers that tracked the touch or mouse up till now.
		fn(template.identifier);
	}


	// Handlers that control what happens following a movestart

	function activeMousemove(e) {
		var timer = e.data.timer;

		e.data.touch = e;
		e.data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeMouseend(e) {
		var event = e.data.event,
		    timer = e.data.timer;
		
		removeActiveMouse();

		endEvent(event, timer, function() {
			// Unbind the click suppressor, waiting until after mouseup
			// has been handled.
			setTimeout(function(){
				remove(event.target, 'click', returnFalse);
			}, 0);
		});
	}

	function removeActiveMouse(event) {
		remove(document, mouseevents.move, activeMousemove);
		remove(document, mouseevents.end, activeMouseend);
	}

	function activeTouchmove(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = changedTouch(e, event);

		if (!touch) { return; }

		// Stop the interface from gesturing
		e.preventDefault();

		event.targetTouches = e.targetTouches;
		e.data.touch = touch;
		e.data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeTouchend(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		removeActiveTouch(event);
		endEvent(event, timer);
	}

	function removeActiveTouch(event) {
		remove(document, '.' + event.identifier, activeTouchmove);
		remove(document, '.' + event.identifier, activeTouchend);
	}


	// Logic for triggering move and moveend events

	function updateEvent(event, touch, timeStamp, timer) {
		var time = timeStamp - event.timeStamp;

		event.type = 'move';
		event.distX =  touch.pageX - event.startX;
		event.distY =  touch.pageY - event.startY;
		event.deltaX = touch.pageX - event.pageX;
		event.deltaY = touch.pageY - event.pageY;
		
		// Average the velocity of the last few events using a decay
		// curve to even out spurious jumps in values.
		event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
		event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
		event.pageX =  touch.pageX;
		event.pageY =  touch.pageY;
	}

	function endEvent(event, timer, fn) {
		timer.end(function(){
			event.type = 'moveend';

			trigger(event.target, event);
			
			return fn && fn();
		});
	}


	// jQuery special event definition

	function setup(data, namespaces, eventHandle) {
		// Stop the node from being dragged
		//add(this, 'dragstart.move drag.move', preventDefault);
		
		// Prevent text selection and touch interface scrolling
		//add(this, 'mousedown.move', preventIgnoreTags);
		
		// Tell movestart default handler that we've handled this
		add(this, 'movestart.move', flagAsHandled);

		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function teardown(namespaces) {
		remove(this, 'dragstart drag', preventDefault);
		remove(this, 'mousedown touchstart', preventIgnoreTags);
		remove(this, 'movestart', flagAsHandled);
		
		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function addMethod(handleObj) {
		// We're not interested in preventing defaults for handlers that
		// come from internal move or moveend bindings
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		// Stop the node from being dragged
		add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);
		
		// Prevent text selection and touch interface scrolling
		add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
	}
	
	function removeMethod(handleObj) {
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
		remove(this, 'mousedown.' + handleObj.guid);
	}
	
	jQuery.event.special.movestart = {
		setup: setup,
		teardown: teardown,
		add: addMethod,
		remove: removeMethod,

		_default: function(e) {
			var event, data;
			
			// If no move events were bound to any ancestors of this
			// target, high tail it out of here.
			if (!e._handled()) { return; }

			function update(time) {
				updateEvent(event, data.touch, data.timeStamp);
				trigger(e.target, event);
			}

			event = {
				target: e.target,
				startX: e.startX,
				startY: e.startY,
				pageX: e.pageX,
				pageY: e.pageY,
				distX: e.distX,
				distY: e.distY,
				deltaX: e.deltaX,
				deltaY: e.deltaY,
				velocityX: e.velocityX,
				velocityY: e.velocityY,
				timeStamp: e.timeStamp,
				identifier: e.identifier,
				targetTouches: e.targetTouches,
				finger: e.finger
			};

			data = {
				event: event,
				timer: new Timer(update),
				touch: undefined,
				timeStamp: undefined
			};
			
			if (e.identifier === undefined) {
				// We're dealing with a mouse
				// Stop clicks from propagating during a move
				add(e.target, 'click', returnFalse);
				add(document, mouseevents.move, activeMousemove, data);
				add(document, mouseevents.end, activeMouseend, data);
			}
			else {
				// We're dealing with a touch. Stop touchmove doing
				// anything defaulty.
				e._preventTouchmoveDefault();
				add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
				add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
			}
		}
	};

	jQuery.event.special.move = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.move', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.move', jQuery.noop);
		}
	};
	
	jQuery.event.special.moveend = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.moveend', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.moveend', jQuery.noop);
		}
	};

	add(document, 'mousedown.move', mousedown);
	add(document, 'touchstart.move', touchstart);

	// Make jQuery copy touch event properties over to the jQuery event
	// object, if they are not already listed. But only do the ones we
	// really need. IE7/8 do not have Array#indexOf(), but nor do they
	// have touch events, so let's assume we can ignore them.
	if (typeof Array.prototype.indexOf === 'function') {
		(function(jQuery, undefined){
			var props = ["changedTouches", "targetTouches"],
			    l = props.length;
			
			while (l--) {
				if (jQuery.event.props.indexOf(props[l]) === -1) {
					jQuery.event.props.push(props[l]);
				}
			}
		})(jQuery);
	};
});

// jQuery.event.swipe
// 0.5
// Stephen Band

// Dependencies
// jQuery.event.move 1.2

// One of swipeleft, swiperight, swipeup or swipedown is triggered on
// moveend, when the move has covered a threshold ratio of the dimension
// of the target node, or has gone really fast. Threshold and velocity
// sensitivity changed with:
//
// jQuery.event.special.swipe.settings.threshold
// jQuery.event.special.swipe.settings.sensitivity

(function (module) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], module);
	} else {
		// Browser globals
		module(jQuery);
	}
})(function(jQuery, undefined){
	var add = jQuery.event.add,
	   
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    settings = {
	    	// Ratio of distance over target finger must travel to be
	    	// considered a swipe.
	    	threshold: 0.4,
	    	// Faster fingers can travel shorter distances to be considered
	    	// swipes. 'sensitivity' controls how much. Bigger is shorter.
	    	sensitivity: 6
	    };

	function moveend(e) {
		var w, h, event;

		w = e.target.offsetWidth;
		h = e.target.offsetHeight;

		// Copy over some useful properties from the move event
		event = {
			distX: e.distX,
			distY: e.distY,
			velocityX: e.velocityX,
			velocityY: e.velocityY,
			finger: e.finger
		};

		// Find out which of the four directions was swiped
		if (e.distX > e.distY) {
			if (e.distX > -e.distY) {
				if (e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
					event.type = 'swiperight';
					trigger(e.currentTarget, event);
				}
			}
			else {
				if (-e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
					event.type = 'swipeup';
					trigger(e.currentTarget, event);
				}
			}
		}
		else {
			if (e.distX > -e.distY) {
				if (e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
					event.type = 'swipedown';
					trigger(e.currentTarget, event);
				}
			}
			else {
				if (-e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
					event.type = 'swipeleft';
					trigger(e.currentTarget, event);
				}
			}
		}
	}

	function getData(node) {
		var data = jQuery.data(node, 'event_swipe');
		
		if (!data) {
			data = { count: 0 };
			jQuery.data(node, 'event_swipe', data);
		}
		
		return data;
	}

	jQuery.event.special.swipe =
	jQuery.event.special.swipeleft =
	jQuery.event.special.swiperight =
	jQuery.event.special.swipeup =
	jQuery.event.special.swipedown = {
		setup: function( data, namespaces, eventHandle ) {
			var data = getData(this);

			// If another swipe event is already setup, don't setup again.
			if (data.count++ > 0) { return; }

			add(this, 'moveend', moveend);

			return true;
		},

		teardown: function() {
			var data = getData(this);

			// If another swipe event is still setup, don't teardown.
			if (--data.count > 0) { return; }

			remove(this, 'moveend', moveend);

			return true;
		},

		settings: settings
	};
});
/*! Stellar.js v0.6.2 | Copyright 2013, Mark Dalgleish | http://markdalgleish.com/projects/stellar.js | http://markdalgleish.mit-license.org */
(function(e,t,n,r){function d(t,n){this.element=t,this.options=e.extend({},s,n),this._defaults=s,this._name=i,this.init()}var i="stellar",s={scrollProperty:"scroll",positionProperty:"position",horizontalScrolling:!0,verticalScrolling:!0,horizontalOffset:0,verticalOffset:0,responsive:!1,parallaxBackgrounds:!0,parallaxElements:!0,hideDistantElements:!0,hideElement:function(e){e.hide()},showElement:function(e){e.show()}},o={scroll:{getLeft:function(e){return e.scrollLeft()},setLeft:function(e,t){e.scrollLeft(t)},getTop:function(e){return e.scrollTop()},setTop:function(e,t){e.scrollTop(t)}},position:{getLeft:function(e){return parseInt(e.css("left"),10)*-1},getTop:function(e){return parseInt(e.css("top"),10)*-1}},margin:{getLeft:function(e){return parseInt(e.css("margin-left"),10)*-1},getTop:function(e){return parseInt(e.css("margin-top"),10)*-1}},transform:{getLeft:function(e){var t=getComputedStyle(e[0])[f];return t!=="none"?parseInt(t.match(/(-?[0-9]+)/g)[4],10)*-1:0},getTop:function(e){var t=getComputedStyle(e[0])[f];return t!=="none"?parseInt(t.match(/(-?[0-9]+)/g)[5],10)*-1:0}}},u={position:{setLeft:function(e,t){e.css("left",t)},setTop:function(e,t){e.css("top",t)}},transform:{setPosition:function(e,t,n,r,i){e[0].style[f]="translate3d("+(t-n)+"px, "+(r-i)+"px, 0)"}}},a=function(){var t=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,n=e("script")[0].style,r="",i;for(i in n)if(t.test(i)){r=i.match(t)[0];break}return"WebkitOpacity"in n&&(r="Webkit"),"KhtmlOpacity"in n&&(r="Khtml"),function(e){return r+(r.length>0?e.charAt(0).toUpperCase()+e.slice(1):e)}}(),f=a("transform"),l=e("<div />",{style:"background:#fff"}).css("background-position-x")!==r,c=l?function(e,t,n){e.css({"background-position-x":t,"background-position-y":n})}:function(e,t,n){e.css("background-position",t+" "+n)},h=l?function(e){return[e.css("background-position-x"),e.css("background-position-y")]}:function(e){return e.css("background-position").split(" ")},p=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)};d.prototype={init:function(){this.options.name=i+"_"+Math.floor(Math.random()*1e9),this._defineElements(),this._defineGetters(),this._defineSetters(),this._handleWindowLoadAndResize(),this._detectViewport(),this.refresh({firstLoad:!0}),this.options.scrollProperty==="scroll"?this._handleScrollEvent():this._startAnimationLoop()},_defineElements:function(){this.element===n.body&&(this.element=t),this.$scrollElement=e(this.element),this.$element=this.element===t?e("body"):this.$scrollElement,this.$viewportElement=this.options.viewportElement!==r?e(this.options.viewportElement):this.$scrollElement[0]===t||this.options.scrollProperty==="scroll"?this.$scrollElement:this.$scrollElement.parent()},_defineGetters:function(){var e=this,t=o[e.options.scrollProperty];this._getScrollLeft=function(){return t.getLeft(e.$scrollElement)},this._getScrollTop=function(){return t.getTop(e.$scrollElement)}},_defineSetters:function(){var t=this,n=o[t.options.scrollProperty],r=u[t.options.positionProperty],i=n.setLeft,s=n.setTop;this._setScrollLeft=typeof i=="function"?function(e){i(t.$scrollElement,e)}:e.noop,this._setScrollTop=typeof s=="function"?function(e){s(t.$scrollElement,e)}:e.noop,this._setPosition=r.setPosition||function(e,n,i,s,o){t.options.horizontalScrolling&&r.setLeft(e,n,i),t.options.verticalScrolling&&r.setTop(e,s,o)}},_handleWindowLoadAndResize:function(){var n=this,r=e(t);n.options.responsive&&r.bind("load."+this.name,function(){n.refresh()}),r.bind("resize."+this.name,function(){n._detectViewport(),n.options.responsive&&n.refresh()})},refresh:function(n){var r=this,i=r._getScrollLeft(),s=r._getScrollTop();(!n||!n.firstLoad)&&this._reset(),this._setScrollLeft(0),this._setScrollTop(0),this._setOffsets(),this._findParticles(),this._findBackgrounds(),n&&n.firstLoad&&/WebKit/.test(navigator.userAgent)&&e(t).load(function(){var e=r._getScrollLeft(),t=r._getScrollTop();r._setScrollLeft(e+1),r._setScrollTop(t+1),r._setScrollLeft(e),r._setScrollTop(t)}),this._setScrollLeft(i),this._setScrollTop(s)},_detectViewport:function(){var e=this.$viewportElement.offset(),t=e!==null&&e!==r;this.viewportWidth=this.$viewportElement.width(),this.viewportHeight=this.$viewportElement.height(),this.viewportOffsetTop=t?e.top:0,this.viewportOffsetLeft=t?e.left:0},_findParticles:function(){var t=this,n=this._getScrollLeft(),i=this._getScrollTop();if(this.particles!==r)for(var s=this.particles.length-1;s>=0;s--)this.particles[s].$element.data("stellar-elementIsActive",r);this.particles=[];if(!this.options.parallaxElements)return;this.$element.find("[data-stellar-ratio]").each(function(n){var i=e(this),s,o,u,a,f,l,c,h,p,d=0,v=0,m=0,g=0;if(!i.data("stellar-elementIsActive"))i.data("stellar-elementIsActive",this);else if(i.data("stellar-elementIsActive")!==this)return;t.options.showElement(i),i.data("stellar-startingLeft")?(i.css("left",i.data("stellar-startingLeft")),i.css("top",i.data("stellar-startingTop"))):(i.data("stellar-startingLeft",i.css("left")),i.data("stellar-startingTop",i.css("top"))),u=i.position().left,a=i.position().top,f=i.css("margin-left")==="auto"?0:parseInt(i.css("margin-left"),10),l=i.css("margin-top")==="auto"?0:parseInt(i.css("margin-top"),10),h=i.offset().left-f,p=i.offset().top-l,i.parents().each(function(){var t=e(this);if(t.data("stellar-offset-parent")===!0)return d=m,v=g,c=t,!1;m+=t.position().left,g+=t.position().top}),s=i.data("stellar-horizontal-offset")!==r?i.data("stellar-horizontal-offset"):c!==r&&c.data("stellar-horizontal-offset")!==r?c.data("stellar-horizontal-offset"):t.horizontalOffset,o=i.data("stellar-vertical-offset")!==r?i.data("stellar-vertical-offset"):c!==r&&c.data("stellar-vertical-offset")!==r?c.data("stellar-vertical-offset"):t.verticalOffset,t.particles.push({$element:i,$offsetParent:c,isFixed:i.css("position")==="fixed",horizontalOffset:s,verticalOffset:o,startingPositionLeft:u,startingPositionTop:a,startingOffsetLeft:h,startingOffsetTop:p,parentOffsetLeft:d,parentOffsetTop:v,stellarRatio:i.data("stellar-ratio")!==r?i.data("stellar-ratio"):1,width:i.outerWidth(!0),height:i.outerHeight(!0),isHidden:!1})})},_findBackgrounds:function(){var t=this,n=this._getScrollLeft(),i=this._getScrollTop(),s;this.backgrounds=[];if(!this.options.parallaxBackgrounds)return;s=this.$element.find("[data-stellar-background-ratio]"),this.$element.data("stellar-background-ratio")&&(s=s.add(this.$element)),s.each(function(){var s=e(this),o=h(s),u,a,f,l,p,d,v,m,g,y=0,b=0,w=0,E=0;if(!s.data("stellar-backgroundIsActive"))s.data("stellar-backgroundIsActive",this);else if(s.data("stellar-backgroundIsActive")!==this)return;s.data("stellar-backgroundStartingLeft")?c(s,s.data("stellar-backgroundStartingLeft"),s.data("stellar-backgroundStartingTop")):(s.data("stellar-backgroundStartingLeft",o[0]),s.data("stellar-backgroundStartingTop",o[1])),p=s.css("margin-left")==="auto"?0:parseInt(s.css("margin-left"),10),d=s.css("margin-top")==="auto"?0:parseInt(s.css("margin-top"),10),v=s.offset().left-p-n,m=s.offset().top-d-i,s.parents().each(function(){var t=e(this);if(t.data("stellar-offset-parent")===!0)return y=w,b=E,g=t,!1;w+=t.position().left,E+=t.position().top}),u=s.data("stellar-horizontal-offset")!==r?s.data("stellar-horizontal-offset"):g!==r&&g.data("stellar-horizontal-offset")!==r?g.data("stellar-horizontal-offset"):t.horizontalOffset,a=s.data("stellar-vertical-offset")!==r?s.data("stellar-vertical-offset"):g!==r&&g.data("stellar-vertical-offset")!==r?g.data("stellar-vertical-offset"):t.verticalOffset,t.backgrounds.push({$element:s,$offsetParent:g,isFixed:s.css("background-attachment")==="fixed",horizontalOffset:u,verticalOffset:a,startingValueLeft:o[0],startingValueTop:o[1],startingBackgroundPositionLeft:isNaN(parseInt(o[0],10))?0:parseInt(o[0],10),startingBackgroundPositionTop:isNaN(parseInt(o[1],10))?0:parseInt(o[1],10),startingPositionLeft:s.position().left,startingPositionTop:s.position().top,startingOffsetLeft:v,startingOffsetTop:m,parentOffsetLeft:y,parentOffsetTop:b,stellarRatio:s.data("stellar-background-ratio")===r?1:s.data("stellar-background-ratio")})})},_reset:function(){var e,t,n,r,i;for(i=this.particles.length-1;i>=0;i--)e=this.particles[i],t=e.$element.data("stellar-startingLeft"),n=e.$element.data("stellar-startingTop"),this._setPosition(e.$element,t,t,n,n),this.options.showElement(e.$element),e.$element.data("stellar-startingLeft",null).data("stellar-elementIsActive",null).data("stellar-backgroundIsActive",null);for(i=this.backgrounds.length-1;i>=0;i--)r=this.backgrounds[i],r.$element.data("stellar-backgroundStartingLeft",null).data("stellar-backgroundStartingTop",null),c(r.$element,r.startingValueLeft,r.startingValueTop)},destroy:function(){this._reset(),this.$scrollElement.unbind("resize."+this.name).unbind("scroll."+this.name),this._animationLoop=e.noop,e(t).unbind("load."+this.name).unbind("resize."+this.name)},_setOffsets:function(){var n=this,r=e(t);r.unbind("resize.horizontal-"+this.name).unbind("resize.vertical-"+this.name),typeof this.options.horizontalOffset=="function"?(this.horizontalOffset=this.options.horizontalOffset(),r.bind("resize.horizontal-"+this.name,function(){n.horizontalOffset=n.options.horizontalOffset()})):this.horizontalOffset=this.options.horizontalOffset,typeof this.options.verticalOffset=="function"?(this.verticalOffset=this.options.verticalOffset(),r.bind("resize.vertical-"+this.name,function(){n.verticalOffset=n.options.verticalOffset()})):this.verticalOffset=this.options.verticalOffset},_repositionElements:function(){var e=this._getScrollLeft(),t=this._getScrollTop(),n,r,i,s,o,u,a,f=!0,l=!0,h,p,d,v,m;if(this.currentScrollLeft===e&&this.currentScrollTop===t&&this.currentWidth===this.viewportWidth&&this.currentHeight===this.viewportHeight)return;this.currentScrollLeft=e,this.currentScrollTop=t,this.currentWidth=this.viewportWidth,this.currentHeight=this.viewportHeight;for(m=this.particles.length-1;m>=0;m--)i=this.particles[m],s=i.isFixed?1:0,this.options.horizontalScrolling?(h=(e+i.horizontalOffset+this.viewportOffsetLeft+i.startingPositionLeft-i.startingOffsetLeft+i.parentOffsetLeft)*-(i.stellarRatio+s-1)+i.startingPositionLeft,d=h-i.startingPositionLeft+i.startingOffsetLeft):(h=i.startingPositionLeft,d=i.startingOffsetLeft),this.options.verticalScrolling?(p=(t+i.verticalOffset+this.viewportOffsetTop+i.startingPositionTop-i.startingOffsetTop+i.parentOffsetTop)*-(i.stellarRatio+s-1)+i.startingPositionTop,v=p-i.startingPositionTop+i.startingOffsetTop):(p=i.startingPositionTop,v=i.startingOffsetTop),this.options.hideDistantElements&&(l=!this.options.horizontalScrolling||d+i.width>(i.isFixed?0:e)&&d<(i.isFixed?0:e)+this.viewportWidth+this.viewportOffsetLeft,f=!this.options.verticalScrolling||v+i.height>(i.isFixed?0:t)&&v<(i.isFixed?0:t)+this.viewportHeight+this.viewportOffsetTop),l&&f?(i.isHidden&&(this.options.showElement(i.$element),i.isHidden=!1),this._setPosition(i.$element,h,i.startingPositionLeft,p,i.startingPositionTop)):i.isHidden||(this.options.hideElement(i.$element),i.isHidden=!0);for(m=this.backgrounds.length-1;m>=0;m--)o=this.backgrounds[m],s=o.isFixed?0:1,u=this.options.horizontalScrolling?(e+o.horizontalOffset-this.viewportOffsetLeft-o.startingOffsetLeft+o.parentOffsetLeft-o.startingBackgroundPositionLeft)*(s-o.stellarRatio)+"px":o.startingValueLeft,a=this.options.verticalScrolling?(t+o.verticalOffset-this.viewportOffsetTop-o.startingOffsetTop+o.parentOffsetTop-o.startingBackgroundPositionTop)*(s-o.stellarRatio)+"px":o.startingValueTop,c(o.$element,u,a)},_handleScrollEvent:function(){var e=this,t=!1,n=function(){e._repositionElements(),t=!1},r=function(){t||(p(n),t=!0)};this.$scrollElement.bind("scroll."+this.name,r),r()},_startAnimationLoop:function(){var e=this;this._animationLoop=function(){p(e._animationLoop),e._repositionElements()},this._animationLoop()}},e.fn[i]=function(t){var n=arguments;if(t===r||typeof t=="object")return this.each(function(){e.data(this,"plugin_"+i)||e.data(this,"plugin_"+i,new d(this,t))});if(typeof t=="string"&&t[0]!=="_"&&t!=="init")return this.each(function(){var r=e.data(this,"plugin_"+i);r instanceof d&&typeof r[t]=="function"&&r[t].apply(r,Array.prototype.slice.call(n,1)),t==="destroy"&&e.data(this,"plugin_"+i,null)})},e[i]=function(n){var r=e(t);return r.stellar.apply(r,Array.prototype.slice.call(arguments,0))},e[i].scrollProperty=o,e[i].positionProperty=u,t.Stellar=d})(jQuery,this,document);
jQuery(function() {

  // Live color changing
  setInterval(function() {
    $('.nav-live.is-live').toggleClass('alt');
  }, 1000);

  // The rest
  if (!window.console) console = {log: function() {}};

  var days, goLive, hours, intervalId, minutes, seconds;
  goLive = function() {
    $('.nav-live').addClass('is-live');
    $('[data-churchonline-counter]').text("Live Now").addClass("live");
    $('[data-churchonline-counter-watch]').text("now!").addClass("live");
  };
  days = void 0;
  hours = void 0;
  minutes = void 0;
  seconds = void 0;
  intervalId = void 0;
  return $.ajax({
    url: "https://lifechurch-tv.churchonline.org/api/v1/events/current",
    dataType: "json",
    success: function(data) {
      var date, dateString, seconds_till;
      if (data.response.item.isLive) {
        return goLive();
      } else {
        date = data.response.item.eventStartTime.match(/^(\d{4})-0?(\d+)-0?(\d+)[T ]0?(\d+):0?(\d+):0?(\d+)Z$/);
        dateString = date[2] + "/" + date[3] + "/" + date[1] + " " + date[4] + ":" + date[5] + ":" + date[6] + " +0000";
        seconds_till = ((new Date(dateString)) - (new Date())) / 1000;
        days = Math.floor(seconds_till / 86400);
        hours = Math.floor((seconds_till % 86400) / 3600);
        minutes = Math.floor((seconds_till % 3600) / 60);
        seconds = Math.floor(seconds_till % 60);
        return intervalId = setInterval(function() {
          if (--seconds < 0) {
            seconds = 59;
            if (--minutes < 0) {
              minutes = 59;
              if (--hours < 0) {
                hours = 23;
                if (--days < 0) {
                  days = 0;
                }
              }
            }
          }
          $('[data-churchonline-counter]').text("in " + (hours == "0" ? "" : (hours + "hours ")) + (minutes == "0" ? "" : (minutes + "mins ")) + (seconds + "secs"))
          if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
            goLive();
            return clearInterval(intervalId);
          }
          
        }, 1000);
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("hello world")
      console.log(xhr);
      console.log(ajaxOptions);
      return console.log(thrownError);
    }
  });
});

$(document).ready(function(){

  // Has Retina
  if (window.devicePixelRatio >= 1.4) {
    if (!$("html").hasClass("lt-ie9")) {
      $( "img[data-retina]" ).each(function() {
        var retina = $(this).attr('data-retina');
        $(this).attr('src', retina);
      });
    }
  }

});

$(document).ready(function(){

  if(!$('.lt-ie9').length) {

    $('.js-more-trigger').on('click', function(e) {
      $('.more-menu').toggleClass('is-visible');
      $('body').toggleClass('more-is-visible');
      $(this).toggleClass('open');
    });

  }

});

$(document).ready(function(){

  if(!$('lt-ie9').length) {
    $('.button-with-options .button').on('click', function(e) {
      $(this).parent('.button-with-options').toggleClass('open');
      return false;
    });
  }
});


// Pop It Up (Tweet Quote social share links, etc.)
function popitup(url) {
  newwindow=window.open(url,'name','height=300,width=550');
  if (window.focus) {
    newwindow.focus()
  }
  return false;
}

$(document).ready(function(){

  // SVG / PNG
  if(!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', function () {
      return $(this).attr('src').replace('.svg', '.png');
    });
  };

});

var LastVideoId;

$(document).ready(function(){

  // Video player
  $('[data-video-player]').bind('click', video_player_start)
  function video_player_start(event) {
    var videoId = $(this).data('video-player');
    var videoWrapper = $("#video-"+videoId);
    $('body').addClass('noscroll');
    $("#player-"+videoId).html('<iframe src="http://player.theplatform.com/p/IfSiAC/bTc5flAyW_uT/embed/select/media/'+videoId+'?form=html" width="100%" height="100%" frameBorder="0" seamless="seamless" allowFullScreen></iframe>');
    videoWrapper.show();
    LastVideoId = videoId;
  }
  
  function video_player_close(event) {
    console.log(event);
    $('body').removeClass('noscroll');
    $('.video-player').hide();
    $("#player-"+LastVideoId).html('');
  }

  // Close video player
  $(document).keyup(function(e) {
    if (e.keyCode == 27) { video_player_close(); }   // esc
  });
  $('.video-player .close').bind("click", function() {
    video_player_close();
  });

  // Auto play a video based on a hashlink on page load
  $(window).load(function() {
    if(window.location.hash != "") {
      var number = parseInt(window.location.hash.substring(1));
      if(isNaN(number)) {
        return;
      }
      $("[data-video-player]:eq(" + number + ")").click();
    }
  });

});
function missionsContactValidate() {
  // Keep Involved form users on the site
  $('.form-involved').submit(function(event) {
    event.preventDefault();

    var form = $(this);

    var recipient = form.find('input[name="recipient"]').val();
    var subject = form.find('input[name="subject"]').val();
    var name = form.find('input[name="name"]').val();
    var email = form.find('input[name="email"]').val();
    var number = form.find('input[name="number"]').val();
    var detail = name + ": " + email + " " + number;

    if (name.replace(/ /g,'').length == 0 || email.replace(/ /g,'').length == 0)
    {
      form.addClass('validation');
      return false;
    }
    else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        user: email,
        key: '345e8e6fb8'
      });

      form.parent().fadeOut();
      form.parent().parent().append("").fadeIn();
      form.parent().parent('.cta').removeClass('open').addClass('sent');
      form.parent().parent().find('.cta-thanks').fadeIn();
    }    
  });
  }

$(function() {

  // Keep Involved form users on the site
  $('.form-involved').submit(function(event) {
    event.preventDefault();

    var form = $(this);

    var recipient = form.find('input[name="recipient"]').val();
    var subject = form.find('input[name="subject"]').val();
    var name = form.find('input[name="name"]').val();
    var email = form.find('input[name="email"]').val();
    var number = form.find('input[name="number"]').val();
    var detail = name + ": " + email + " " + number;

    if (name.replace(/ /g,'').length == 0 || email.replace(/ /g,'').length == 0)
    {
      form.addClass('validation');
      return false;
    }
    else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        user: email,
        key: '345e8e6fb8'
      });

      form.parent().fadeOut();
      form.parent().parent().append("<div class='cta-thanks' style='display: none;'><hr /><em>Thanks! We received your message and will be in touch.</em></div>").fadeIn();
      form.parent().parent('.cta').removeClass('open').addClass('sent');
      form.parent().parent().find('.cta-thanks').fadeIn();
    }    
  });


  // Keep Involved form (HubSpot flavor, for Church Online)
  $('.form-involved-hubspot').submit(function(event) {
    event.preventDefault();

    var form = $(this);

    var name = form.find('input[name="name"]').val();
    var email = form.find('input[name="email"]').val();
    var fullname = name.split(' '),
        firstname = fullname[0],
        lastname = fullname[fullname.length - 1];

    if (name.replace(/ /g,'').length == 0 || email.replace(/ /g,'').length == 0)
    {
      form.addClass('validation');
      return false;
    }
    else {
      $.post(form.attr('action'), {
        firstname: firstname,
        lastname: lastname,
        email: email
      });

      form.parent().fadeOut();
      form.parent().parent().append("<div class='cta-thanks' style='display: none;'><hr /><em>Thanks! We received your message and will be in touch.</em></div>").fadeIn();
      form.parent().parent('.cta').removeClass('open').addClass('sent');
      form.parent().parent().find('.cta-thanks').fadeIn();
    }    
  });


  // Contact Us Form
  if ($('.form-contact').length > 0) {
    $('select[name="subject"]').change(function() {
      $('.subject-details').hide();
      $('.form-fields, .additional-contact-information').show();

      if ($('select[name="subject"] option:selected[value="select"]').length > 0) { $('.form-fields, .additional-contact-information').hide(); }
      if ($('select[name="subject"] option:selected[value*="Giving Question"]').length > 0) { $('.subject-giving').show(); }
      if ($('select[name="subject"] option:selected[value*="Serving Question"]').length > 0) { $('.subject-serving').show(); $('.form-fields').hide(); }
      if ($('select[name="subject"] option:selected[value*="Campus Question"]').length > 0) { $('.subject-campus').show(); $('.form-fields').hide(); }
      if ($('select[name="subject"] option:selected[value*="Job Question"]').length > 0) { $('.subject-jobs').show(); }
      if ($('select[name="subject"] option:selected[value*="Prayer Request"]').length > 0) { $('.subject-prayer').show(); $('.form-fields').hide(); }
      if ($('select[name="subject"] option:selected[value*="YouVersion Question"]').length > 0) { $('.subject-youversion').show(); $('.form-fields').hide(); }
    });
  }

  $('.form-contact').submit(function(event) {
    event.preventDefault();

    var form = $(this);
  
    var subject = form.find('[name="subject"]').val().split("|")[0];
    var recipient = form.find('[name="subject"]').val().split("|")[1];
    var message = form.find('textarea[name="message"]').val();
    var name = form.find('input[name="name"]').val();
    var email = form.find('input[name="email"]').val();
    var detail = name + ": " + email;

    if ($(this).find('select[name="subject"]').val() == "select") {
      $(this).find('select[name="subject"]').addClass('has-error');
    } else {
      $(this).find('select[name="subject"]').removeClass('has-error');
    }

    if ($(this).find('textarea[name="message"]').val().length === 0) {
      $(this).find('textarea[name="message"]').addClass('has-error');
    } else {
      $(this).find('textarea[name="message"]').removeClass('has-error');
    }

    if ($(this).find('input[name="name"]').val().length === 0) {
      $(this).find('input[name="name"]').addClass('has-error');
    } else {
      $(this).find('input[name="name"]').removeClass('has-error');
    }

    if ($(this).find('input[name="email"]').val().length === 0) {
      $(this).find('input[name="email"]').addClass('has-error');
    } else {
      $(this).find('input[name="email"]').removeClass('has-error');
    }

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      return false;
    } else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        message: message,
        user: email,
        key: '345e8e6fb8'
      });  
      

      function GetSelectedItem(el) {
      output.innerHTML = el.value;
}
      
      form.fadeOut();
      form.parent().append("<div class='cta-thanks' style='display: none;'><em>Thanks! We received your message and will be in touch.</em></div>").delay(500).fadeIn();
      form.parent().find('.cta-thanks').fadeIn();
    }
    
  });

  // Simple Contact Form
  $('.form-contact-simple').submit(function(event) {
    event.preventDefault();

    var form = $(this);
  
    var subject = form.find('[name="subject"]').val();
    var recipient = form.find('[name="recipient"]').val();
    var message = form.find('textarea[name="message"]').val();
    var name = form.find('input[name="name"]').val();
    var email = form.find('input[name="email"]').val();
    var detail = name + ": " + email;

    if ($(this).find('select[name="subject"]').val() == "select") {
      $(this).find('select[name="subject"]').addClass('has-error');
    } else {
      $(this).find('select[name="subject"]').removeClass('has-error');
    }

    if ($(this).find('textarea[name="message"]').val().length === 0) {
      $(this).find('textarea[name="message"]').addClass('has-error');
    } else {
      $(this).find('textarea[name="message"]').removeClass('has-error');
    }

    if ($(this).find('input[name="name"]').val().length === 0) {
      $(this).find('input[name="name"]').addClass('has-error');
    } else {
      $(this).find('input[name="name"]').removeClass('has-error');
    }

    if ($(this).find('input[name="email"]').val().length === 0) {
      $(this).find('input[name="email"]').addClass('has-error');
    } else {
      $(this).find('input[name="email"]').removeClass('has-error');
    }

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      return false;
    } else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        user: email,
        message: message,
        key: '345e8e6fb8'
      });  

      form.fadeOut();
      form.parent().append("<div class='cta-thanks' style='display: none;'><em>Thanks! We received your message and will be in touch.</em></div>").delay(500).fadeIn();
      form.parent().find('.cta-thanks').fadeIn();
    }
    
  });


  // Simple Contact Form
  $('.form-contact-simple-hubspot').submit(function(event) {
    event.preventDefault();

    var form = $(this);
  
    var message = form.find('textarea[name="message"]').val();
    var name = form.find('input[name="name"]').val();
    var email = form.find('input[name="email"]').val();
    var fullname = name.split(' '),
        firstname = fullname[0],
        lastname = fullname[fullname.length - 1];

    if ($(this).find('textarea[name="message"]').val().length === 0) {
      $(this).find('textarea[name="message"]').addClass('has-error');
    } else {
      $(this).find('textarea[name="message"]').removeClass('has-error');
    }

    if ($(this).find('input[name="name"]').val().length === 0) {
      $(this).find('input[name="name"]').addClass('has-error');
    } else {
      $(this).find('input[name="name"]').removeClass('has-error');
    }

    if ($(this).find('input[name="email"]').val().length === 0) {
      $(this).find('input[name="email"]').addClass('has-error');
    } else {
      $(this).find('input[name="email"]').removeClass('has-error');
    }

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      return false;
    } else {
      $.post(form.attr('action'), {
        firstname: firstname,
        lastname: lastname,
        email: email,
        prayer_requests: message,
      });  

      form.fadeOut();
      form.parent().append("<div class='cta-thanks' style='display: none;'><em>Thanks! We received your message and will be in touch.</em></div>").delay(500).fadeIn();
      form.parent().find('.cta-thanks').fadeIn();
    }
    
  });


  // LifeMissions Page
  if ($('.involved-list').length > 0) {

    // Hide forms by default
    $('.involved-list form').hide();

    // Make the form appear if "Get Involved" gets clicked
    $( ".involved-list" ).delegate( ".get-involved", "click", function() {
      $(this).parent().parent().addClass('open');
      $(this).parent().siblings('form').fadeIn();
      $(this).parent().fadeOut();
      $(this).fadeOut();
      return false;
    });
  };
});

$(window).bind("load", function() {
  if ($(window).width() > 767) {
    var maxHeight = 0;
    
    $(".section-locations .involved-list .panel > .detail, .tools .panel > .detail").each(function() {
      if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });

    $(".section-locations .involved-list .panel > .detail, .tools .panel > .detail").height(maxHeight);
  }
});

$(function() {
  $('[data-jobs]').each(function(index) {
    var category = $(this).data('jobs');
    var container = $(this);

    if (window.jobs) {
      showJobs(container, category);
    }
    else {
      $.ajax({
        url: "https://lctv-jsonp-proxy.herokuapp.com/newton",
        dataType: "jsonp",
        success: function(data) {
          window.jobs = data;
          $('[data-jobs-loader]').hide();
          showJobs(container, category);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          
        }
      });
    }
  });
});

function showJobs(container, category) {
  switch(category) {
    case "central":
      displayCentralJobs(container);
      break;
    case "campus":
      displayCampusJobs(container);
      break;
    case "future":
      displayFutureJobs(container);
      break;
    case "internship":
      displayInternships(container);
      break;
  }
}

function displayCentralJobs(container) {
  $(window.jobs).find("entry").has("newton\\:department:contains(Central Office)").each(function(index) {
    container.append(jobTemplate($(this)));
  });
}

function displayInternships(container) {
  $(window.jobs).find("entry").has("newton\\:location:contains(Internships)").each(function(index) {
    container.append(jobTemplate($(this)));
  });
}

function displayFutureJobs(container) {
  container.append("<li class='job-title'><h6>Future Locations</h6></li>");

  $(window.jobs).find("entry").has("newton\\:location:contains(Future Locations)").each(function(index) {
    container.append(jobTemplate($(this)));
  });
}

function displayCampusJobs(container) {
  var campuses = [];

  //add campuses
  $(window.jobs).find("entry").has("newton\\:department:contains(Campus)").each(function(index) {
    var entry = $(this);
    var campus_name = entry.find("newton\\:department").text();

    if($.grep(campuses, function(e){ return e.name == campus_name; }).length == 0) {
      campuses.push({name: campus_name, jobs: []});
    }

    $.grep(campuses, function(e){ return e.name == campus_name; })[0].jobs.push(entry);
  });

  //sort campuses because they might not be coming in alphabetical order
  campuses.sort(compare);

  campuses.forEach(function(campus) {
    container.append(campusTemplate(campus));

    campus.jobs.forEach(function(job) {
      container.append(jobTemplate(job));
    });
  });
}

function jobTemplate(entry) {
  return $('<li></li>').append($("<a target='_blank'></a>").attr("href", entry.find("link").attr("href").replace("SubmitResume","JobIntroduction")).text(entry.find("title").text()));
}

function campusTemplate(campus) {
  return $("<li class='job-title'></li>").html('<h6>' + campus.name + '</h6>');
}

function compare(a,b) {
  if (a.name < b.name)
     return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}
// Locations Map

if ($('.alert-box').length > 0) {
  $('body').addClass('has-alerts');
};

// Zoom out
$("body").delegate(".breadcrumb .current", "click", function() {
  $('.map').removeClass().addClass('map');
  return false;
});

// Oklahoma
$(".map").delegate("#oklahoma .state-title a, #oklahoma .view-all-states", "click", function() {
  $(".map").toggleClass("is-oklahoma is-zoomed");
  return false;
});

// Texas
$(".map").delegate("#texas .state-title a, #texas .view-all-states", "click", function() {
  $(".map").toggleClass("is-texas is-zoomed");
  return false;
});

// Tennessee
$(".map").delegate("#tennessee .state-title a, #tennessee .view-all-states", "click", function() {
  $(".map").toggleClass("is-tennessee is-zoomed");
  return false;
});

// Florida
$(".map").delegate("#florida .state-title a, #florida .view-all-states", "click", function() {
  $(".map").toggleClass("is-florida is-zoomed");
  return false;
});

// Kansas
$(".map").delegate("#kansas .state-title a, #kansas .view-all-states", "click", function() {
  $(".map").toggleClass("is-kansas is-zoomed");
  return false;
});

// New Mexico
$(".map").delegate("#newmexico .state-title a, #newmexico .view-all-states", "click", function() {
  $(".map").toggleClass("is-newmexico is-zoomed");
  return false;
});

// New York
$(".map").delegate("#newyork .state-title a, #newyork .view-all-states", "click", function() {
  $(".map").toggleClass("is-newyork is-zoomed");
  return false;
});




// Hide calendar dates that are empty
if ($('.map-panel #times').length > 0) {
  if (!$('#times .saturday .event').length > 0) {
    $('#times .saturday').remove();
  };

  if (!$('#times .sunday .event').length > 0) {
    $('#times .sunday').remove();
  };
  
  if (!$('#times .wednesday .event').length > 0) {
    $('#times .wednesday').remove();
  };
};


$(".whatsnext .map, .prayer .map, .contact .map").delegate(".location-state ul li a, #online", "click", function() {
  $(this).parent().addClass("show-form");
  $(".map").addClass("is-connect");
  return false;
});

$(".whatsnext .map, .prayer .map, .contact .map").delegate(".close-connect-form", "click", function() {
  $(".show-form").removeClass("show-form");
  $(".map").removeClass("is-connect");
  return false;
});

$(document).ready(function () {
  var previousScroll = 0,
      headerOrgOffset = $('#navigation').offset().top;

  $(window).scroll(function() {
    var currentScroll = $(this).scrollTop();
    //console.log(currentScroll + " and " + previousScroll + " and " + 100);
    if(currentScroll > 100) {
      if (currentScroll > previousScroll) {
        $('#navigation').fadeOut();
        $('#persistent-navigation').removeClass('excuse-me');
      } else {
        $('#navigation').fadeIn();
        $('#navigation').addClass('fixed');
        $('#persistent-navigation').addClass('excuse-me');
      }
    } else {
      $('#navigation').removeClass('fixed'); 
      $('#navigation').fadeIn();
      $('#persistent-navigation').removeClass('excuse-me');
    }
    previousScroll = currentScroll;
  });

});

statInterval = 3000;

jQuery(function() {
  $('[data-stat-count]').each(function() {
    setInterval(nextStat, statInterval);
  });
});

function nextStat() {
  stat_wrapper = $('[data-stat-count]:eq(0)');
  current_stat = stat_wrapper.find('.stat:eq(0)');
  next_stat = stat_wrapper.find('.stat:eq(1)');

  current_stat.appendTo(stat_wrapper);

  animateStat(next_stat);
}

function animateStat(stat) {
  var animationSpeed = ((statInterval - 1000)/400);
  var number = stat.data("number");
  var money = (number.toString().indexOf("$") >= 0);
  var number = number.toString().replace(/[\$,]/g,"");

  //reset the html to 0
  stat.find('.number').html("0");

  loop_count = 0;
  var intervalId = 0;
  intervalId = setInterval(function() {
    loop_count++;
    if (number % 1 !== 0) {
      value = parseFloat(parseFloat(number * (loop_count / 100)).toFixed(2));
    } else {
      value = parseInt(number * (loop_count / 100));
    }
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (money) {
      value = "$" + value;
    }

    stat.find(".number").html(value);

    if (loop_count >= 100) {
      return window.clearInterval(intervalId);
    }
  }, animationSpeed);
}
$(document).ready(function(){

  // Parallax scrolling
  if ( $("html").hasClass("no-touch")) {
    $(window).stellar( {
      horizontalScrolling: false,
      verticalScrolling: true,
    });
  };

});

$(document).ready(function(){

  // Search on Watch
  if(!$('[data-search-input]').val()) {
    $('[data-search-results]').hide();
    $('.search-description').hide();
    $('.group.of-grid-items').show();
  } else {
    $('[data-search-results]').show();
    $('.search-description').show();
    $('.group.of-grid-items').hide();
  }
  $('[data-search-form]').keyup(function() {
    if(!$('[data-search-input]').val()) {
      $('[data-search-results]').show();
      $('.search-description').hide();
      $('.group.of-grid-items').show();
    } else {
      $('[data-search-results]').show();
      $('.search-description').show();
      $('.group.of-grid-items').hide();
    }
  });

  // Add classes on <body> for Series
  if ($('.series-locator').length > 0) {
    $('body').addClass($('.series-locator').text());
    $('.series-locator').remove();
  };

  // Series Page Mobile
  if ($('.section-series').length > 0) {
    if ($(window).width() < 960) {
      $('.tertiary-nav .current').text('Series');
    }
  }

  // Watch Banner Archive - Large Standard
  if ($(window).width() > 767 && window.devicePixelRatio <= 1.4) {
    $( "[data-banner-archive-large]" ).each(function() {
      var banner_large = $(this).attr('data-banner-archive-large');
      $(this).attr('style', banner_large);
      $(this).removeAttr('data-banner-archive-large');
    });
  }

  // Watch Banner Archive - Large Retina
  if ($(window).width() > 767 && window.devicePixelRatio >= 1.4) {
    if (!$("html").hasClass("lt-ie9")) {
      $( "[data-banner-archive-large-2x]" ).each(function() {
        var banner_large_2x = $(this).attr('data-banner-archive-large-2x');
        $(this).attr('style', banner_large_2x);
        $(this).removeAttr('data-banner-archive-large-2x');
      });
    }
  }

  // Watch Banner Archive - Small Retina
  if ($(window).width() < 767 && window.devicePixelRatio >= 1.4) {
    if (!$("html").hasClass("lt-ie9")) {
      $( "[data-banner-archive-2x]" ).each(function() {
        var banner_small_2x = $(this).attr('data-banner-archive-2x');
        $(this).attr('style', banner_small_2x);
        $(this).removeAttr('data-banner-archive-2x');
      });
    }
  }

  if ($('.section-talkitover').length > 0) {
    var boundary = $('.single article h2:contains("Discussion Questions")');
    $("<article>").insertAfter(boundary.parent()).append(boundary.nextAll().andSelf());
  }

});
