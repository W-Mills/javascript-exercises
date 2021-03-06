// Here's a sample run you can use as a reference:



function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.eat = function() {
  console.log('Eating');
};

Person.prototype.communicate = function() {
  console.log('Communicating');
};

Person.prototype.sleep = function() {
  console.log('Sleeping');
};

Person.prototype.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this, firstName, lastName, age, gender);

  this.specialization = specialization;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.diagnose = function() {
  console.log('Diagnosing');
};
Object.defineProperty(Doctor.prototype, "constructor", {
  value: Doctor,
  enumerable: false,
  writable: true,
});

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);

  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.teach = function() {
  console.log("Teaching");
};
Object.defineProperty(Professor.prototype, 'constructor', {
  value: Professor,
  enumerable: false,
  writable: true,
});

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);

  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.study = function() {
  console.log('Studying');
};
Object.defineProperty(Student.prototype, 'constructor', {
  value: Student,
  enumerable: false,
  writable: true,
});

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, degree);

  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.research = function() {
  console.log('Researching');
};
Object.defineProperty(GraduateStudent.prototype, 'constructor', {
  value: GraduateStudent,
  enumerable: false,
  writable: true,
});

function delegate(callingObject, methodOwner, methodName) {
  const args = Array.prototype.slice.call(arguments, 3);
  return function() {
    return methodOwner[methodName].apply(callingObject, args);
  };
}

function extend(object, mixin) {
  const methodNames = Object.keys(mixin);

  methodNames.forEach(function(name) {
    object[name] = delegate(object, mixin, name);
  });

  return object;
}

const professional = {
  invoice: function() {
    console.log(this.fullName() + " is Billing customer");
  },

  payTax: function() {
    console.log(this.fullName() + " is Paying taxes");
  }
};

var person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person);     // logs true
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

var doctor = extend(new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics'), professional);
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

var professor = extend(new Professor('foo', 'bar', 21, 'gender', 'Systems Engineering'), professional);

console.log(professor instanceof Person);     // logs true
console.log(professor instanceof Professor);  // logs true
professor.eat();                              // logs 'Eating'
professor.communicate();                      // logs 'Communicating'
professor.sleep();                            // logs 'Sleeping'
console.log(professor.fullName());            // logs 'foo bar'
professor.teach();                            // logs 'Teaching'

var graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student); 
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'

doctor.invoice();                          // logs 'foo bar is Billing customer'
doctor.payTax();                           // logs 'foo bar Paying taxes'

professional.invoice = function() {
  console.log(this.fullName() + " is Asking customer to pay");
};

doctor.invoice();                          // logs 'foo bar is Asking customer to pay'
professor.invoice();                       // logs 'foo bar is Asking customer to pay'
professor.payTax();                        // logs 'foo bar Paying taxes'
