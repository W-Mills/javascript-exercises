// The method franchise.allMovies is supposed to return the following array:

// [
//   'How to Train Your Dragon 1',
//   'How to Train Your Dragon 2',
//   'How to Train Your Dragon 3'
// ]

// Explain why this method will not return the desired object? Try fixing this problem by taking advantage of JavaScript lexical scoping rules.

// This code breaks because on line 16 the callback function passed to map loses its execution context and this refers to the global object. 
// To fix this using lexical scoping rules, within franchise but oustside of the map function you can assign a variable self that is assigned to this, which can then be referenced within map.


// var franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies: function() {
//     const self = this;
//     return [1, 2, 3].map(function(number) {
//       return self.name + ' ' + number;
//     });
//   },
// };

// console.log(franchise.allMovies());

// var franchise = {
//   name: "How to Train Your Dragon",
//   allMovies: function() {
//     return [1, 2, 3].map(function(number) {
//       return this.name + " " + number;
//     }.bind(this));
//   }
// };

// console.log(franchise.allMovies());

var franchise = {
  name: "How to Train Your Dragon",
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + " " + number;
    }, this);
  }
};

console.log(franchise.allMovies());