let password = document.querySelectorAll('input[type=\'password\']')[0];

let eyeIcon = document.getElementsByTagName('ion-icon')[0];
let field = eyeIcon.previousElementSibling;
eyeIcon.addEventListener('click', () => {
        if (eyeIcon.getAttribute('name') == 'eye') {
            eyeIcon.setAttribute('name', 'eye-off');
            field.type = 'password';
        } else if (eyeIcon.getAttribute('name') == 'eye-off') {
            eyeIcon.setAttribute('name', 'eye');
            field.type = 'text';
        } else if (eyeIcon.getAttribute('name') == 'eye-outline') {
            eyeIcon.setAttribute('name', 'eye-off-outline');
            field.type = 'password';
        } else if (eyeIcon.getAttribute('name') == 'eye-off-outline') {
            eyeIcon.setAttribute('name', 'eye-outline');
            field.type = 'text';
        }
});
password.addEventListener('focus',()=>{
    if (eyeIcon.getAttribute('name') == 'eye-outline') {
        eyeIcon.setAttribute('name', 'eye');
        field.type = 'text';
    } else if (eyeIcon.getAttribute('name') == 'eye-off-outline') {
        eyeIcon.setAttribute('name', 'eye-off');
        field.type = 'password';
    }
});

password.addEventListener('blur',()=>{
    if (eyeIcon.getAttribute('name') == 'eye-outline') {
        eyeIcon.setAttribute('name', 'eye');
    } else if (eyeIcon.getAttribute('name') == 'eye-off-outline') {
        eyeIcon.setAttribute('name', 'eye-off');
    }else if (eyeIcon.getAttribute('name') == 'eye-off') {
        eyeIcon.setAttribute('name', 'eye-off-outline');
    }else if (eyeIcon.getAttribute('name') == 'eye') {
        eyeIcon.setAttribute('name', 'eye-outline');
    }

});

