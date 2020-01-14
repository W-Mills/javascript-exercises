function getFormObject($form) {
  const obj = {};

  $form.serializeArray().forEach(input => {
    obj[input.name] = input.value;
  });

  return obj;
}

function createElement(data) {
  const $div = $("<div />", {
    class: data.shape_type,
    data: data,
  });

  resetElement($div);

  return $div;
}

function animateElement() {
  const $element = $(this);
  const data = $element.data();

  console.log(data);

  resetElement($element);

  $element.animate({
    top: +data.end_y,
    left: +data.end_x,
  }, +data.duration);
}

function resetElement($element) {
  const data = $element.data();
   
  $element.css({
    top: Number(data.start_y),
    left: Number(data.start_x)
  });
}

function stopAllAnimation() {
  $('#canvas').find('div').stop();
}

$(function() {
  const $canvas = $("#canvas");

  $('form').submit(function(e) {
    e.preventDefault();

    const $form = $(this);

    const data = getFormObject($form);
    const shape = createElement(data);

    $('#canvas').append(shape);
  });

  $('#animate').on('click', function(e) {
    e.preventDefault();

    $canvas.find("div").each(animateElement);
  });

  $('#stop').on('click', function(e) {
    e.preventDefault();
    stopAllAnimation();
  });
});