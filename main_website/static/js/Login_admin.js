function validateLoginForm() {
    const form = document.querySelector('form');
    const userField = document.querySelector('input[type="text"]');
    const passField = document.querySelector('input[type="password"]');
    let isValid = true;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const userValue = userField.value;
        const passValue = passField.value;

        if (!/^[a-zA-Z0-9]+$/.test(userValue)) {
            alert('Please enter a valid username (alphanumeric).');
            isValid = false;
        }

        if (passValue.length < 8 || !/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(passValue)) {
            alert('Please enter a valid password.');
            isValid = false;
        }

        if (isValid) {
            form.submit();
        }
    });

    return isValid;
}

// prevent user from submitting when the format is invalid
const submitBtn = document.querySelector('button[type="submit"]');
submitBtn.addEventListener('click', (event) => {
    if (!validateLoginForm()) {
        localStorage.setItem('logged_user', -1);
        event.preventDefault();
        return;
    }
});


// check if the id and password exist in local storage
// if the admin logged data is stored, set "logged_user" = ?
const form = document.querySelector('form');
const userField = document.querySelector('input[type="text"]');
const passField = document.querySelector('input[type="password"]');
const userValue = document.querySelector('input[type="text"]').value;
const passValue = passField.value;
function searchLocalStorage(userValue, passValue) {
    if (validateLoginForm()) {
        // alert(userValue + ' ' + passValue);
        let admins = JSON.parse(localStorage.getItem('admins'));

        for (let i = 0; i < admins.length; i++) {
            // alert(admins[i]);
            if (admins[i].username === userValue && admins[i].pass === passValue) {
                return true;
            }
        }
        return false;
    }
}

// if student data is not stored, prevent them from login
submitBtn.addEventListener('click', (event) => {
    
    if (!searchLocalStorage(userField.value, passField.value)) {
        alert('Username does not match password');
        event.preventDefault();
        return;
    }
    
});



let red = false;
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let rememberMeCheckbox = document.getElementById('remember-me');
    let check = rememberMeCheckbox.checked;
    const userValue1 = document.querySelector('input[type="text"]').value;

    if (check) {

        localStorage.setItem('logged_user', userValue1);

    } else {
        localStorage.setItem('logged_user', 0);
        sessionStorage.setItem('logged_user', userValue1);
    }
    // Moving to home page
    let current = window.location.href;
    window.location.href = current.substring(0,current.lastIndexOf('/')) + '/home.html';

});

