function hover() {
  $(this).next('figcaption').delay(2000).fadeIn();
}

function leave() {
  $(this).next('figcaption').stop(true).fadeOut();
}

$(function() {
  $('img').hover(hover, leave);
});
