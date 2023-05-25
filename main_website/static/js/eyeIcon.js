let eyeIcon = document.getElementsByTagName('ion-icon')[0];
let field = eyeIcon.previousElementSibling;
eyeIcon.addEventListener('click', () => {
        if (eyeIcon.getAttribute('name') == 'eye') {
            eyeIcon.setAttribute('name', 'eye-off');
            field.type = 'password';
        } else if (eyeIcon.getAttribute('name') == 'eye-off') {
            eyeIcon.setAttribute('name', 'eye');
            field.type = 'text';
        }
});
