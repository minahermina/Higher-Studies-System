

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



const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    if(!validate_form()){
        event.preventDefault();
    }
});
