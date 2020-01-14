// Testing Object Equality
// In JavaScript, comparing two objects either with == or === checks for object identity. In other words, the comparison evaluates to true if it's the same object on either side of == or ===. This is a limitation, in a sense, because sometimes we need to check if two objects have the same key/value pairs. JavaScript doesn't give us a way to do that.

// Write a function objectsEqual that accepts two object arguments and returns true or false depending on whether the objects have the same key/value pairs.

// function objectsEqual(obj1, obj2) {
//   const keys1 = Object.keys(obj1);
//   const keys2 = Object.keys(obj2);

//   for (let i = 0; i < keys1.length; i += 1) {
//     if (obj1[keys1[i]] !== obj2[keys2[i]]) {
//       return false;
//     } else if (keys1[i] !== keys2[i]) {
//       return false;
//     }
//   }

//   return true;
// }


function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) { return true; }

  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();

  for (let i = 0; i < keys1.length; i += 1) {
    if (obj1[keys1[i]] !== obj2[keys2[i]]) {
      return false;
    } else if (keys1[i] !== keys2[i]) {
      return false;
    }
  }

  return true;
}




console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
console.log(objectsEqual({a: 'foo', b: undefined}, {b: 'foo', d: undefined}));  // false

const testObj = {a: {b: 'foo'}, b: undefined}

console.log(objectsEqual(testObj, testObj));  // true