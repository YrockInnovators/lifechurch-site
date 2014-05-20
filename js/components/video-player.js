$(document).ready(function(){

  // Video player
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

  // Close video player
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
