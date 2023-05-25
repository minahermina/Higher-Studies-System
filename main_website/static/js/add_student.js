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



    return true;
}


const reset = document.getElementById('reset');

reset.addEventListener('click', function() {
    document.getElementById("name").focus();
    window.scroll({top:1});
});


const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    if(!validate_form()) {
        event.preventDefault();
    }
});
  