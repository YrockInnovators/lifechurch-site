$(document).ready(function(){

  if(!$('.lt-ie9').length) {

    $('.js-more-trigger').on('click', function(e) {
      $('.more-menu').toggleClass('is-visible');
      $('body').toggleClass('more-is-visible');
      $(this).toggleClass('open');
    });

  }

});
