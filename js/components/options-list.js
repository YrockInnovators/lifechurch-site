$(document).ready(function(){

  if(!$('lt-ie9').length) {
    $('.button-with-options .button').on('click', function(e) {
      $(this).parent('.button-with-options').toggleClass('open');
      return false;
    });
  }
});

