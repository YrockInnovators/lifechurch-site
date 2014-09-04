$(document).ready(function () {

  if ($('.location-identifier').length > 0) {
    $(".location-chooser").change(function(){
      if ($('.location-chooser select').val() == "wichita") {
        $('.connect-form').attr("action", "//lifechurch.us9.list-manage.com/subscribe/post?u=bf7521ed7f8fef2ec1886bb9a&amp;id=82368695a9");
        $('#mce-LOCATION').attr("value", "Wichita");
      } else if ($('.location-chooser select').val() == "kansascity") {
        $('.connect-form').attr("action", "//lifechurch.us9.list-manage.com/subscribe/post?u=bf7521ed7f8fef2ec1886bb9a&amp;id=32164b3882");
        $('#mce-LOCATION').attr("value", "Kansas City");
      } else if ($('.location-chooser select').val() == "wpb") {
        $('.connect-form').attr("action", "//lifechurch.us9.list-manage.com/subscribe/post?u=bf7521ed7f8fef2ec1886bb9a&amp;id=5bdd8528a9");
        $('#mce-LOCATION').attr("value", "West Palm Beach");
      }
    });

    if ($('.location-identifier:contains("wichita")').length > 0) {
      $('.location-chooser').remove();
      $('.connect-form').attr("action", "//lifechurch.us9.list-manage.com/subscribe/post?u=bf7521ed7f8fef2ec1886bb9a&amp;id=82368695a9");
    }

    if ($('.location-identifier:contains("kansascity")').length > 0) {
      $('.location-chooser').remove();
      $('.connect-form').attr("action", "//lifechurch.us9.list-manage.com/subscribe/post?u=bf7521ed7f8fef2ec1886bb9a&amp;id=32164b3882");
    }

    if ($('.location-identifier:contains("wpb")').length > 0) {
      $('.location-chooser').remove();
      $('.connect-form').attr("action", "//lifechurch.us9.list-manage.com/subscribe/post?u=bf7521ed7f8fef2ec1886bb9a&amp;id=5bdd8528a9");
    }
  }
});
