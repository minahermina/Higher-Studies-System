function validate_form(){
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("name-error");

    if (nameInput.value.trim() === "" || !/^[a-zA-Z\s]+$/.test(nameInput.value.trim())) { // added space to regex
        nameError.style.display = "block";
        nameInput.focus();
        window.scroll(0,0);
        return false;
    } else {
        nameError.style.display = "none";
    }

    const usernameInput = document.getElementById("username");
    const usernameError = document.getElementById("username-error");

    if (usernameInput.value.trim() === "" || !/^[a-zA-Z0-9_-]{3,16}$/.test(usernameInput.value.trim())) { // added space to regex
        usernameError.style.display = "block";
        usernameInput.focus();
        window.scroll(0,0);
        return false;
    } else {
        usernameError.style.display = "none";
    }


    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailError.style.display = "inline";
        emailInput.focus();
        window.scroll(0,0);
        return false;
    }
    else{
        emailError.style.display = "none";
    }


    const idInput = document.getElementById("id");
    const idError = document.getElementById("id-error");
    if (!idInput.value || idInput.value.length !== 8 || isNaN(idInput.value)) {
        idError.style.display = "block";
        idInput.focus();
        window.scroll(0,0);
        return false;
    } else {
        idError.style.display = "none";
    }


    const passwordField = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    if (passwordField.value === "" || passwordField.value.length < 8) {
        passwordError.style.display = "block";
        passwordField.focus();
        window.scroll(0,0);
        return false;
    } else {
        passwordError.style.display = "none";
    }  


    const dateOfBirthField = document.getElementById("DateOfBirth").value;
    const dateErorr = document.getElementById("dateError");
    if(dateOfBirthField === ""){
        dateErorr.style.display="block";
        document.getElementById("DateOfBirth").focus();
        window.scroll({top:500});
        return false;
    }
    else{
        dateErorr.style.display="none";
    }


    const universityField = document.getElementById("university").value;
    const uniErorr=document.getElementById("uniError");
    if (universityField === "") {
        uniErorr.style.display="block";
        window.scroll(0,300);
        return false;
    }
    else{
        uniErorr.style.display="none";
    }


    const departmentField = document.getElementById("department").value;
    const depErorr=document.getElementById("depError");
    if (departmentField === "") {
        depErorr.style.display="block";
        window.scroll(0,300);
        return false;
    }
    else{
        depErorr.style.display="none";
    }


    const course1 = document.getElementById("c1").value;
    const cr1=document.getElementById("c1Error");
    if (course1 === "") {
        cr1.style.display="block";
        window.scroll(0,1000);
        return false;
    }
    else{
        cr1.style.display="none";
    }


    const course2 = document.getElementById("c2").value;
    const cr2=document.getElementById("c2Error");
    if (course2 === "") {
        cr2.style.display="block";
        window.scroll(0,1000);
        return false;
    }
    else{
        cr2.style.display="none";
    }


    const course3 = document.getElementById("c3").value;
    const cr3 =document.getElementById("c3Error");
    if (course3 === "") {
        cr3.style.display="block";
        window.scroll(0,1000);
        return false;
    }
    else{
        cr3.style.display="none";
    }


    const c1 = document.getElementById("c1").value;
    const c2 = document.getElementById("c2").value;
    const c3 = document.getElementById("c3").value;

    if (c1 === c2 || c1 === c3 || c2 === c3) {
        alert("Please select different courses for each option.");
        return false;
    }
    return true;
}


const reset = document.getElementById('reset');

reset.addEventListener('click', function() {
    document.getElementById("name").focus();
    window.scroll({top:1});
});

document.getElementById("department").addEventListener("change", function () {
  var departmentId = this.value;
  var course1Select = document.getElementById("c1");
  var course2Select = document.getElementById("c2");
  var course3Select = document.getElementById("c3");

  // Disable the course select menus
  course1Select.disabled = true;
  course2Select.disabled = true;
  course3Select.disabled = true;

  // Clear the course options
  course1Select.innerHTML =
    '<optgroup label="course1"><option value="" disabled selected>Select the first course</option></optgroup>';
  course2Select.innerHTML =
    '<optgroup label="course2"><option value="" disabled selected>Select the second course</option></optgroup>';
  course3Select.innerHTML =
    '<optgroup label="course3"><option value="" disabled selected>Select the third course</option></optgroup>';

  if (departmentId) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var courses = JSON.parse(xhr.responseText);

          for (var i = 0; i < courses.length; i++) {
            var option1 = document.createElement("option");
            option1.value = courses[i]["course_id"];
            option1.textContent = courses[i].name;
            course1Select.appendChild(option1);

            var option2 = document.createElement("option");
            option2.value = courses[i]["course_id"];
            option2.textContent = courses[i].name;
            course2Select.appendChild(option2);

            var option3 = document.createElement("option");
            option3.value = courses[i]["course_id"];
            option3.textContent = courses[i].name;
            course3Select.appendChild(option3);
          }

          // Enable the course select menus
          course1Select.disabled = false;
          course2Select.disabled = false;
          course3Select.disabled = false;
        } else {
          console.error("Failed to retrieve courses: " + xhr.status);
        }
      }
    };

    // Make a request to the server to retrieve courses for the selected department
    xhr.open("GET", "/api/courses/?department=" + departmentId, true);
    xhr.send();
  }
});

const form = document.getElementById('form');
// if(validate_form()){
//     form.addEventListener('submit', function() {
//         alert("Your data has been submitted successfully.");
//     });
// }
form.addEventListener('submit', function(event) {
    if(validate_form()){
        alert("Your data has been submitted successfully.");
    }
    else{
        event.preventDefault();
    }
});
  