var LastVideoId;

$(document).ready(function(){

  // Video player
  $('[data-video-player]').bind('click', video_player_start)
  function video_player_start(event) {
    var videoId = $(this).data('video-player');
    var videoWrapper = $("#video-"+videoId);
    $('body').addClass('noscroll');
    $("#player-"+videoId).html('<iframe src="http://player.theplatform.com/p/IfSiAC/bTc5flAyW_uT/embed/select/media/'+videoId+'?form=html" width="100%" height="100%" frameBorder="0" seamless="seamless" allowFullScreen></iframe>');
    videoWrapper.show();
    LastVideoId = videoId;
  }
  
  function video_player_close(event) {
    console.log(event);
    $('body').removeClass('noscroll');
    $('.video-player').hide();
    $("#player-"+LastVideoId).html('');
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