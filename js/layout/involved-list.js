$(window).bind("load", function() {
  if ($(window).width() > 767) {
    var maxHeight = 0;
    
    $(".section-locations .involved-list .panel > .detail, .tools .panel > .detail").each(function() {
      if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });

    $(".section-locations .involved-list .panel > .detail, .tools .panel > .detail").height(maxHeight);
  }
});
