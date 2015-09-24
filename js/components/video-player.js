$(document).ready(function(){

  // Video player
  $('[data-video-player]').bind('click', video_player_start)
  function video_player_start(event) {
    var videoId = $(this).data('video-player');
    var player_url = "http://player.theplatform.com/p/IfSiAC/VDBaeFhHi1hg/embed/select/media/" + videoId +"?form=html";
    var videoWrapper = $("#video-"+videoId);
//    var videoPlayer = videoWrapper.find('iframe')[0].wistiaApi;
//    var haivisionPlayer = videoWrapper.find('iframe')[0];
    $('body').addClass('noscroll');
    videoWrapper.show();
    var player = new Player("haivision-"+ videoId);

    var pid = videoId;
    
    // Grab the pid from the URL used to retrieve this page. 
//    pid = (pid.indexOf("?") >= 0 ? pid.split("?")[1] : null);
//    pid = (pid && pid.indexOf("&") >= 0 ? pid.split("&")[0] : pid);
//    pid = (pid && pid.indexOf("=") >= 0 ? pid.split("=")[1] : pid);

    // if (!pid) {
    //   // there's no PID, use a default
    //   pid = "41w8BGqaubFz";
    // }
    

    var releaseUrl = "https://link.theplatform.com/s/IfSiAC/media/" + pid;
      
    player.releaseUrl = releaseUrl;
    player.fp.bgcolor = "0x131313";
    player.fp.wmode = "opaque";
    player.logLevel = "warn";
    player.autoPlay = "true"
    player.allowFullScreen = "true";
    player.skinUrl = "https://lc-video-player.s3.amazonaws.com/lcskin/glass-lc.json";
    player.playerURL = "https://player.theplatform.com/p/IfSiAC/Muqqhl0VrQbH";
    // Copy the supplied pid so it can be reused on an embed. 
    player.embeddedPlayerHTML = "<iframe id=\"embed\" src=\"" + document.location.hostname + "/iframeEmbedSource.html?pid=" + releaseUrl + "\" frameborder=\"0\"></iframe>";
    //player.RSSURL = "http://feed.theplatform.com/f/3JHsmB/TpW4aioBvs6N?form=rss";
    player.backgroundColor = "0x131313";
    player.controlBackgroundColor = "0x131313"
    // player.controlColor = "#B9252D";
    player.controlColor = "#FFFFFF";
    player.controlFrameColor = "0x545759";
    player.controlHoverColor = "0xBEBEBE";
    player.controlSelectedColor = "CCCCCC";
    player.frameColor = "0x545759";
    player.pageBackgroundColor = "0x131313";
    player.playProgressColor = "#B9252D";
    player.scrubberColor = "0xBEBEBE";
    player.scrubberFrameColor = "0x00CCFF";
    player.scrubTrackColor = "#FFFFFF";
    player.textBackgroundColor = "0x383838";
    player.textColor = "0xBEBEBE";
    //player.loadProgressColor = "0xDEDEDE";
    player.layoutUrl = "https://lc-video-player.s3.amazonaws.com/lcskin/metaLayout.xml";
    player.bind();
//    videoPlayer.play();
//    console.log("player url", player_url);
//    $(haivisionPlayer).attr('src', player_url);
  }
  function video_player_close(event) {
    $('body').removeClass('noscroll');
    $('.video-player').hide();
    $('.haivision-player').attr('src','');
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
