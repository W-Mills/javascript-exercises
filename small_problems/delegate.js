// Delegate
// Write a delegate function that can be used to delegate the behavior of a method or function to another object's method. delegate takes a minimum of two arguments: (1) the object and (2) name of the method on the object. The remaining arguments, if any, are passed — as arguments — to the objects' method that it delegates to.

// Note that this is not the same as using bind. bind returns a new function, whereas delegate maintains the reference.

// Here's a sample run;

Object.prototype.delegate = function(context, method, ...args) {
  return function() {
    return context[method].call(context, ...args);
  };
};

var foo = {
  name: 'test',
  bar: function(greeting) {
    console.log(greeting + ' ' + this.name);
  },
};

var baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = function() { console.log('changed'); };

baz.qux();          // logs 'changed'