$(document).ready(function () {

  $(document).on("scroll", onScroll);
  
  // Smooth Scroll
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");
    
    $('a').each(function () {
      $(this).removeClass('active');
    })
    $(this).addClass('active');
  
    var target = this.hash,
      menu = target;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top+2
    }, 500, 'swing', function () {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });

  var t = $(".persistent-navigation-wrapper").offset().top;
  $(window).scroll(function () { 
    if($(this).scrollTop() > t) {   
      $('#persistent-navigation').addClass("top");
    } else {
      $('#persistent-navigation').removeClass("top");
    }
  });

});

function onScroll(event){
  var scrollPos = $(document).scrollTop();
  $('#persistent-navigation a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('#persistent-navigation a').removeClass("active");
      currLink.addClass("active");
    }
    else{
      currLink.removeClass("active");
    }
  });
}
