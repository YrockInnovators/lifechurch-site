$(function() {
  // Keep Involved form users on the site
  $('.form-involved').submit(function(event) {
    event.preventDefault();

    var form = $(this);

    var recipient = form.find('input[name="recipient"]').val();
    var subject = form.find('input[name="subject"]').val();
    var name = form.find('input[name="name"]').val();
    var phone = form.find('input[name="phone"]').val();
    var detail = name + ": " + phone;

    if (name.replace(/ /g,'').length == 0 || phone.replace(/ /g,'').length == 0)
    {
      form.addClass('validation');
      return false;
    }
    else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        key: '345e8e6fb8'
      });

      form.parent().fadeOut();
      form.parent().parent().append("<div class='cta-thanks' style='display: none;'><hr /><em>Thanks! We'll be in touch soon.</em></div>").fadeIn();
      form.parent().parent('.cta').removeClass('open').addClass('sent');
      form.parent().parent().find('.cta-thanks').fadeIn();
    }    
  });

  // Keep Contact form users on the site
  $('.form-contact').submit(function(event) {
    event.preventDefault();

    var form = $(this);

    var subject = form.find('[name="subject"]').val().split("|")[0];
    var recipient = form.find('[name="subject"]').val().split("|")[1];
    var message = form.find('textarea[name="message"]').val();
    var name = form.find('input[name="name"]').val();
    var phone = form.find('input[name="phone"]').val();
    var detail = name + ": " + phone;


    if (name.replace(/ /g,'').length == 0 || phone.replace(/ /g,'').length == 0)
    {
      form.addClass('validation');
      return false;
    }
    else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        message: message,
        key: '345e8e6fb8'
      });  

      form.fadeOut();
      form.parent().append("<div class='cta-thanks' style='display: none;'><em>Thanks! We'll be in touch soon.</em></div>").delay(500).fadeIn();
      form.parent().find('.cta-thanks').fadeIn();
    }
    
  });

  // LifeMissions Page
  if ($('.involved-list').length > 0) {

    // Hide forms by default
    $('.involved-list form').hide();

    // Make the form appear if "Get Involved" gets clicked
    $( ".involved-list" ).delegate( ".get-involved", "click", function() {
      $(this).parent().parent().addClass('open');
      $(this).parent().siblings('form').fadeIn();
      $(this).parent().fadeOut();
      $(this).fadeOut();
      return false;
    });
  };
});