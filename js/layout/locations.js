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

$('.time.type-lifekids').addClass('overlap').parent().parent().addClass('rows-2');

// Campus calendar 5pm overlaps
$('.time-17-00').siblings('.time-17-30').addClass('overlap').parent().parent().addClass('rows-2');
$('.time-17-00.duration-120').siblings('.time-17-30, .time-18-00, .time-18-30').addClass('overlap').parent().parent().addClass('rows-2');

// Campus calendar 6pm overlaps
$('.time-18-00').siblings('.time-18-30').addClass('overlap').parent().parent().addClass('rows-2');
$('.time-18-00.duration-120').siblings('.time-18-30, .time-19-00, .time-19-30').addClass('overlap').parent().parent().addClass('rows-2');

// Campus calendar 6:30pm overlaps (Switch / Roots)
$('.type-switch').siblings('.type-roots').addClass('overlap').parent().parent().addClass('rows-2');

// Campus calendar 7pm overlaps
$('.time-19-00').siblings('.time-19-30').addClass('overlap').parent().parent().addClass('rows-2');
$('.time-19-00.duration-120').siblings('.time-19-30, .time-21-00, .time-21-30').addClass('overlap').parent().parent().addClass('rows-2');

// Campus calendar 8pm overlaps
$('.time-20-00').siblings('.time-20-30').addClass('overlap').parent().parent().addClass('rows-2');
$('.time-20-00.duration-120').siblings('.time-20-30, .time-21-00, .time-21-30').addClass('overlap').parent().parent().addClass('rows-2');

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
