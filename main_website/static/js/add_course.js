
let storedCourses = JSON.parse(localStorage.getItem("courses")) || [];

let coursesID=[];
for(let i=0;i<storedCourses.length;i++){
    coursesID.push(storedCourses[i].id);
}

function validInputs(){
    const cName = document.getElementById("courseName").value;
    var letters = /^[A-Za-z\s]+[0-9]?$/; // added space to regex
    if(!cName.match(letters) ){
        document.getElementById('cNameError').style.display = "block";
        document.getElementById("courseName").focus();
        return false;
    }
    else{
        document.getElementById('cNameError').style.display = "none";
    }
    var cID=document.getElementById("courseID").value; 
    var m =/^([a-zA-Z])+([0-9])+$/
    if (!cID.match(m)){  
        document.getElementById('idError').style.display = "block";
        document.getElementById("courseID").focus();
        return false;  
    } 
    else{
        document.getElementById('idError').style.display = "none";
    }
    if(coursesID.includes(cID)){
        document.getElementById("idError").innerText="There is a course with this ID"; 
        document.getElementById('idError').style.display = "block";
        document.getElementById("courseID").focus();
        return false;
    }
    else{
        document.getElementById('idError').style.display = "none";
    }
    var department = document.getElementById("department").value;
    if (department == "") {
        //document.getElementById('departmentError').innerHTML = "Please select a department.";
        document.getElementById('departmentError').style.display = "block";
        document.getElementById("department").focus();
        window.scroll(10,10);
        return false;
    }else{
        document.getElementById('departmentError').style.display = "none";
    }
    return true;
}

 const form = document.getElementById('form');

  form.addEventListener('submit', function(event) {
      event.preventDefault(); // prevent default form submission behavior
    if(validInputs()){
        alert("Course added successfully!");
    // Get form values
    const courseName = document.getElementById("courseName").value;
    const courseID = document.getElementById("courseID").value;
    const courseHours = document.getElementById("courseHours").value;
    const department = document.getElementById("department").value;
    const lectureDay = document.getElementById("lecDay").value;
    const hallNumber = document.getElementById("hNumber").value;
    // Create an object to store the form data
    let course = {
        name: courseName,
        id: courseID,
        hours: courseHours,
        department: department,
        day: lectureDay,
        hall: hallNumber
    };
    storedCourses.push(course);
    // Save the form data to local storage
    localStorage.setItem("courses", JSON.stringify(storedCourses));

    var departments =JSON.parse(localStorage.getItem('departments'));
        
    if(department=="CS"){
        departments[0].push(courseID);
    }
    if(department=="IS"){
        departments[1].push(courseID);
    }
    if(department=="OR"){
        departments[2].push(courseID);
    }
    if(department=="IT"){
        departments[3].push(courseID);
    }
    if(department=="AI"){
        departments[4].push(courseID);
    }
    localStorage.setItem('departments', JSON.stringify(departments));
    location.reload();
    
    }
});


