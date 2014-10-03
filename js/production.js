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
  };
  days = void 0;
  hours = void 0;
  minutes = void 0;
  seconds = void 0;
  intervalId = void 0;
  return $.ajax({
    url: "http://live.lifechurch.tv/api/v1/events/current",
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

$(document).ready(function(){

  // SVG / PNG
  if(!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', function () {
      return $(this).attr('src').replace('.svg', '.png');
    });
  };

});

$(document).ready(function(){

  // Video player
  $('[data-video-player]').bind('click', video_player_start)
  function video_player_start(event) {
    var videoId = $(this).data('video-player');
    var videoWrapper = $("#video-"+videoId);
    var videoPlayer = videoWrapper.find('iframe')[0].wistiaApi;
    $('body').addClass('noscroll');
    videoWrapper.show();
    videoPlayer.play();
  }
  function video_player_close(event) {
    $('body').removeClass('noscroll');
    $('.video-player').hide();
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

$(function() {

  // Keep Involved form users on the site
  $('.form-involved').submit(function(event) {
    event.preventDefault();

    var form = $(this);

    var recipient = form.find('input[name="recipient"]').val();
    var subject = form.find('input[name="subject"]').val();
    var name = form.find('input[name="name"]').val();
    var phone = form.find('input[name="phone"]').val();
    var number = form.find('input[name="number"]').val();
    var detail = name + ": " + phone + " " + number;

    if (name.replace(/ /g,'').length == 0 || phone.replace(/ /g,'').length == 0)
    {
      form.addClass('validation');
      return false;
    }
    else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        key: '345e8e6fb8'
      });

      form.parent().fadeOut();
      form.parent().parent().append("<div class='cta-thanks' style='display: none;'><hr /><em>Thanks! We'll be in touch soon.</em></div>").fadeIn();
      form.parent().parent('.cta').removeClass('open').addClass('sent');
      form.parent().parent().find('.cta-thanks').fadeIn();
    }    
  });

  // Contact Us Form
  $('.form-contact').submit(function(event) {
    event.preventDefault();

    var form = $(this);
  
    var subject = form.find('[name="subject"]').val().split("|")[0];
    var recipient = form.find('[name="subject"]').val().split("|")[1];
    var message = form.find('textarea[name="message"]').val();
    var name = form.find('input[name="name"]').val();
    var phone = form.find('input[name="phone"]').val();
    var detail = name + ": " + phone;

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

    if ($(this).find('input[name="phone"]').val().length === 0) {
      $(this).find('input[name="phone"]').addClass('has-error');
    } else {
      $(this).find('input[name="phone"]').removeClass('has-error');
    }

    if (name.length === 0 || phone.length === 0 || message.length === 0) {
      return false;
    } else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        message: message,
        key: '345e8e6fb8'
      });  

      form.fadeOut();
      form.parent().append("<div class='cta-thanks' style='display: none;'><em>Thanks! We'll be in touch soon.</em></div>").delay(500).fadeIn();
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
    var phone = form.find('input[name="phone"]').val();
    var detail = name + ": " + phone;

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

    if ($(this).find('input[name="phone"]').val().length === 0) {
      $(this).find('input[name="phone"]').addClass('has-error');
    } else {
      $(this).find('input[name="phone"]').removeClass('has-error');
    }

    if (name.length === 0 || phone.length === 0 || message.length === 0) {
      return false;
    } else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        message: message,
        key: '345e8e6fb8'
      });  

      form.fadeOut();
      form.parent().append("<div class='cta-thanks' style='display: none;'><em>Thanks! We'll be in touch soon.</em></div>").delay(500).fadeIn();
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
$(".map").delegate("#oklahoma .state-title a", "click", function() {
  $(".map").toggleClass("is-oklahoma is-zoomed");
  return false;
});

// Texas
$(".map").delegate("#texas .state-title a", "click", function() {
  $(".map").toggleClass("is-texas is-zoomed");
  return false;
});

// Tennessee
$(".map").delegate("#tennessee .state-title a", "click", function() {
  $(".map").toggleClass("is-tennessee is-zoomed");
  return false;
});

// Florida
$(".map").delegate("#florida .state-title a", "click", function() {
  $(".map").toggleClass("is-florida is-zoomed");
  return false;
});

// Kansas
$(".map").delegate("#kansas .state-title a", "click", function() {
  $(".map").toggleClass("is-kansas is-zoomed");
  return false;
});

// New York
$(".map").delegate("#newyork .state-title a", "click", function() {
  $(".map").toggleClass("is-newyork is-zoomed");
  return false;
});


// Geolocation for Locations map

if ($('.map').length > 0) {
  $.get("http://ipinfo.io", function(response) {
    console.log(response.region);

    if (response.region == 'Florida') {
      $('.map').addClass('is-florida');
    }

    if (response.region == 'Kansas') {
      $('.map').addClass('is-kansas');
    }

    if (response.region == 'New York') {
      $('.map').addClass('is-newyork');
    }

    if (response.region == 'Oklahoma') {
      $('.map').addClass('is-oklahoma');
    }

    if (response.region == 'Tennessee') {
      $('.map').addClass('is-tennessee');
    }

    if (response.region == 'Texas') {
      $('.map').addClass('is-texas');
    }

  }, "jsonp");
};


// Locations Page Content

// Local storage for locations
$('[data-set-campus]').bind("click", function() {
  if (Modernizr.localstorage) {
    localStorage["myCampus"] = $(this).data("set-campus");
    $(this).parent().addClass('my-campus');
  }
});

$('[data-unset-campus]').bind("click", function() {
  if (Modernizr.localstorage) {
    localStorage.removeItem("myCampus");
    $(this).parent().removeClass('my-campus');
  }
});

//replaces links that should go straight to the campus pages
$('[data-my-campus]').each(function(index) {
  if (Modernizr.localstorage && localStorage["myCampus"]) {
    $(this).attr('href',"/locations/" + localStorage["myCampus"] + "/" + $(this).data("my-campus"));
  }
});

//show the "not your campus?"" button if this campus is present in localstorage
$('[data-set-campus]').each(function(index) {
  if (Modernizr.localstorage && (localStorage["myCampus"] == $(this).data("set-campus"))) {
    $(this).parent().addClass('my-campus');
  }
});



// Locations Page Dates/Times scripts

if ($('.section-locations').length > 0) {

  $('<b class="first">8<i>AM</i></b><b>9<i>AM</i></b><b>10<i>AM</i></b><b>11<i>AM</i></b><b>12<i>PM</i></b><b>1<i>PM</i></b><b>2<i>PM</i></b><b>3<i>PM</i></b><b>4<i>PM</i></b><b>5<i>PM</i></b><b>6<i>PM</i></b><b>7<i>PM</i></b><b>8<i>PM</i></b>').appendTo('.calendar');
  $('.calendar b').wrapInner('<span></span>');

  if ($(window).width() < 767) {

    $('.saturday, .sunday, .wednesday').on('movestart', function(e) {
      if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
        e.preventDefault();
      }
    });

    $('.saturday').on("swipeleft",function(){
      $('.calendar').removeClass().addClass('calendar showing-sunday');
    });

    $('.sunday').on("swipeleft",function(){
      $('.calendar').removeClass().addClass('calendar showing-wednesday');
    });

    $('.sunday').on("swiperight",function(){
      $('.calendar').removeClass().addClass('calendar showing-saturday');
    });

    $('.wednesday').on("swiperight",function(){
      $('.calendar').removeClass().addClass('calendar showing-sunday');
    });

    $('#times').on('click', '.showing-saturday .calendar-right', function() {
      $('.calendar').removeClass().addClass('calendar showing-sunday');
      $(".saturday, .sunday, .wednesday").animate({
        left: "-=100%"
      }, {
        duration: 400,
        specialEasing: {
          width: "easeOutBounce",
          height: "easeOutBounce"
        },
        complete: function() {
        }
      });
    });

    $('#times').on('click', '.showing-sunday .calendar-right', function() {
      $('.calendar').removeClass().addClass('calendar showing-wednesday');
      $(".saturday, .sunday, .wednesday").animate({
        left: "-=100%"
      }, {
        duration: 400,
        specialEasing: {
          width: "easeOutBounce",
          height: "easeOutBounce"
        },
        complete: function() {
        }
      });
    });

    $('#times').on('click', '.showing-sunday .calendar-left', function() {
      $('.calendar').removeClass().addClass('calendar showing-saturday');
      $(".saturday, .sunday, .wednesday").animate({
        left: "+=100%"
      }, {
        duration: 400,
        specialEasing: {
          width: "easeOutBounce",
          height: "easeOutBounce"
        },
        complete: function() {
        }
      });
    });

    $('#times').on('click', '.showing-wednesday .calendar-left', function() {
      $('.calendar').removeClass().addClass('calendar showing-sunday');
      $(".saturday, .sunday, .wednesday").animate({
        left: "+=100%"
      }, {
        duration: 400,
        specialEasing: {
          width: "easeOutBounce",
          height: "easeOutBounce"
        },
        complete: function() {
        }
      });
    });

    $(".saturday, .sunday").on("swipeleft",function(){
      $(".saturday, .sunday, .wednesday").animate({
        left: "-=100%"
      }, {
        duration: 400,
        specialEasing: {
          width: "easeOutBounce",
          height: "easeOutBounce"
        },
        complete: function() {
        }
      });
    });               

    $(".sunday, .wednesday").on("swiperight",function(){
      $(".saturday, .sunday, .wednesday").animate({
        left: "+=100%"
      }, {
        duration: 400,
        specialEasing: {
          width: "easeOutBounce",
          height: "easeOutBounce"
        },
        complete: function() {
        }
      });
    });

  }
}

$(document).ready(function () {
  var previousScroll = 0,
      headerOrgOffset = $('#navigation').offset().top;

  $(window).scroll(function() {
    var currentScroll = $(this).scrollTop();
    console.log(currentScroll + " and " + previousScroll + " and " + 100);
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

/**
 * A simple JSON search
 * Requires jQuery (v 1.7+)
 *
 * @author  Mat Hayward - Erskine Design
 * @version  0.1
 */


 /* ==========================================================================
    Initialisation
    ========================================================================== */

var q, jsonFeedUrl = "/watch.json",
    $searchForm = $("[data-search-form]"),
    $searchInput = $("[data-search-input]"),
    $resultTemplate = $("#search-result"),
    $resultsPlaceholder = $("[data-search-results]"),
    $foundContainer = $("[data-search-found]"),
    $foundTerm = $("[data-search-found-term]"),
    $foundCount = $("[data-search-found-count]"),
    allowEmpty = true,
    showLoader = true,
    loadingClass = "is--loading";


$(document).ready( function() {
    
    // hide items found string
    $foundContainer.hide();

    // initiate search functionality
    initSearch();
});




 /* ==========================================================================
    Search functions
    ========================================================================== */
 

/**
 * Initiate search functionality.
 * Shows results based on querystring if present.
 * Binds search function to form submission.
 */
function initSearch() {

    // Get search results if q parameter is set in querystring
    if (getParameterByName('q')) {
        q = decodeURIComponent(getParameterByName('q'));
        $searchInput.val(q);
        execSearch(q);
    }

    // Get search results on submission of form
    $('[data-search-form]').keyup(function(e) {
      e.preventDefault();
      q = $searchInput.val();
      execSearch(q);
    });
}


/**
 * Executes search
 * @param {String} q 
 * @return null
 */
function execSearch(q) {
    if (q != '' || allowEmpty) {
        if (showLoader) {
            toggleLoadingClass();
        }

        getSearchResults(processData());
    }
}


/**
 * Toggles loading class on results and found string
 * @return null
 */
function toggleLoadingClass() {
    $resultsPlaceholder.toggleClass(loadingClass);
    $foundContainer.toggleClass(loadingClass);
}


/**
 * Get Search results from JSON
 * @param {Function} callbackFunction 
 * @return null
 */
function getSearchResults(callbackFunction) {
    $.get(jsonFeedUrl, callbackFunction, 'json');
}


/**
 * Process search result data
 * @return null
 */
function processData() {
    $results = [];
    
    return function(data) {
        
        var resultsCount = 0,
            results = "";

        $.each(data, function(index, item) {
            // check if search term is in content or title 
            if (item.tags.toLowerCase().indexOf(q.toLowerCase()) > -1 || item.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                var result = populateResultContent($resultTemplate.html(), item);
                resultsCount++;
                results += result;
            }
        });

        if (showLoader) {
            toggleLoadingClass();
        }

        populateResultsString(resultsCount);
        showSearchResults(results);
    }
}


/**
 * Add search results to placeholder
 * @param {String} results
 * @return null
 */
function showSearchResults(results) {
    // Add results HTML to placeholder
    $resultsPlaceholder.html(results);
}


/**
 * Add results content to item template
 * @param {String} html 
 * @param {object} item
 * @return {String} Populated HTML
 */
function populateResultContent(html, item) {
    html = injectContent(html, item.title, '##Title##');
    html = injectContent(html, item.link, '##Url##');
    html = injectContent(html, item.image, '##Image');
    html = injectContent(html, item.tags, '##Tags##');
    return html;
}


/**
 * Populates results string
 * @param {String} count 
 * @return null
 */
function populateResultsString(count) {
    $foundTerm.text(q);
    $foundCount.text(count);
    $foundContainer.show();
}




 /* ==========================================================================
    Helper functions
    ========================================================================== */


/**
 * Gets query string parameter - taken from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 * @param {String} name 
 * @return {String} parameter value
 */
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


/**
 * Injects content into template using placeholder
 * @param {String} originalContent
 * @param {String} injection
 * @param {String} placeholder 
 * @return {String} injected content
 */
function injectContent(originalContent, injection, placeholder) {
    var regex = new RegExp(placeholder, 'g');
    return originalContent.replace(regex, injection);
}

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
      $('[data-search-results]').hide();
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

});
