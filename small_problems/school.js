function createSchool() {
  const students = [];
  let nextStudentId = 666;
  const validYears = ["1st", "2nd", "3rd", "4th", "5th"];

  function findStudent(id) {
    student = students.filter(student => {
      if (student.id === id) {
        return student;
      }
    });
    return student[0];
  }

  return {
    addStudent: function(name, year) {
      if (validYears.includes(year) && typeof name === "string") {
        const student = this.createStudent(name, year, nextStudentId);
        students.push(student);
        nextStudentId += 1;
        return student;
      } else {
        console.log("Invalid Year");
      }
    },

    enrollStudent: function(id, courseName, courseCode) {
      students.forEach(student => {
        if (student.id === id) {
          const course = { name: courseName, code: courseCode };
          student.addCourse(course);
        }
      });
    },

    getReportCard: function(name) {
      pupil = students.filter(student => {
        return student.name === name;
      })[0];

      pupil.getReportCard();
    },

    courseReport: function(courseName) {
      const enrolledStudents = students.filter(student => {
        const enrolled = student.listCourses();
        return enrolled.some(course => {
          return course.name === courseName;
        });
      });

      const courseGrades = [];
      const output = [];

      enrolledStudents.forEach(student => {
        const grade = student.getCourseGrade(courseName);
        if (grade) {
          courseGrades.push(grade);
          output.push(`${student.name}: ${grade}`);
        }
      });

      const courseAverage = Math.round(
        courseGrades.reduce((sum, grade) => {
          return sum + grade;
        }, 0) / courseGrades.length
      );

      if (output.length > 0) {
        console.log(`=${courseName} Grades=`);
        output.forEach(student => {
          console.log(student);
        });
        console.log("---");
        console.log(`Course Average: ${courseAverage}`);
      } else {
        console.log(undefined);
      }
    },

    addStudentGrade: function(id, courseCode, grade) {
      const student = findStudent(id);
      student.addGrade(courseCode, grade);
    },

    createStudent: function(name, year, id) {
      const enrolledCourses = [];

      return {
        name: name,
        year: year,
        id: id,

        info: function() {
          console.log(`${name} is a ${year} year student`);
        },

        addCourse: function(course) {
          enrolledCourses.push(course);
        },

        listCourses: function() {
          return enrolledCourses;
        },

        addGrade: function(code, grade) {
          enrolledCourses.forEach(course => {
            if (course.code === code) {
              course.grade = grade;
            }
          });
        },

        getReportCard: function() {
          enrolledCourses.forEach(course => {
            if (course.grade) {
              console.log(`${course.name}: ${course.grade}`);
            } else {
              console.log(`${course.name}: In progress`);
            }
          });
        },

        getCourseGrade: function(courseName) {
          course = enrolledCourses.filter(course => {
            return course.name === courseName;
          })[0];

          if (course) {
            return course.grade;
          }
        },

        addNote: function(code, note) {
          enrolledCourses.forEach(course => {
            if (course.code === code && course.note === undefined) {
              course.note = note;
            } else if (course.code === code) {
              course.note += `; ${note}`;
            }
          });
        },

        updateNote: function(code, note) {
          enrolledCourses.forEach(course => {
            if (course.code === code) {
              course.note = note;
            }
          });
        },

        viewNotes: function() {
          enrolledCourses.forEach(course => {
            if (course.note) {
              console.log(`${course.name}: ${course.note}`);
            }
          });
        }
      };
    }
  };
}

const school = createSchool();

school.addStudent('foo', '3rd');
school.enrollStudent(666, 'Math', 101);
school.addStudentGrade(666, 101, 95);
school.enrollStudent(666, 'Advanced Math', 102);
school.addStudentGrade(666, 102, 90);
school.enrollStudent(666, 'Physics', 202);

school.addStudent("bar", "1st");
school.enrollStudent(667, "Math", 101);
school.addStudentGrade(667, 101, 91);

school.addStudent("qux", "2nd");
school.enrollStudent(668, "Math", 101);
school.addStudentGrade(668, 101, 93);
school.enrollStudent(668, "Advanced Math", 102);
school.addStudentGrade(668, 102, 90);

// school.rollCall();
school.getReportCard('foo');
console.log();
school.courseReport('Math');
console.log();
school.courseReport('Advanced Math');
console.log();
school.courseReport('Physics');


// only returning the properties that aren't methods for the three objects
// foo;
// {
//   name: 'foo',
//   year: '3rd',
//   courses: [
//     { name: 'Math', code: 101, grade: 95, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//     { name: 'Physics', code: 202, }
//   ],
// }

// // bar;
// {
//   name: 'bar',
//   year: '1st',
//   courses: [
//     { name: 'Math', code: 101, grade: 91, },
//   ],
// }

// // qux;
// {
//   name: 'qux',
//   year: '2nd',
//   courses: [
//     { name: 'Math', code: 101, grade: 93, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//    ],
// }


// school.getReportCard(foo);
// // = Math: 95
// // = Advanced Math: 90
// // = Physics: In progress

// school.courseReport('Math');
// // = =Math Grades=
// // = foo: 95
// // = bar: 91
// // = qux: 93
// // = ---
// // = Course Average: 93

// school.courseReport('Advanced Math');
// // = =Advanced Math Grades=
// // = foo: 90
// // = qux: 90
// // = ---
// // = Course Average: 90

// school.courseReport('Physics');
// // = undefined









