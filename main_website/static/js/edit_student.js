

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
        window.scroll(2,2);
        return false;
    }
    else{
        emailError.style.display = "none";
    }

    const idInput = document.getElementById("sid");
    const idError = document.getElementById("id-error");
    if (!idInput.value || idInput.value.length !== 8 || isNaN(idInput.value)) {
        idError.style.display = "block";
        idInput.focus();
        window.scroll(0,0);
        return false;
    } else {
        idError.style.display = "none";
    }


    return true;
}

// function validateCourses() {
//     var course1 = document.getElementById("c1").value;
//     var course2 = document.getElementById("c2").value;
//     var course3 = document.getElementById("c3").value;
//     const c1 = document.getElementById("c1Error").value;
//     const c2 = document.getElementById("c2Error").value;
//     const c3 = document.getElementById("c3Error").value;
//
//     // Check if all option fields are filled
//     if (course1 === "select" ) {
//         c1.style.display = "block";
//         course1.focus();
//         window.scroll(10,10);
//         return false;
//     } else {
//         c1.style.display = "none";
//     }
//     if(course2 === "select"){
//         c2.style.display = "block";
//         course2.focus();
//         window.scroll(10,10);
//         return false;
//     } else {
//         c2.style.display = "none";
//     }
//     if(course3 === "select"){
//         c3.style.display = "block";
//         course3.focus();
//         window.scroll(10,10);
//         return false;
//     } else {
//         c3.style.display = "none";
//     }
//     // Check if all selected courses are different
//     if (course1 === course2 || course1 === course3 || course2 === course3) {
//         alert("Please select three different courses.");
//         return false;
//     }
//     // All validations passed
//     return true;
// }
// check that user has chosen exactly 3 courses and that they are different
function validateCourses() {
    var course1 = document.getElementById("c1").value;
    var course2 = document.getElementById("c2").value;
    var course3 = document.getElementById("c3").value;
    const c1 = document.getElementById("c1Error").value;
    const c2 = document.getElementById("c2Error").value;
    const c3 = document.getElementById("c3Error").value;
    // Check if all option fields are filled
    if (course1 === "select" || course2 === "select" || course3 === "select") {
         alert("Please select all three courses.");
        return false;
    }

    // Check if all selected courses are different
    if (course1 === course2 || course1 === course3 || course2 === course3) {
        alert("Please select three different courses.");
        return false;
    }
    // All validations passed
    return true;
}


const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    if((!validate_form())||(!validateCourses())){
        event.preventDefault();
    }
});
                    
