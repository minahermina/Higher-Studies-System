
function validInputs(){
    const cName = document.getElementById("courseName").value;
    var letters = /^[A-Za-z\s]+[0-9]*$/;// added space to regex
    if(!cName.match(letters) ){
        document.getElementById('cNameError').style.display = "block";
        document.getElementById("courseName").focus();
        return false;
    }
    else{
        document.getElementById('cNameError').style.display = "none";
    }
    var cID=document.getElementById("courseID").value; 
    var m =/^[A-Za-z\s]+[0-9]+$/
    if (!cID.match(m)){  
        document.getElementById('idError').style.display = "block";
        document.getElementById("courseID").focus();
        return false;  
    } 
    else{
        document.getElementById('idError').style.display = "none";
    }
    var department = document.getElementById("department").value;
    if (department === "") {
        document.getElementById('depError').style.display = "block";
        document.getElementById("department").focus();
        window.scroll(10,10);
        return false;
    }else{
        document.getElementById('departmentError').style.display = "none";
    }
    return true;
}

function validateLectureDay() {
    var lDay = document.getElementById("lecDay").value;
    var errorElement = document.getElementById("LError");

    if (lDay === "") {
        errorElement.style.display = "block";
        return false;
    } else {
        errorElement.style.display = "none";
        return true;
    }
}

document.getElementById("lecDay").addEventListener("input", validateLectureDay);


document.getElementById("form").addEventListener("submit", function(event) {
        if(!validInputs()){
        // prevent default form submission behavior
        event.preventDefault();
        }
        else {
        var lDay = document.getElementById("lecDay").value;
        if (lDay === "") {
            // Display an error message for the lecture day field
            document.getElementById("LError").style.display = "block";
            document.getElementById("lecDay").focus();

            // Prevent form submission
            event.preventDefault();
        } else {
            // Hide the error message for the lecture day field
            document.getElementById("LError").style.display = "none";
        }
    }

});


