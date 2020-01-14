function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  const maxSeconds = arguments.length * 2;  
  let secondsElapsed = 0;  
  const timer = setInterval (function() {
    secondsElapsed += 1;
    console.log(secondsElapsed);
    
    if (secondsElapsed >= maxSeconds) {
      clearInterval(timer);
    }
  }, 1000);

  callbacks.forEach(callback => {
    let timeOut = randomTimeout(0, maxSeconds);
    global.setTimeout(callback, timeOut);
  });
}

function randomTimeout(min, max) {
  return (Math.random() * (max - min + 1) + min) * 1000;
}

randomizer(callback1, callback2, callback3);

