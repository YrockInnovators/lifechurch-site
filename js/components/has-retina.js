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
