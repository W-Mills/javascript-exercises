let options_template;
let email_template;

function findStaffName(staff_id, staff) {
  let name;
  staff.forEach(staff => { if (staff_id === staff.id) {
      name = staff.name;
    }
  });

  return name;
}

function populateStaffSchedules() {
  let staff;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/api/staff_members');
  xhr.responseType = 'json';
  xhr.timeout = 10000;

  xhr.addEventListener('load', function(e) {
    staff = xhr.response;

    (function setSchedules() {
    
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:3000/api/schedules');
      xhr.timeout = 10000;
      xhr.responseType = 'json';
    
      xhr.addEventListener('load', function(e) {
        if (xhr.status === 200) {
          let schedules = xhr.response.filter(schedule => schedule.student_email === null);
          schedules.forEach(schedule => {
            const name = findStaffName(schedule.staff_id, staff);
            const date = schedule.date;
            const time = schedule.time;
            const opt_value = `${name} | ${date} | ${time}`;  // keep staff_id value for html value attr?
            const html = options_template({schedule_id: schedule.id, opt_value: opt_value});
            const $schedules = $('#schedules');
            $schedules.append(html);
          });
        }
      });
    
      xhr.addEventListener('timeout', function(e) {
        console.log('The request for schedules has timed out, please try again later');
      });
    
      xhr.addEventListener('loadend', function(e) {
        console.log('The request for schedules has completed');
      });
    
      xhr.send();
    })();
  });

  xhr.addEventListener('timeout', function(e) {
    console.log('The request for the staff list has timed out, please try again later');
  });

  xhr.addEventListener('loadend', function(e) {
    console.log('The request for the staff list has completed');
  });

  xhr.send();
}

function getAllStudents() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/api/students');
  xhr.responseType = 'json';
  xhr.timeout = 10000;
  
  xhr.addEventListener('load', function(e) {
    if (xhr.status === 200) {
      console.dir(xhr.response);
    }
  });

  xhr.send();
}

function handleScheduleRequest() {
  $('#schedule_request').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/bookings');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    let studentEmail = $('#email').val();
    
    const data = {
      id: $('#schedules').val(),
      student_email: studentEmail,
    };

    xhr.addEventListener('load', function(e) {
      if (xhr.status === 204) {
        alert(xhr.responseText);
      } else if (xhr.status === 404) {
        alert('Student does not exist, please enter student information');
        addStudent(xhr, studentEmail);
      }
    });

    xhr.send(JSON.stringify(data));
  });
}

function addStudent(xhr, studentEmail) {
  const bookingSequence = xhr.responseText.match(/\d+/g)[0];
  
  const dataStart = {
    studentEmail: studentEmail,
    bookingSequence: bookingSequence,
  };
  $('fieldset').append(email_template(dataStart));

  $('#registerStudent').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    xhrNewStudent = new XMLHttpRequest();
    xhrNewStudent.open('POST', 'http://localhost:3000/api/students');
    xhrNewStudent.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    const studentData = {
      email: $('#studentEmail').val(),
      name: $('#studentName').val(),
      booking_sequence: Number(bookingSequence),
    };

    xhrNewStudent.addEventListener('load', function(e) {
      if (xhrNewStudent.status === 201) {
        console.log(xhrNewStudent.responseText);
        alert("Success!");
        $('#studentField').remove();
      } else {
        console.log(xhrNewStudent.responseText);
        alert("Big problems for you my friend");
      }
    });
    
    xhrNewStudent.send(JSON.stringify(studentData));
  });
}

document.addEventListener('DOMContentLoaded', function(e) {
  const options_source = document.querySelector('#options_template').innerHTML;
  options_template = Handlebars.compile(options_source);
  const email_source = $('#email_template').html();
  email_template = Handlebars.compile(email_source);

  populateStaffSchedules();
  handleScheduleRequest();
  getAllStudents();
});
