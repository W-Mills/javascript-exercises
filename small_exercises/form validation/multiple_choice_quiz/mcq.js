const questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
  {
    id: 5,
    description: 'Who is the last surviving man of Earth?',
    options: ['Arthur Hawkwing', 'Andy Dyck', 'Danton Heinen', 'Arthur Dent'],
  },
  {
    id: 6,
    description: 'Who is the paranoid Android?',
    options: ['Max', 'Martin', 'Marvin', 'Maddelbrox'],
  }
];

const answerKey = { 
  '1': 'Douglas Adams',
  '2': '42',
  '3': 'A drink',
  '4': 'Betelgeuse',
  '5': 'Arthur Dent',
  '6': 'Marvin',
 };

const App = {
  questionTemplate: '',

  cacheTemplate: function() {
    $questionTemplate = $('#questionTemplate').remove();
    this.questionTemplate = Handlebars.compile($questionTemplate.html());
  },
  insertQuestions: function() {
    let html = '';
    questions.forEach(q => html += this.questionTemplate(q));
    $('form').prepend(html);
  },
  init: function() {
    this.cacheTemplate();
    this.insertQuestions();
    this.bindEvents();
  },
  bindEvents: function() {
    $('#submit').on('click', (e) => {
      e.preventDefault();
      this.submitQuiz();
    });
    $('#quizReset').on('click', (e) => {
      this.resetQuiz(e);
    });
  },
  resetQuiz: function(e) {
    e.preventDefault();
    $('#quiz')[0].reset();
    $('.question').each((_, q) => {
      q.className = 'question';
      $(q).find('.result').text('');
    }); 
  },
  checkAnswers: function() {
    $('.question').each((_, q) => this.markQuestion(q));
  },
  markQuestion: function(q) {
    const choice = $(q).find('input:checked');
    const correctAnswer = answerKey[q.dataset.id];
    const $result =  $(q).find('.result');

    if (!choice[0]) {
      $result.text(`This question was not answered. The correct answer is: ${correctAnswer}`);
      q.classList.add('needAnswer');
    } else if (choice[0].value === correctAnswer) {
      $result.text(`You're right!`);
      q.classList.add('correctAnswer');
    } else {
      $result.text(`That is incorrect. The correct answer is: ${correctAnswer}`);
      q.classList.add('wrongAnswer');
    }
  },
  submitQuiz: function() {
    this.checkAnswers();
  },

};



App.init();

