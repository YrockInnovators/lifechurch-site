// Locations Map

if ($('.alert-box').length > 0) {
  $('body').addClass('has-alerts');
};

if ($(window).width() < 767) {
}
// If the screen is wide:
else {
  // General pin zoom
  $( ".map-wrapper" ).delegate( ".pin-ok, .pin-tx", "click", function() {
    $(".pin-state").fadeOut(200);
    $(".map-back").fadeIn(500);
  });

  // OK pin zoom
  $( ".map-wrapper" ).delegate( ".pin-ok", "click", function() {
    $(".map").addClass("map-ok");
    $(".pin-campus-ok").delay(300).fadeIn(300);
    $(".map-list-okc").delay(400).fadeIn(300);
    $(".map-list-stillwater").delay(440).fadeIn(300);
    $(".map-list-tulsa").delay(480).fadeIn(300);
  });

  // TX pin zoom
  $( ".map-wrapper" ).delegate( ".pin-tx", "click", function() {
    $(".map").addClass("map-tx");
    $(".pin-campus-tx").delay(300).fadeIn(300);
  });

  // Back / Zoom out
  $( ".map-wrapper" ).delegate( ".map-back", "click", function() {
    $(".map").removeClass().addClass("map");
    $(".pin, .map-list").fadeOut(200);
    $(".map-back").fadeOut(500);
    $(".pin-state").delay(300).fadeIn(300);
  });
}


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

  $('<b class="first">8</b><b>9</b><b>10</b><b>11</b><b>12</b><b>1</b><b>2</b><b>3</b><b>4</b><b>5</b><b>6</b><b>7</b><b>8</b>').appendTo('.calendar');
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
