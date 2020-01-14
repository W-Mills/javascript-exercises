// Read the following code carefully. Will the JavaScript garbage collection mechanism garbage collect the variable count after the function counter is run on line 10?

function makeCounter() {
  var count = 1;

  return function() {
    console.log(count++)
  };
}

var counter = makeCounter();
counter();
counter();
counter();