const $apples = $("#apples");
const $guesses = $("#guesses");
const $spaces = $("#spaces");
const $message = $("#message");

const randomWord = (function() {
  const words = [
    "butterfly",
    "symphony",
    "parkour",
    "traitor",
    "continent",
    "subway",
    "transportation",
    "entertainment",
    "computer",
    "cyberpunk",
    "basketball",
  ];

  return function() {
    const index = getRandomIndex(words);
    const word = words.splice(index, 1).toString();

    return word;
  };
})();

function getRandomIndex(array) {
  const maxIndex = array.length - 1;

  return Math.floor(Math.random() * (maxIndex + 1));
}

function Game() {
  this.reset();
}

Game.prototype = {
  maxGuesses: 6,

  displayMessage: function(text) {
    $message.text(text);
  }, 
  setBlanks: function() {
    const spaces = (new Array(this.word.length + 1)).join("<span></span>");
    $spaces.find('span').remove();
    $spaces.append(spaces);
    this.$spaces = $("#spaces span");
  },
  init: function() {
    // this.unbind();
    this.bind();
    this.setBlanks();
    this.setReplay();
    this.setGameStatus();
    console.log(this);
  },
  bind: function() {
    const self = this;
    $(document).on("keypress", function(e) { // on("keypress.game")
      const key = e.key.toLowerCase();
      
      if (/[a-z]/.test(key) && !self.guesses.includes(key) && key !== 'enter') {
        self.processGuess(key);        
      }
    });
  },
  unbind: function() {
    $(document).off('keypress'); // off('.game') 
  },
  processGuess: function(key) {
    this.guesses.push(key);
    const word = this.word.join('');

    if (word.includes(key)) {
      this.renderCorrectGuess(key);
    } else {
      this.renderWrongGuess();
    }
    this.renderGuess(key);
  },
  renderGuess: function(key) {
    $guesses.append(`<span>${key}</span>`);    
  },
  renderCorrectGuess: function(key) {
    const regex = new RegExp(key, 'g');
    this.correctGuesses += this.word.join('').match(regex).length;
    this.word.forEach((char, index) => {
      if (key === char) {
        $spaces.find('span').eq(index).text(key);
      }
    });
    if (this.correctGuesses === this.word.length) {
      this.win();
    }
  },
  renderWrongGuess: function(letter) {
    this.wrongGuesses += 1;
    $apples.removeClass().addClass(`guess_${this.wrongGuesses}`);
    if (this.wrongGuesses >= this.maxGuesses) {
      this.lose();
    }
  },
  clearGuesses: function() {
    $guesses.find('span').remove();
  },
  win: function() {
    this.displayMessage("YOU WON!");
    this.unbind();
    this.setGameStatus('win');
  },
  lose: function() {
    this.displayMessage("YOU LOST!");
    this.setGameStatus("lose");
  },
  setGameStatus: function(status) {
    $('body').removeClass();
    if (status) {
      $("body").addClass(status);
    }
  },
  setReplay: function() {
    const self = this;
    $('#replay').off().on('click', function(e) {
      e.preventDefault();
      self.reset();
    });
  },
  reset: function() {
    this.word = randomWord().split('');
    this.wrongGuesses = 0;
    this.correctGuesses = 0;
    this.guesses = [];
    this.init();
    this.clearGuesses();
    $message.text("");
    $('body').removeClass();
    $apples.removeClass();

    if (this.word.length === 0) {
      this.displayMessage("Sorry, I've run out of words!");
    }
  },
};


const round = new Game();
