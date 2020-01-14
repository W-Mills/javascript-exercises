// The code below is expected to output the following when run:

// > var helloVictor = createGreeter('Victor');
// > helloVictor.greet('morning');
// = "Good Morning Victor"


function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function(timeOfDay) {
      var msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += this.morning + ' ' + name;
          break;
        case 'afternoon':
          msg += this.afternoon + ' ' + name;
          break;
        case 'evening':
          msg += this.evening + ' ' + name;
          break;
      }
      
      console.log(msg);
    },
  };
}

const helloVictor = createGreeter('Victor');
helloVictor.greet('morning');