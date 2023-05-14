let header = ` <nav>
<img src="" alt="">
<h2><a href = "home.html">FCAI CU</a></h2>
<ul id="right">
    <li> <a href="home.html" class = "left-right-border-effect">Home</a></li>
    <li id = "login-button">
        <a href="" class = "left-right-border-effect">Login</a>
        <ul class = "dropdown-content">
            <li><a href="login_student.html">Student</a></li>
            <li><a href="login_admin.html">Admin</a></li>
        </ul>
    </li>

    <li id = "menu">
        <a href="" class = "left-right-border-effect" >Menu</a>
        <ul class = "dropdown-content">
            <li class = "student-only"><a href="register_in_courses.html">Register in a Course</a></li>
            <li class = "student-only"><a href="registered_courses.html">Registered Courses</a></li>
            <li class = "admin-only"><a href="add_Student.html">Add a Student</a></li>
            <li class = "admin-only"><a href="search.html">Search in Students</a></li>
            <li class = "admin-only"><a href="edit_student.html">Edit Student</a></li>
            <li class = "admin-only"><a href="add _course.html">Add Course</a></li>
        </ul>
    </li>
    <li>
        <a href="about.html" class = "left-right-border-effect">About</a>
    </li>
    <li  class="hidden" id="log_out">
        <a class = "left-right-border-effect" >Logout</a>
    </li>

    <li class="">
        <a href="profile.html" class = "left-right-border-effect" id = "profile"style="padding: 10px;">username</a>
    </li>
</ul>
</nav>`;
document.getElementById('website-header').innerHTML = header;

let log_out_button = document.getElementById('log_out');

// clearing sessionStorage if no one is logged in
if(localStorage.logged_user == "-1")
    sessionStorage.clear();

// if there is someone is logged in (show logout & hide login)
if(localStorage.logged_user != "-1" || sessionStorage.length != 0){
    document.getElementById('log_out').classList.remove('hidden');
    document.getElementById('login-button').classList.add('hidden');
}

// if user is logging in is not remebered and the browser is closed
if(localStorage.logged_user == '0' && sessionStorage.length == 0){
    localStorage.logged_user = '-1';
    document.getElementById('log_out').classList.add('hidden');
    document.getElementById('login-button').classList.remove('hidden');
}


let studentMenuOptions = document.getElementsByClassName('student-only');
let adminMenuOptions = document.getElementsByClassName('admin-only');

// Hiding Menu Option based on logged in user
if(localStorage.logged_user != '0' && localStorage.logged_user != "-1"){
    // if logged_user is admin
    if(!isNaN(localStorage.logged_user) && localStorage.logged_user.length >= 8){
         for(let i = 0; i < adminMenuOptions.length; i++){
            adminMenuOptions[i].classList.add('hidden');
        }


    }
    else {
        for(let i = 0; i < studentMenuOptions.length; i++){
            studentMenuOptions[i].classList.add('hidden');
        }
    }

}

if(localStorage.logged_user == '0'){
    if(!isNaN(sessionStorage.logged_user) && sessionStorage.logged_user.length >= 8){
         for(let i = 0; i < adminMenuOptions.length; i++){
            adminMenuOptions[i].classList.add('hidden');
        }


    }
    else {
        for(let i = 0; i < studentMenuOptions.length; i++){
            studentMenuOptions[i].classList.add('hidden');
        }
    }
}


// if logout button is clicked
log_out_button.addEventListener('click', () => {
    // Redirecting to the home page
    let current = window.location.href;
    window.location.href = current.substring(0,current.lastIndexOf('/')) + '/home.html';

    localStorage.logged_user = '-1';
    document.getElementById('log_out').classList.add('hidden');
    document.getElementById('menu').classList.add('hidden');
});