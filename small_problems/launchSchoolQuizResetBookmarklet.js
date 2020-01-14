// var computer = {
//   price: 30000,
//   shipping: 2000,
//   total: function() {
//     var tax = 3000;
//     specialDiscount = function() {
//       if (this.price > 20000) {
//         return 1000;
//       } else {
//         return 0;
//       }
//     }.bind(this);

//     return this.price + this.shipping + tax - specialDiscount();
//   }
// };

// console.log(computer.total());

// document
//   .querySelectorAll(".result-icon")
//   .forEach(node => (node.style.display = "none"));

// document
//   .querySelectorAll(".ls-checkbox")
//   .forEach(node => (node.checked = undefined));

// document
//   .querySelectorAll(".ls-radio")
//   .forEach(node => (node.checked = undefined));



// bookmarklets? 

javascript:(function(){
  document
    .querySelectorAll(".ls-radio")
    .forEach(node => (node.checked = undefined));
})()

javascript:(function(){
  document
    .querySelectorAll(".ls-checkbox")
    .forEach(node => (node.checked = undefined));
})();

javascript:(function(){
  document
    .querySelectorAll(".result-icon")
    .forEach(node => (node.style.display = "none"));
})();

javascript:(function(){
  document
    .querySelectorAll(".result-icon")
    .forEach(node => (node.style.display = "none"));

  document
    .querySelectorAll(".ls-checkbox")
    .forEach(node => (node.checked = undefined));

  document
    .querySelectorAll(".ls-radio")
    .forEach(node => (node.checked = undefined));

  document.querySelectorAll('.question-header').forEach((node, i) => {
    const button = document.createElement('button');
    button.className = `toggle-button-${i}`;
    node.appendChild(button);
    button.addEventListener('click', () => {
      node.find('discussion-content').style.display = 'none';
    });
  });

})();

