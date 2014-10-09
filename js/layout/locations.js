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
