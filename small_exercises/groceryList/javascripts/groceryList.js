$(function() {
  $("button").on("click", function(e) {
    e.preventDefault();
    const itemName = $("#item-name").val();
    let quantity = $("#item-quantity").val() || '1'; // if val() is empty(falsy) => assign '1';

    $("ul").append(`<li>${quantity} ${itemName}</li>`);

    const $form = $("form");
    $form.get(0).reset();
  });
});
