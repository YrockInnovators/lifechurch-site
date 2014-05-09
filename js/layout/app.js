$(function() {

  // Has Retina
  if (window.devicePixelRatio >= 1.4) {
    $( "img[data-retina]" ).each(function() {
      var retina = $(this).attr('data-retina');
      $(this).attr('src', retina);
    });
  }

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

  // SVG / PNG
  if(!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', function () {
      return $(this).attr('src').replace('.svg', '.png');
    });
  };

  // Parallax scrolling
  if ( $("html").hasClass("no-touch")) {
    $(window).stellar( {
      horizontalScrolling: false,
      verticalScrolling: true,
    });
  };

  // Live color changing
  setInterval(function() {
    $('#navigation a .live').toggleClass('alt');
  }, 1000);

  // Video players
  $('[data-video-player]').bind('click', video_player_start)
  function video_player_start(event) {
    var videoId = $(this).data('video-player');
    var videoWrapper = $("#video-"+videoId);
    var videoPlayer = videoWrapper.find('iframe')[0].wistiaApi;
    $('body').addClass('noscroll');
    videoWrapper.show();
    videoPlayer.play();
  }
  function video_player_close(event) {
    $('body').removeClass('noscroll');
    $('.video-player').hide();
  }

  // Close video players
  $(document).keyup(function(e) {
    if (e.keyCode == 27) { video_player_close(); }   // esc
  });
  $('.video-player .close').bind("click", function() {
    video_player_close();
  });

  // Auto play a video based on a hashlink on page load
  $(window).load(function() {
    if(window.location.hash != "") {
      var number = parseInt(window.location.hash.substring(1));
      if(isNaN(number)) {
        return;
      }
      $("[data-video-player]:eq(" + number + ")").click();
    }
  });

});

$(window).bind("load", function() {
 
  if ($(window).width() > 767) {
    var maxHeight = 0;
    
    $(".section-locations .involved-list .panel > .detail, .tools .panel > .detail").each(function() {
      if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });

    $(".section-locations .involved-list .panel > .detail, .tools .panel > .detail").height(maxHeight);
  }
});
