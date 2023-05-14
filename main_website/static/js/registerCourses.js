addData();

function getCurrentName(){
    let currentId;
    if(localStorage.getItem('logged_user') == '0')
        currentId = sessionStorage.getItem('logged_user');
        
    else
        currentId = localStorage.getItem('logged_user');
    let students = JSON.parse(localStorage.getItem('students'));
    for(k = 0; k <students.length; k++){
        if(students[k]['id'] == currentId)
            return students[k]['name'];
    }
}
function getStudentCourses(){
    let data = localStorage.getItem('students');
    let students = JSON.parse(data);
    for(i = 0; i < students.length; i++){
        if(students[i]['name'] == getCurrentName()){ // TBD untill they add login session
            return (JSON.parse(students[i].courses));
        }
    }
 }
function getCourseName(CourseId){
    let data = localStorage.getItem('courses');
    let courses = JSON.parse(data);
    for(j = 0; j < courses.length; j++){
        if(courses[j]['id'] == CourseId){
            return courses[j]['name'];
        }
    }
}
function getCourseHours(CourseId){
    let data = localStorage.getItem('courses');
    let courses = JSON.parse(data);
    for(j = 0; j < courses.length; j++){
        if(courses[j]['id'] == CourseId){
            return courses[j]['number_of_hours'];
        }
    }
}
 function addData(){
    let studentCourses = getStudentCourses();
  
    for(i = 0; i < studentCourses.length; i++){
        let courseId = Object.keys(studentCourses[i]);
        let courseName = getCourseName(courseId[0]);
        let courseHours = getCourseHours(courseId[0]);
        let courseMarks = studentCourses[i][courseId].split(',')[0];
        let finalMarks = studentCourses[i][courseId].split(',')[1];
        let totalMarks = (+courseMarks) + (+finalMarks); // unary operator to sum two strings
        addRow(courseId[0], courseName, courseHours, courseMarks, finalMarks, totalMarks);
    }
 }
 
function addRow(courseId, courseName, courseHours, courseMarks, finalMarks, totalMarks) {

    // Get extra data
    let coursesArray = JSON.parse(localStorage.getItem('courses'));
    let department, lecture_day, hall_number;
    for(j = 0; j < coursesArray.length; j++){
        if(coursesArray[j]['id'] == courseId){
            department = coursesArray[j]['department'];
            lecture_day = coursesArray[j]['lecture_day'];
            hall_number = coursesArray[j]['hall_number'];
        }
    }

    //-----------------------------
    let body = document.getElementById('mainTableBody');

    body.innerHTML += 
    `
    <tr class = "parentRow">
        <td>${courseId}</td>
        <td>${courseName}</td>
        <td>${courseHours}</td>
        <td>${courseMarks}</td>
        <td>${finalMarks}</td>
        <td>${totalMarks}</td>
        <td><button class="expand-button" ><i class="fa fa-plus"></i></button></td>
    </tr>
    <tr class="expandedRow" style="display: none;">
        <td colspan="7" class = "test">
            <p><strong>Department</strong> : ${department}</p>
            <p><strong>Lecture Day</strong> : ${lecture_day}</p>
            <p><strong>Hall Number</strong> : ${hall_number}</p>
        </td>
    </tr>
    `;
 }

var buttons = document.querySelectorAll('.expand-button');

buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    var div = this.parentNode.parentNode.nextSibling.nextSibling;
    var btn = this.firstChild;
    console.log(this.firstChild);
    if (div.style.display === 'table-row') {
      div.style.display = 'none';
      btn.classList.replace('fa-minus', 'fa-plus')
    } else {
        div.style.display = 'table-row';
        btn.classList.replace('fa-plus', 'fa-minus')
    }
    
  });
});
