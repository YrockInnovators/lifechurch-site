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
      $('[data-search-results]').show();
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

  if ($('.section-talkitover').length > 0) {
    var boundary = $('.single article h2:contains("Discussion Questions")');
    $("<article>").insertAfter(boundary.parent()).append(boundary.nextAll().andSelf());
  }

});
