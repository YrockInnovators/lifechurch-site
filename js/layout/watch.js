$(document).ready(function(){

  // Search on Watch
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

});
