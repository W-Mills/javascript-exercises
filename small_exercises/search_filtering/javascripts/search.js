const games = [{
  "title": "The Legend of Zelda: Majora's Mask 3D",
  "id": 1,
  "category": "Nintendo 3DS"
}, {
  "title": "Super Smash Bros.",
  "id": 2,
  "category": "Nintendo 3DS"
}, {
  "title": "Super Smash Bros.",
  "id": 3,
  "category": "Nintendo WiiU"
}, {
  "title": "LEGO Batman 3: Beyond Gotham",
  "id": 4,
  "category": "Nintendo WiiU"
}, {
  "title": "LEGO Batman 3: Beyond Gotham",
  "id": 5,
  "category": "Xbox One"
}, {
  "title": "LEGO Batman 3: Beyond Gotham",
  "id": 6,
  "category": "PlayStation 4"
}, {
  "title": "Far Cry 4",
  "id": 7,
  "category": "PlayStation 4"
}, {
  "title": "Far Cry 4",
  "id": 8,
  "category": "Xbox One"
}, {
  "title": "Call of Duty: Advanced Warfare",
  "id": 9,
  "category": "PlayStation 4"
}, {
  "title": "Call of Duty: Advanced Warfare",
  "id": 10,
  "category": "Xbox One"
}];

$(function() {  
  const $items = $('main li');
  const $categories = $(':checkbox');
  const $searchButton = $('#search submit');
  
  $categories.on('change', function(e) {
    $checkbox = $(this);
    const checked = $checkbox.is(':checked');
    const category = $checkbox.val();

    const categoryItems = games.filter(function(item) {
      return item.category === category;
    });

    categoryItems.forEach(item => {
       $items.filter(`[data-id=${item.id}]`).toggle(checked);
    });
  });

  // const $search = $('input[type=submit]');
  // $search.on('submit', function(e) {
  //   e.preventDefault();
  //   alert('searching...');
  // });
});