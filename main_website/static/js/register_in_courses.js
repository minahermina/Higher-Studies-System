// Retrieve the user's ID from either session or local storage
let userId =localStorage.getItem("logged_user");
if (userId == 0) {
  userId = sessionStorage.getItem('logged_user');
} 
// Retrieve the user's profile from local storage
const users = JSON.parse(localStorage.getItem('students'));
let user =0;
for(var indx=0;indx< users.length;indx++){
    if(users[indx].id == userId){
        user = indx;
    }
}
function retrieveData(){
    document.getElementById('name').value = users[user].name;
    document.getElementById('id').value = users[user].id;
    document.getElementById('department').value = users[user].department;
}
const form = document.querySelector('form');

const departmentDropdown = document.getElementById("department");
const course1Dropdown = document.getElementById("course1");
const course2Dropdown = document.getElementById("course2");
const course3Dropdown = document.getElementById("course3");

// const selectedDepartment = event.target.value;

departmentDropdown.addEventListener("change", (event) => {
    //users[user].department
    selectedDepartment = users[user].department;
    var ind;
    if(selectedDepartment=='CS'){
        ind =0;
    }
    else if(selectedDepartment=='IS'){
        ind = 1;
    }else if(selectedDepartment =='DS'){
        ind =2;
    }
    else if(selectedDepartment =='AI'){
        ind =4;
    }
    else{
        ind =3;
    }
    const dep =JSON.parse(localStorage.getItem('departments'));
    const coursesList = dep[ind];

    course1Dropdown.innerHTML = '<option value="">Select Course</option>';
    course2Dropdown.innerHTML = '<option value="">Select Course</option>';
    course3Dropdown.innerHTML = '<option value="">Select Course</option>';

    // set new options
    for (let i = 0; i < coursesList.length; i++) {
        const course = coursesList[i];
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        const option3 = document.createElement("option");
        option1.value = course;
        option1.text = course;
        option2.value = course;
        option2.text = course;
        option3.value = course;
        option3.text = course;
        course1Dropdown.appendChild(option1);
        course2Dropdown.appendChild(option2);
        course3Dropdown.appendChild(option3);
    }
    /*
    option1.style.display = "block";
    option2.style.display = "block";
    option3.style.display = "block";
    */
});

const event = new Event("change");
departmentDropdown.dispatchEvent(event);



form.addEventListener('submit', (event) => {
    event.preventDefault();
    const department = document.getElementById('department').value;
    const course1 = document.getElementById('course1').value;
    const course2 = document.getElementById('course2').value;
    const course3 = document.getElementById('course3').value;
    var validCh=1;
    if (department === 'select' || course1 === 'select' || course2 === 'select' || course3 === 'select') {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Please select a department and 3 courses.';
        errorMessage.style.color = 'red';
        form.appendChild(errorMessage);
        validCh=0;
    } else if (course1 === course2 || course1 === course3 || course2 === course3) {
        event.preventDefault();
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Please select 3 different courses.';
        errorMessage.style.color = 'red';
        form.appendChild(errorMessage);
        validCh=0;
    }
    let newCourses =JSON.parse( users[user].courses);
    console.log(JSON.stringify(newCourses));
    console.log("jg");
    if(validCh) {
        let course_and_marks1 = {
            [course1]: "0,0"
        };
        let course_and_marks2 = {
            [course2]: "0,0"
        };
        let course_and_marks3 = {
            [course3]: "0,0"
        };
        newCourses.push(JSON.stringify(course_and_marks1));
        newCourses.push(course_and_marks2);
        newCourses.push(course_and_marks3);
        users[user].courses=JSON.stringify(newCourses);
        localStorage.setItem('students',JSON.stringify(users));
    }
});
