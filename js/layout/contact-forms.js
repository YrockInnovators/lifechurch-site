$(function() {

  // Keep Involved form users on the site
  $('.form-involved').submit(function(event) {
    event.preventDefault();

    var form = $(this);

    var recipient = form.find('input[name="recipient"]').val();
    var subject = form.find('input[name="subject"]').val();
    var name = form.find('input[name="name"]').val();
    var phone = form.find('input[name="phone"]').val();
    var number = form.find('input[name="number"]').val();
    var detail = name + ": " + phone + " " + number;

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

  // Contact Us Form
  $('.form-contact').submit(function(event) {
    event.preventDefault();

    var form = $(this);
  
    var subject = form.find('[name="subject"]').val().split("|")[0];
    var recipient = form.find('[name="subject"]').val().split("|")[1];
    var message = form.find('textarea[name="message"]').val();
    var name = form.find('input[name="name"]').val();
    var phone = form.find('input[name="phone"]').val();
    var detail = name + ": " + phone;

    if ($(this).find('select[name="subject"]').val() == "select") {
      $(this).find('select[name="subject"]').addClass('has-error');
    } else {
      $(this).find('select[name="subject"]').removeClass('has-error');
    }

    if ($(this).find('textarea[name="message"]').val().length === 0) {
      $(this).find('textarea[name="message"]').addClass('has-error');
    } else {
      $(this).find('textarea[name="message"]').removeClass('has-error');
    }

    if ($(this).find('input[name="name"]').val().length === 0) {
      $(this).find('input[name="name"]').addClass('has-error');
    } else {
      $(this).find('input[name="name"]').removeClass('has-error');
    }

    if ($(this).find('input[name="phone"]').val().length === 0) {
      $(this).find('input[name="phone"]').addClass('has-error');
    } else {
      $(this).find('input[name="phone"]').removeClass('has-error');
    }

    if (name.length === 0 || phone.length === 0 || message.length === 0) {
      return false;
    } else {
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

  // Simple Contact Form
  $('.form-contact-simple').submit(function(event) {
    event.preventDefault();

    var form = $(this);
  
    var subject = form.find('[name="subject"]').val();
    var recipient = form.find('[name="recipient"]').val();
    var message = form.find('textarea[name="message"]').val();
    var name = form.find('input[name="name"]').val();
    var phone = form.find('input[name="phone"]').val();
    var detail = name + ": " + phone;

    if ($(this).find('select[name="subject"]').val() == "select") {
      $(this).find('select[name="subject"]').addClass('has-error');
    } else {
      $(this).find('select[name="subject"]').removeClass('has-error');
    }

    if ($(this).find('textarea[name="message"]').val().length === 0) {
      $(this).find('textarea[name="message"]').addClass('has-error');
    } else {
      $(this).find('textarea[name="message"]').removeClass('has-error');
    }

    if ($(this).find('input[name="name"]').val().length === 0) {
      $(this).find('input[name="name"]').addClass('has-error');
    } else {
      $(this).find('input[name="name"]').removeClass('has-error');
    }

    if ($(this).find('input[name="phone"]').val().length === 0) {
      $(this).find('input[name="phone"]').addClass('has-error');
    } else {
      $(this).find('input[name="phone"]').removeClass('has-error');
    }

    if (name.length === 0 || phone.length === 0 || message.length === 0) {
      return false;
    } else {
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
