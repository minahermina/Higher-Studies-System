
function validInputs(){
    const cName = document.getElementById("courseName").value;
    var letters = /^[A-Za-z\s]+[0-9]?$/; // added space to regex
    if(!cName.match(letters) ){
        document.getElementById('cNameError').style.display = "block";
        document.getElementById("courseName").focus();
        return false;
    }
    else{
        document.getElementById('cNameError').style.display = "none";
    }
    var cID=document.getElementById("courseID").value; 
    var m =/^([a-zA-Z])+([0-9])+$/
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
        //document.getElementById('departmentError').innerHTML = "Please select a department.";
        document.getElementById('departmentError').style.display = "block";
        document.getElementById("department").focus();
        window.scroll(10,10);
        return false;
    }else{
        document.getElementById('departmentError').style.display = "none";
    }
    return true;
}

 const form = document.getElementById('form');

  form.addEventListener('submit', function(event) {

    if(validInputs()){
        alert("Course added successfully!");

    }
    else{// prevent default form submission behavior
        event.preventDefault();
    }
});


