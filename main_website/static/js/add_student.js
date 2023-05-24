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


    const gpaInput = document.getElementById('gpa');
    const gpaError = document.getElementById("gpaError");
    const gpa = parseFloat(gpaInput.value);
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
        gpaError.style.display = "block";
        gpaInput.focus();
        window.scroll(0,0);
        return false;
    } else {
        gpaError.style.display = "none";
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

function isValid(){
    const form = document.getElementById('form');
    if(validate_form()){
        alert("Your data has been submitted successfully.");
        return true;
    }
    return false;
}

const reset = document.getElementById('reset');

reset.addEventListener('click', function() {
    document.getElementById("name").focus();
    window.scroll({top:1});
});




// form.addEventListener('submit', function(event) {
//     event.preventDefault(); // prevent default form submission behavior
//     if(validate_form()){
//         alert("Your data has been submitted successfully.");
//     }
// });
  