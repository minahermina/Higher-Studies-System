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
    if(dateOfBirthField == ""){
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
    if (universityField == "") {
        uniErorr.style.display="block";
        window.scroll(0,300);
        return false;
    }
    else{
        uniErorr.style.display="none";
    }


    const departmentField = document.getElementById("department").value;
    const depErorr=document.getElementById("depError");
    if (departmentField == "") {
        depErorr.style.display="block";
        window.scroll(0,300);
        return false;
    }
    else{
        depErorr.style.display="none";
    }


    const course1 = document.getElementById("c1").value;
    const cr1=document.getElementById("c1Error");
    if (course1 == "") {
        cr1.style.display="block";
        window.scroll(0,1000);
        return false;
    }
    else{
        cr1.style.display="none";
    }


    const course2 = document.getElementById("c2").value;
    const cr2=document.getElementById("c2Error");
    if (course2 == "") {
        cr2.style.display="block";
        window.scroll(0,1000);
        return false;
    }
    else{
        cr2.style.display="none";
    }


    const course3 = document.getElementById("c3").value;
    const cr3 =document.getElementById("c3Error");
    if (course3 == "") {
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

    if (c1 == c2 || c1 == c3 || c2 == c3) {
        alert("Please select different courses for each option.");
        return false;
    }
    return true;
}

function storeData() {
    let form=document.getElementById("form");
    if(validate_form()){
        let name = document.getElementById("name").value;
        let id = document.getElementById("id").value;
        let dateOfBirth = document.getElementById("DateOfBirth").value;
        let university = document.getElementById("university").value;
        let email=document.getElementById("email").value;
        let gender = document.querySelector('input[name="gender"]:checked').value;
        let department = document.getElementById("department").value;
        let status = document.querySelector('input[name="status"]:checked').value;
        let course1 = document.getElementById("c1").value;
        let course2 = document.getElementById("c2").value;
        let course3 = document.getElementById("c3").value;
        let pass=document.getElementById("password").value;
        let gpa=document.getElementById("gpa").value;

        
        let data = JSON.parse(localStorage.getItem("students"));
         
        // check if id exists
        for(j = 0; j < data.length; j++){
            if(data[j]['id'] == id){
                alert("This ID already exists. Enter another one.")
                document.getElementById("id").focus();
                window.scroll(0,0);
                return false;
            }
        }
        // check if email exists
        for(j = 0; j < data.length; j++){
            if(data[j]['email'] == email){
                alert("This email already exists. Enter another one.")
                document.getElementById("email").focus();
                window.scroll(0,0);
                return false;
            }
        }

        let course_and_marks = {};
        course_and_marks[course1]="0,0";
        let course_and_marks2 = {};
        course_and_marks2[course2]="0,0";
        let course_and_marks3 = {};
        course_and_marks3[course3]="0,0";
        
        let studentData = {
            name,
            id,
            dateOfBirth,
            university,
            gender,
            email,
            department,
            status,
            courses: JSON.stringify([course_and_marks, course_and_marks2,course_and_marks3]),
            pass,
            gpa,
        };
    
        data.push(studentData);
    
        localStorage.setItem("students", JSON.stringify(data));
        return true;
    }   
    else{
        return false;
    }
}  

const reset = document.getElementById('reset');

reset.addEventListener('click', function() {
    document.getElementById("name").focus();
    window.scroll({top:1});
});


const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent default form submission behavior
    if(storeData()){
        alert("Your data has been submitted successfully.");
    }
});
  