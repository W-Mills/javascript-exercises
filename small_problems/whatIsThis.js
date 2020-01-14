// Read the following code carefully. What do you think is logged on line 7. Try to answer the question before you run the code.

var person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

// Line 7 will log NaN because anywhere outside of a function, the keyword this is bound to the global object.