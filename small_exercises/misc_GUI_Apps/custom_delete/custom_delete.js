let todo_template;
let context_template;

todo_items = [
  { id: 1, title: 'Buy new laptop' },
  { id: 2, title: 'Stay calm' },
  { id: 3, title: 'Practice with jQuery' },
  { id: 4, title: 'Embrace dynamic content'},
  { id: 5, title: 'Drink more coffee'},
  { id: 6, title: 'Remember that the sun exists'},
];

$(function() {
  const todo_source = $('#li_template').html();
  todo_template = Handlebars.compile(todo_source);

  todo_items.forEach(todo => {
    const html = generateTodoHTML(String(todo.id), todo.title);
    $('#todolist').append(html);
  });

  $('#todolist').on('click', 'a', function(e) {
    e.preventDefault();

    $delete_btn = $(e.target);
    const id = $delete_btn.closest('li').attr('data-id');
    showModal();

    $('#modal_confirm_delete').on('click', 'button', function(e) {
      if (e.target.id === 'delete-yes') {
        const index = getTodoIndex(id);
        todo_items.splice(index, 1);  // remove todo data from array 
        $delete_btn.closest('li').remove(); // remove html for todo
      }

      hideModal();
      $('#modal_confirm_delete').off();
    });
  });

  $('#todolist').on('contextmenu', '.todo', function(e) {
    e.preventDefault();
  
    const $con_menu = $('#context_menu');
    $con_menu.css({
      left: e.offsetX,
      top: e.offsetY,
    });
    $con_menu.show();
    

    // $('#todolist').off();
  });
});

function generateTodoHTML(id, title) {
  const context = { id: id, todo_title: title};
  return todo_template(context);
}

function getTodoIndex(id) {
  let todo_i;

  todo_items.forEach((todo, index) => {
    if (todo.id === Number(id)) {
      todo_index = index;
    }
  });

  return todo_index;
}

function showModal() {
  $('#overlay').show();
  $('#modal_confirm_delete').show();
}

function hideModal() {
  $('#overlay').hide();
  $('#modal_confirm_delete').hide();
}

function showContextMenu() {

}

function hideContextMenu() {
  
}