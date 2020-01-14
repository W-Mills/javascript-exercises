const languages = [
  {
    name: 'ruby',
    description: "Ruby is an interpreted, high-level, general-purpose programming language. It was designed and developed in the mid-1990s by Yukihiro 'Matz' Matsumoto in Japan. Ruby is dynamically typed and garbage-collected. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming. According to the creator, Ruby was influenced by Perl, Smalltalk, Eiffel, Ada, Basic, and Lisp.",
  },
  {
    name: 'javascript',
    description: "JavaScript, often abbreviated as JS, is a high-level, interpreted scripting language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web.[9] JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it,[10] and major web browsers have a dedicated JavaScript engine to execute it.",
  },
  {
    name: 'sql',
    description: "SQL ('sequel'; Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS), or for stream processing in a relational data stream management system (RDSMS). It is particularly useful in handling structured data where there are relations between different entities/variables of the data. SQL offers two main advantages over older read/write APIs like ISAM or VSAM. First, it introduced the concept of accessing many records with one single command; and second, it eliminates the need to specify how to reach a record, e.g. with or without an index.",
  },
  {
    name: 'handlebars',
    description: 'A templating language for html that was used here',
  }
];

$(function() {
  const template_source = $('#article_template').html();
  const article_template = Handlebars.compile(template_source);

  languages.forEach(lang => {
    insertHTMLBoilerplate(lang.name, article_template);
    insertTextSnippet(lang.name, lang.description);
  });
  
  $('#languages').on('click', 'button', function(e) {
    e.stopPropagation();
    
    const $button = $(e.target);
    const language = $button.closest('article').attr('data-lang');
    const text = getText(language);

    if ($button.text() === "Show More") {
      insertFullText(language, text);
      $button.text("Show Less");
    } else {
      insertTextSnippet(language, text);
      $button.text("Show More");
    }
  });
});

function getText(language) {
  return languages.filter(lang => {
    return lang.name === language;
  })[0].description;
}

function insertHTMLBoilerplate(lang, template) {
  const lang_capitalized = lang[0].toUpperCase() + lang.slice(1);
  const context = {language: lang, language_capitalized: lang_capitalized};
  const html = template(context);
  $('#languages').append(html);
}

function insertTextSnippet(language, content) {
  const $article = $(`[data-lang=${language}]`);
  if (content.length <= 150) {
    $article.find('button').css({
      display: 'none',
    });
    $article.find('p').text(content);
  } else {
    $article.find('p').text(content.slice(0, 150) + '...');
  }
}

function insertFullText(language, content) {
  $(`[data-lang=${language}]`).find('p').text(content);
}

