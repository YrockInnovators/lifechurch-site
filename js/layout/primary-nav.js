$(document).ready(function () {
  var previousScroll = 0,
      headerOrgOffset = $('#navigation').offset().top;

  $(window).scroll(function() {
    var currentScroll = $(this).scrollTop();
    //console.log(currentScroll + " and " + previousScroll + " and " + 100);
    if(currentScroll > 100) {
      if (currentScroll > previousScroll) {
        $('#navigation').fadeOut();
        $('#persistent-navigation').removeClass('excuse-me');
      } else {
        $('#navigation').fadeIn();
        $('#navigation').addClass('fixed');
        $('#persistent-navigation').addClass('excuse-me');
      }
    } else {
      $('#navigation').removeClass('fixed'); 
      $('#navigation').fadeIn();
      $('#persistent-navigation').removeClass('excuse-me');
    }
    previousScroll = currentScroll;
  });

});
