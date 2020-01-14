let inventory;

(function() {
  let lastID = 0;

  function Item() {
    const item = {
      id: lastID,
      name: '',
      stock_number: '',
      quantity: 1,
    };
      return item;
  }

  inventory = {
    collection: [],

    setDate: function() {
      const date = new Date();
      $("#order_date").text(date.toLocaleString());
    },

    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    },

    cacheTemplate: function() {
      const $inventoryTemplate = $("#inventory_item");
      $("#inventory_item").remove();
      // inventory.template = $inventoryTemplate.html();
      this.template = Handlebars.compile($inventoryTemplate.html());  // use handlebars for templating html
    },

    deleteItemRow: function(e) {
        e.preventDefault();
        const rowID = this.findID($(e.target).closest('tr'));
        let itemIndex;
        inventory.collection.forEach((item, index) => {
          if (item.id === rowID) {
            itemIndex = index;
          }
        });
        inventory.collection.splice(itemIndex, 1); // remove data from collection array
        this.findParent(e).remove(); // remove row from html
    },

    get: function(id) {
      let found_item;

      this.collection.forEach((item) => {
        if (item.id === id) {
          found_item = item;
        }
      });

      return found_item;
    },

    update: function($item) {
      const id = this.findID($item);
      const item = this.get(id);

      item.name = $item.find("[name^=item_name]").val();
      item.stock_number = $item.find("[name^=item_stock_number]").val();
      item.quantity = $item.find("[name^=item_quantity]").val();
    },

    updateItem: function(e) {
      const $item = this.findParent(e);
      this.update($item);
    },

    findID: function($item) {
      return Number($item.find("input[type=hidden]").val());
    },

    findParent: function(e) {
      return $(e.currentTarget).closest('tr');
    },

    bindEvents: function() {
      $('#add_item').on('click', this.addItemRow.bind(this));
      $('#inventory').on('click', 'a', this.deleteItemRow.bind(this));
      $('#inventory').on('blur', ':input', this.updateItem.bind(this));
    },
    
    addItemRow: function(e) {
      e.preventDefault();
      const item = new Item();
      const $row = $(this.template({ id: item.id }));
      this.collection.push(item);
      $('#inventory').append($row);
      lastID += 1;
    },
  };
})();

$(inventory.init.bind(inventory));