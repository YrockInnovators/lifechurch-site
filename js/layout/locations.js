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
