FormValidator = {
  $form: $('form'),
  $input: $('input'),

  init: function() {
    this.$input.on('blur', this.handleBlur.bind(this));
    this.$input.on('focus', this.handleFocus.bind(this));
    this.$form.on('submit', this.handleFormSubmit.bind(this));
    this.$form.on('keypress', 'input', this.handleInputKeyPress.bind(this));
  },
  handleInputKeyPress: function(e) {
    const $domTarget = $(e.target)[0];

    if ($domTarget === $('#first_name')[0] ||
         $domTarget === $('#last_name')[0]) {
          this.handleNameInput(e);
        } else if ($domTarget.classList.contains('creditcard')) {
          this.handleCCInput(e);
        }
  },
  handleCCInput: function(e) {
    if (!/\d/g.test(e.key)) {
      e.preventDefault();
    }
    if (e.target.value.length === 3 && 
        e.target.classList.contains('autotab')) {
      $(e.target).next().next()[0].focus();
    }
  },
  handleNameInput: function(e) {
    if (!/[a-z\s]/gi.test(e.key)) {
      e.preventDefault();
    }
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
      this.serializeForm(e);
    } else {
      e.preventDefault();
      $('#form_message').text("Fix errors before submitting this form.");
      this.validateAllFormInputs();
      return false;
    }
  },
  serializeForm: function(e) {
    e.preventDefault();
    let serializedForm = '';
    let cc = 'cc=';

    $('input').each(function() {
      if (!this.classList.contains('creditcard')) {
        serializedForm += $(this).serialize();
      }
    });
    
    $('.creditcard').each(function() {
      cc += $(this).val();
    });

    serializedForm += cc;
    $('#serialized_form').text(serializedForm);
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
