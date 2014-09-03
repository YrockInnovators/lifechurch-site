$(document).ready(function () {

  if ($('.location-identifier').length > 0) {
    if($('.location-identifier').contains("no-location")) {
      $('.form-no-location').show();
    }

    if($('.location-identifier').contains("wichita")) {
      $('.form-wichita').show();
    }

    if($('.location-identifier').contains("kansascity")) {
      $('.form-kansascity').show();
    }

    if($('.location-identifier').contains("westpalmbeach")) {
      $('.form-westpalmbeach').show();
    }
  }

}
