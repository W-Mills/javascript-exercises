todo_items = [
  { id: 1, title: 'Buy new laptop' },
  { id: 2, title: 'Stay calm' },
  { id: 3, title: 'Practice with jQuery' },
  { id: 4, title: 'Embrace dynamic content'},
  { id: 5, title: 'Drink more coffee'},
  { id: 6, title: 'Remember that the sun exists'},
];

const TodoApp = {
  todo_template: Handlebars.compile($('#li_template').html()),
  context_menu_template: Handlebars.compile($('#context_menu_template').html()),
  todos: todo_items,
  $todos: $('#todolist'),
  $contextMenu: $('#context_menu'),
  $contextTarget: '',
  cache: {},

  init: function() {
    this.renderTodos();
    this.bindEvents();
  },
  generateTodoHTML: function(id, title) {
    const context = { id: id, todo_title: title};
    return this.todo_template(context);
  },
  renderTodos: function() {
    todo_items.forEach(todo => {
      const html = this.generateTodoHTML(String(todo.id), todo.title);
      $('#todolist').append(html);
    });
  },
  getTodoIndex: function(id) {
    let todo_i;
  
    todo_items.forEach((todo, index) => {
      if (todo.id === Number(id)) {
        todo_index = index;
      }
    });
  
    return todo_index;
  },
  bindEvents: function() {
    this.$todos.on('click', this.hideModal.bind(this));
    this.$todos.on('click', this.showModal.bind(this));
    this.$todos.on('click', 'a', this.showModalEvent.bind(this));
    $('#modal_confirm_delete').on('click', 'button', this.confirmModalDelete.bind(this));
    this.$todos.on('contextmenu', '.todo', this.handleContextMenu.bind(this));
    $(document.body).on('click', this.hideContextMenu.bind(this));
  },
  hideModal: function() {
    $('#overlay').hide();
    $('#modal_confirm_delete').hide();
  },
  showModal: function() {
    $('#overlay').show();
    $('#modal_confirm_delete').show();
  },
  showModalEvent: function(e) {
    e.preventDefault();

    this.cache.$todo = $(e.target).closest('li');
    this.cache.id = this.cache.$todo.attr('data-id');
    this.showModal();
  },
  confirmModalDelete: function(e) {
    if (e.target.id === 'delete-yes') {
      // const index = this.getTodoIndex(this.cache.id);
      // todo_items.splice(index, 1);  // remove todo data from array 
      // this.cache.$todo.remove(); // remove html for todo
      // this.cache = {};
      this.removeTodo();
    }

    this.hideModal();
    // this.confirmModalDelete.off();
  },
  removeTodo: function() {
    let index = this.cache.id;
    todo_items.splice(index, 1);  // remove todo data from array 
    this.cache.$todo.remove(); // remove html for todo
    this.cache = {};
  },
  removeViaContextMenu: function(todoID) {
    const index = this.getTodoIndex(todoID);
    todo_items.splice(index, 1);
    const todo = `[data-id=${todoID}]`;
    $(todo).remove();
  },

  handleContextMenu: function(e) {
    e.preventDefault();
    const left = e.clientX;
    const top = e.clientY;
    const todo = $(e.target).closest('li');
    const todoID = Number($(e.target).parent().attr('data-id'));
    // this.contextTarget = Number($(e.target).closest('li').attr('data-id'));

    this.showContextMenu(todoID, {left: left, top: top});
    return false;
  },
  showContextMenu: function(id, mouseCoordinates) {
    this.hideContextMenu();
    this.$contextMenu.html(this.context_menu_template({id: id}));
    this.$contextMenu.fadeIn(400);
    this.$contextMenu.offset(mouseCoordinates);
    const self = this;
    this.$contextMenu.on('click', '.delete', function(e) {
      e.preventDefault();
      todoID = $(e.target).parent().attr('data-id');
      self.removeViaContextMenu(todoID);
    });  
  },    
  hideContextMenu: function() {
    this.$contextMenu.hide();
  },

};


TodoApp.init();





