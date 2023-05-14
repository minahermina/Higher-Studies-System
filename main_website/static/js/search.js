function sortStudentsByProperty(students, property) {
  return students.sort(function(a, b) {
    if (a[property] < b[property]) {
      return -1;
    }
    if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  });
}

// Retrieve students data from localStorage


function renderStudentsTable(students) {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';

  students.forEach(function(student) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.status}</td>
      <td>${student.gpa}</td>
      <td>${student.email}</td>
      <td class="button-container">
        <a href="edit_student.html" data-student='${JSON.stringify(student)}'>
          <i class="fas fa-edit"></i>
        </a>
        <button class="delete" data-studentid="${student.id}"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tableBody.appendChild(newRow);
  });
}

function filterStudentsByNameOrId(students, searchText) {
  return students.filter(function(student) {
    return student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      student.id.toLowerCase().includes(searchText.toLowerCase());
  });
}


let students = JSON.parse(localStorage.getItem('students'));
renderStudentsTable(students);

const searchInput = document.querySelector('input[name="keyword"]');
const searchButton = document.querySelector('.search');

searchButton.addEventListener('click', function() {
  students = JSON.parse(localStorage.getItem('students'));
  event.preventDefault();
  const keyword = searchInput.value.trim();
  if (keyword !== '') {
    // Use filterStudentsByNameOrId
    students = filterStudentsByNameOrId(students, keyword); 
  } else {
    students = JSON.parse(localStorage.getItem('students'));
  }
  // Sort the students based on the currently selected property
  const selectElement = document.getElementById('Students');
  const selectedValue = selectElement.value;
  if (selectedValue === 'name') {
    students = sortStudentsByProperty(students, 'name');
  } else if (selectedValue === 'ID') {
    students = sortStudentsByProperty(students, 'id');
  } else if (selectedValue === 'GPA') {
    students = sortStudentsByProperty(students, 'gpa');
  } else {
    students = students;
  }
  renderStudentsTable(students);
});


const selectElement = document.getElementById('Students');
selectElement.addEventListener('change', function() {
  const selectedValue = selectElement.value;
  if (selectedValue === 'name') {
    students = sortStudentsByProperty(students, 'name');
  } else if (selectedValue === 'ID') {
    students = sortStudentsByProperty(students, 'id');
  } else if (selectedValue === 'GPA') {
    students = sortStudentsByProperty(students, 'gpa');
  } else {
    students = students;
  }
  renderStudentsTable(students);
});


document.addEventListener('click', function(event) {
    // Check if the clicked element is the edit button
    if (event.target.classList.contains('fa-edit')) {
      // Get the student data from the data-student attribute
      const editStudent = JSON.parse(event.target.parentElement.dataset.student);
      // Save the student data to localStorage
      localStorage.setItem('editStudent', JSON.stringify(editStudent));
    }
});

document.addEventListener('click', function(event) {
      // Check if the clicked element is the delete button
    if (event.target.classList.contains('fa-trash')) {
      // Get the student id from the data-studentid attribute
      const studentId = event.target.parentElement.dataset.studentid;
      // Get the students array from localStorage
      let students = JSON.parse(localStorage.getItem('students'));
      // Filter out the student with the matching id
      students = students.filter(function(student) {
        return student.id !== studentId;
      });
      // Save the updated students array to localStorage
      localStorage.setItem('students', JSON.stringify(students));
      // Remove the row from the table
      event.target.parentElement.parentElement.parentElement.remove();
    }
});
