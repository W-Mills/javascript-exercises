FormValidator = {
  $form: $('form'),
  $input: $('input'),
  error: document.querySelector('.error'),

  messages: {
    emptyField: "This field is required",
    passwordTooShort: "Password must be at least 10 characters",
    badPhoneNumber: "Phone number must be in the format: 123-456-7890",
    formError: "Error: Some fields were filled out incorrectly",
  },

  init: function() {
    this.$input.on('blur', this.handleBlur.bind(this));
    this.$input.on('focus', this.handleFocus.bind(this));
    this.$form.on('submit', this.handleFormSubmit.bind(this));
  },
  handleBlur: function(e) {
    const $target = $(e.target);
    if ($('form')[0].checkValidity()) {
      $('#form_message').text('');
    }
    this.validateInput($target);
  },
  handleFocus: function(e) {
    const $target = $(e.target);
    $target.next('.error_message').text('');
    $target.removeClass('.error_message');
  },
  handleFormSubmit: function(e) {
    if ($('form')[0].checkValidity()) {
      $('.form_errors').text('');
      alert('Success!');
    } else {
      e.preventDefault();
      $('#form_message').text("Fix errors before submitting this form.");
      this.validateAllFormInputs();
      return false;
    }
  },
  handleValueMissing: function($target) {
    if (!$target.hasClass('phone')) {
      $target.next('.error_message').text('This is a required field');
      $target.addClass('invalid_field');
    }
  },
  handlePatternMismatch: function($target) {
    if ($target.hasClass('phone')) {
      $target.next('.error_message').text('Phone number must be in the form: 123-456-7890');
    } else if ($target.hasClass('email')) {
      $target.next('.error_message').text('Please enter a valid email address');
    }
    $target.addClass('invalid_field');
  },
  handlePasswordTooShort: function($target) {
    $target.next('.error_message').text('Password must be at least 10 characters long');
  },
  validateInput: function($target) {  
    if ($target[0].validity.valueMissing) {
      this.handleValueMissing($target);
      return false;
    } else if ($target[0].validity.patternMismatch) {
      this.handlePatternMismatch($target);
      return false;
    } else if ($target.hasClass('password') && $target[0].validity.tooShort) {
      this.handlePasswordTooShort($target);
      return false;
    }
    
    $target.removeClass('invalid_field');
    return true;
  },
  validateAllFormInputs: function() {
    const self = this;
    $('input').each(function() {
      self.validateInput($(this)); 
    });
  },
};

FormValidator.init();
