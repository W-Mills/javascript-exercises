// const Autocomplete = {
  // wrapInput: function() {
  //   const wrapper = document.createElement('div');
  //   wrapper.classList.add('autocomplete-wrapper');
  //   this.input.parentNode.appendChild(wrapper);
  //   wrapper.appendChild(this.input);
  // },

  // createUI: function() {
  //   const listUI = document.createElement('ul');
  //   listUI.classList.add('autocomplete-ui');
  //   this.input.parentNode.appendChild(listUI);
  //   this.listUI = listUI;

  //   const overlay = document.createElement('div');
  //   overlay.classList.add('autocomplete-overlay');
  //   overlay.style.width = this.input.clientWidth + 'px';

  //   this.input.parentNode.appendChild(overlay);
  //   this.overlay = overlay;
  // },

  // bindEvents: function() {
  //   this.input.addEventListener('input', this.valueChanged);
  //   this.input.addEventListener('keydown', this.handleKeydown.bind(this));
  //   this.listUI.addEventListener('mousedown', this.handleMouseDown.bind(this));
  // },

  // handleMouseDown: function(event) {
  //   event.preventDefault();

  //   const element = event.target;
  //   if (element.classList.contains("autocomplete-ui-choice")) {
  //     this.input.value = element.textContent;
  //     this.reset();
  //   }
  // },

  // handleKeydown: function(event) {
  //   switch(event.key) {
  //     case 'ArrowDown':
  //     event.preventDefault();
  //     if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
  //       this.selectedIndex = 0;
  //     } else {
  //       this.selectedIndex += 1;
  //     }
  //     this.bestMatchIndex = null;
  //     this.draw();
  //     break;
  //   case 'ArrowUp':
  //     event.preventDefault();
  //     if (this.selectedIndex === null || this.selectedIndex === 0) {
  //       this.selectedIndex = this.matches.length - 1;
  //     } else {
  //       this.selectedIndex -= 1;
  //     }
  //     this.bestMatchIndex = null;
  //     this.draw();
  //     break;
  //   case 'Tab':
  //     if (this.bestMatchIndex !== null && this.matches.length !== 0) {
  //       this.input.value = this.matches[this.bestMatchIndex].name;
  //       event.preventDefault();
  //     }
  //     this.reset();
  //     break;
  //   case 'Enter':
  //     this.reset();
  //     break;
  //   case 'Escape':
  //     this.input.value = this.previousValue;
  //     this.reset();
  //     break;
  //   }
  // },

  // valueChanged: function() {
  //   const value = this.input.value;
  //   this.previousValue = value;

  //   if (value.length > 0) {
  //     this.fetchMatches(value, function(matches) {
  //       this.visible = true;
  //       this.matches = matches;
  //       this.bestMatchIndex = 0;
  //       this.selectedIndex = null;
  //       this.draw();
  //     }.bind(this));
  //     } else {
  //       this.reset();
  //   }
  // },

  // fetchMatches: function(query, callback) {
  //   const request = new XMLHttpRequest();

  //   request.addEventListener('load', function() {
  //     callback(request.response);
  //   });

  //   request.open('GET', this.url + encodeURIComponent(query));
  //   request.responseType = 'json';
  //   request.send();
  // },

  // draw: function() {
  //   while (this.listUI.lastChild) {
  //     this.listUI.removeChild(this.listUI.lastChild);
  //   }

  //   if (!this.visible) {
  //     this.overlay.textContent = '';
  //     return;
  //   }

  //   if (this.bestMatchIndex !== null && this.matches.length !== 0) {
  //     const selected = this.matches[this.bestMatchIndex];
  //     this.overlay.textContent = this.generateOverlayContent(this.input.value, selected);
  //   } else {
  //     this.overlay.textContent = '';
  //   }

  //   this.matches.forEach(function(match, index) {
  //     const li = document.createElement('li');
  //     li.classList.add('autocomplete-ui-choice');

  //     if (index === this.selectedIndex) {
  //       li.classList.add('selected');
  //       this.input.value = match.name;
  //     }

  //     li.textContent = match.name;
  //     this.listUI.appendChild(li);
  //   }.bind(this));
  // },

  // generateOverlayContent: function(value, match) {
  //   const end = match.name.substring(value.length); // substr() is deprecated;
  //   return value + end;
  // },

  // reset: function() {
  //   this.visible = false;
  //   this.matches = [];
  //   this.bestMatchIndex = null;
  //   this.selectedIndex = null;
  //   this.previousValue = null;

  //   this.draw();
  // },

  // init: function() {
  //   this.input = document.querySelector('input');
  //   this.url = '/countries?matching=';

  //   this.ListUI = null;
  //   this.overlay = null;

  //   this.wrapInput();
  //   this.createUI();

  //   this.valueChanged = debounce(this.valueChanged.bind(this), 300);
    
  //   this.bindEvents();
  //   this.reset();
  // },
// };

function Autocomplete(input, url) {
  this.input = input;
  this.url = url;

  this.ListUI = null;
  this.overlay = null;
  this.visible = false;
  this.matches = [];
  this.selectedIndex = null;
  this.previousValue = null;
  this.bestMatchIndex = null;

  this.wrapInput();
  this.createUI();
  this.valueChanged = debounce(this.valueChanged.bind(this), 300);
  this.bindEvents();
}

Autocomplete.prototype.valueChanged = function() {
  const value = this.input.value;
  this.previousValue = value;

  if (value.length > 0) {
    this.fetchMatches(value, function(matches) {
      this.visible = true;
      this.matches = matches;
      this.bestMatchIndex = 0;
      this.selectedIndex = null;
      this.draw();
    }.bind(this));
    } else {
      this.reset();
  }
};

Autocomplete.prototype.bindEvents = function() {
  this.input.addEventListener('input', this.valueChanged);
  this.input.addEventListener('keydown', this.handleKeydown.bind(this));
  this.listUI.addEventListener('mousedown', this.handleMouseDown.bind(this));
};

Autocomplete.prototype.wrapInput = function() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('autocomplete-wrapper');
  this.input.parentNode.appendChild(wrapper);
  wrapper.appendChild(this.input);
};

Autocomplete.prototype.createUI = function() {
  const listUI = document.createElement('ul');
  listUI.classList.add('autocomplete-ui');
  this.input.parentNode.appendChild(listUI);
  this.listUI = listUI;

  const overlay = document.createElement('div');
  overlay.classList.add('autocomplete-overlay');
  overlay.style.width = this.input.clientWidth + 'px';

  this.input.parentNode.appendChild(overlay);
  this.overlay = overlay;
};

Autocomplete.prototype.fetchMatches = function(query, callback) {
  const request = new XMLHttpRequest();

  request.addEventListener('load', function() {
    callback(request.response);
  });

  request.open('GET', this.url + encodeURIComponent(query));
  request.responseType = 'json';
  request.send();
};

Autocomplete.prototype.handleMouseDown = function(event) {
  event.preventDefault();

  const element = event.target;
  if (element.classList.contains("autocomplete-ui-choice")) {
    this.input.value = element.textContent;
    this.reset();
  }
};

Autocomplete.prototype.handleKeydown = function(event) {
  switch(event.key) {
    case 'ArrowDown':
    event.preventDefault();
    if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex += 1;
    }
    this.bestMatchIndex = null;
    this.draw();
    break;
  case 'ArrowUp':
    event.preventDefault();
    if (this.selectedIndex === null || this.selectedIndex === 0) {
      this.selectedIndex = this.matches.length - 1;
    } else {
      this.selectedIndex -= 1;
    }
    this.bestMatchIndex = null;
    this.draw();
    break;
  case 'Tab':
    if (this.bestMatchIndex !== null && this.matches.length !== 0) {
      this.input.value = this.matches[this.bestMatchIndex].name;
      event.preventDefault();
    }
    this.reset();
    break;
  case 'Enter':
    this.reset();
    break;
  case 'Escape':
    this.input.value = this.previousValue;
    this.reset();
    break;
  }
};

Autocomplete.prototype.draw = function() {
  while (this.listUI.lastChild) {
    this.listUI.removeChild(this.listUI.lastChild);
  }

  if (!this.visible) {
    this.overlay.textContent = '';
    return;
  }

  if (this.bestMatchIndex !== null && this.matches.length !== 0) {
    const selected = this.matches[this.bestMatchIndex];
    this.overlay.textContent = this.generateOverlayContent(this.input.value, selected);
  } else {
    this.overlay.textContent = '';
  }

  this.matches.forEach(function(match, index) {
    const li = document.createElement('li');
    li.classList.add('autocomplete-ui-choice');

    if (index === this.selectedIndex) {
      li.classList.add('selected');
      this.input.value = match.name;
    }

    li.textContent = match.name;
    this.listUI.appendChild(li);
  }.bind(this));
};

Autocomplete.prototype.generateOverlayContent = function(value, match) {
  const end = match.name.substring(value.length); // substr() is deprecated;
  return value + end;
};

Autocomplete.prototype.reset = function() {
  this.visible = false;
  this.matches = [];
  this.bestMatchIndex = null;
  this.selectedIndex = null;
  this.previousValue = null;

  this.draw();
};

document.addEventListener('DOMContentLoaded', function() {
  const input = document.querySelector('input');
  const autocomplete = new Autocomplete(input, "/countries?matching=");
});
