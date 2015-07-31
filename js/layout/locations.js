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
