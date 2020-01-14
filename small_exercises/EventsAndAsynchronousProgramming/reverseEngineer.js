// document.querySelector('html').addEventLisener('click', function() {
//   document.querySelector('#container').style = 'display: none';
// });

// document.querySelector('#container').addEventLisener('click', function(e) {
//   e.stopPropagation();
// });

// The above code is equivalent to:

document.querySelector("html").addEventLisener("click", function(e) {
  const container = document.querySelector('#container');

  if (!container.contains(e.target)) {
    container.style = 'display: none';
  }
});
