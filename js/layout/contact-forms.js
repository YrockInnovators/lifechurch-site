function missionsContactValidate() {
  // Keep Involved form users on the site
  $('.form-involved').submit(function(event) {
    event.preventDefault();

    var form = $(this);

    var recipient = form.find('input[name="recipient"]').val();
    var subject = form.find('input[name="subject"]').val();
    var name = form.find('input[name="name"]').val();
    var email = form.find('input[name="email"]').val();
    var number = form.find('input[name="number"]').val();
    var detail = name + ": " + email + " " + number;

    if (name.replace(/ /g,'').length == 0 || email.replace(/ /g,'').length == 0)
    {
      form.addClass('validation');
      return false;
    }
    else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        user: email,
        key: '345e8e6fb8'
      });

      form.parent().fadeOut();
      form.parent().parent().append("").fadeIn();
      form.parent().parent('.cta').removeClass('open').addClass('sent');
      form.parent().parent().find('.cta-thanks').fadeIn();
    }    
  });
  }

$(function() {

  // Keep Involved form users on the site
  $('.form-involved').submit(function(event) {
    event.preventDefault();

    var form = $(this);

    var recipient = form.find('input[name="recipient"]').val();
    var subject = form.find('input[name="subject"]').val();
    var name = form.find('input[name="name"]').val();
    var email = form.find('input[name="email"]').val();
    var number = form.find('input[name="number"]').val();
    var detail = name + ": " + email + " " + number;

    if (name.replace(/ /g,'').length == 0 || email.replace(/ /g,'').length == 0)
    {
      form.addClass('validation');
      return false;
    }
    else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        user: email,
        key: '345e8e6fb8'
      });

      form.parent().fadeOut();
      form.parent().parent().append("<div class='cta-thanks' style='display: none;'><hr /><em>Thanks! We received your message and will be in touch.</em></div>").fadeIn();
      form.parent().parent('.cta').removeClass('open').addClass('sent');
      form.parent().parent().find('.cta-thanks').fadeIn();
    }    
  });


  // Keep Involved form (HubSpot flavor, for Church Online)
  $('.form-involved-hubspot').submit(function(event) {
    event.preventDefault();

    var form = $(this);

    var name = form.find('input[name="name"]').val();
    var email = form.find('input[name="email"]').val();
    var fullname = name.split(' '),
        firstname = fullname[0],
        lastname = fullname[fullname.length - 1];

    if (name.replace(/ /g,'').length == 0 || email.replace(/ /g,'').length == 0)
    {
      form.addClass('validation');
      return false;
    }
    else {
      $.post(form.attr('action'), {
        firstname: firstname,
        lastname: lastname,
        email: email
      });

      form.parent().fadeOut();
      form.parent().parent().append("<div class='cta-thanks' style='display: none;'><hr /><em>Thanks! We received your message and will be in touch.</em></div>").fadeIn();
      form.parent().parent('.cta').removeClass('open').addClass('sent');
      form.parent().parent().find('.cta-thanks').fadeIn();
    }    
  });


  // Contact Us Form
  if ($('.form-contact').length > 0) {
    $('select[name="subject"]').change(function() {
      $('.subject-details').hide();
      $('.form-fields, .additional-contact-information').show();

      if ($('select[name="subject"] option:selected[value="select"]').length > 0) { $('.form-fields, .additional-contact-information').hide(); }
      if ($('select[name="subject"] option:selected[value*="Giving Question"]').length > 0) { $('.subject-giving').show(); }
      if ($('select[name="subject"] option:selected[value*="Serving Question"]').length > 0) { $('.subject-serving').show(); $('.form-fields').hide(); }
      if ($('select[name="subject"] option:selected[value*="Campus Question"]').length > 0) { $('.subject-campus').show(); $('.form-fields').hide(); }
      if ($('select[name="subject"] option:selected[value*="Job Question"]').length > 0) { $('.subject-jobs').show(); }
      if ($('select[name="subject"] option:selected[value*="Prayer Request"]').length > 0) { $('.subject-prayer').show(); $('.form-fields').hide(); }
      if ($('select[name="subject"] option:selected[value*="YouVersion Question"]').length > 0) { $('.subject-youversion').show(); $('.form-fields').hide(); }
    });
  }

  $('.form-contact').submit(function(event) {
    event.preventDefault();

    var form = $(this);
  
    var subject = form.find('[name="subject"]').val().split("|")[0];
    var recipient = form.find('[name="subject"]').val().split("|")[1];
    var message = form.find('textarea[name="message"]').val();
    var name = form.find('input[name="name"]').val();
    var email = form.find('input[name="email"]').val();
    var detail = name + ": " + email;

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

    if ($(this).find('input[name="email"]').val().length === 0) {
      $(this).find('input[name="email"]').addClass('has-error');
    } else {
      $(this).find('input[name="email"]').removeClass('has-error');
    }

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      return false;
    } else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        message: message,
        user: email,
        key: '345e8e6fb8'
      });  
      

      function GetSelectedItem(el) {
      output.innerHTML = el.value;
}
      
      form.fadeOut();
      form.parent().append("<div class='cta-thanks' style='display: none;'><em>Thanks! We received your message and will be in touch.</em></div>").delay(500).fadeIn();
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
    var email = form.find('input[name="email"]').val();
    var detail = name + ": " + email;

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

    if ($(this).find('input[name="email"]').val().length === 0) {
      $(this).find('input[name="email"]').addClass('has-error');
    } else {
      $(this).find('input[name="email"]').removeClass('has-error');
    }

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      return false;
    } else {
      $.post(form.attr('action'), {
        recipient: recipient,
        subject: subject,
        detail: detail,
        user: email,
        message: message,
        key: '345e8e6fb8'
      });  

      form.fadeOut();
      form.parent().append("<div class='cta-thanks' style='display: none;'><em>Thanks! We received your message and will be in touch.</em></div>").delay(500).fadeIn();
      form.parent().find('.cta-thanks').fadeIn();
    }
    
  });


  // Simple Contact Form
  $('.form-contact-simple-hubspot').submit(function(event) {
    event.preventDefault();

    var form = $(this);
  
    var message = form.find('textarea[name="message"]').val();
    var name = form.find('input[name="name"]').val();
    var email = form.find('input[name="email"]').val();
    var fullname = name.split(' '),
        firstname = fullname[0],
        lastname = fullname[fullname.length - 1];

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

    if ($(this).find('input[name="email"]').val().length === 0) {
      $(this).find('input[name="email"]').addClass('has-error');
    } else {
      $(this).find('input[name="email"]').removeClass('has-error');
    }

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      return false;
    } else {
      $.post(form.attr('action'), {
        firstname: firstname,
        lastname: lastname,
        email: email,
        prayer_requests: message,
      });  

      form.fadeOut();
      form.parent().append("<div class='cta-thanks' style='display: none;'><em>Thanks! We received your message and will be in touch.</em></div>").delay(500).fadeIn();
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
