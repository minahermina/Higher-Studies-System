let students =JSON.parse(localStorage.getItem('students')) || []

let selectedS = JSON.parse(localStorage.getItem('editStudent'));
function retrieveData(){
    document.getElementById('name').value = selectedS.name;
    document.getElementById('id').value = selectedS.id;
    document.getElementById('department').value = selectedS.department;
    document.getElementById('university').value = selectedS.university;
    document.getElementById('email').value = selectedS.email;
    document.getElementById('GPA').value = selectedS.gpa;
    //document.querySelector('input[name="status"]:checked').value = selectedS.status;
    if (selectedS.gender=="Female"){
        document.getElementById('f').checked =true;
    }else{
        document.getElementById('m').checked =true;
    }
    if (selectedS.status=="active"){
        document.getElementById('a').checked =true;
    }else{
        document.getElementById('ina').checked =true;
    }
}
function modify(){
    var indx=0;
    for(var indx=0;indx<students.length;indx++){
        if(students[indx].id === selectedS.id){
            students[indx].name= document.getElementById('name').value;
            students[indx].id= document.getElementById('id').value;
            students[indx].department= document.getElementById('department').value;
            students[indx].university= document.getElementById('university').value;
            students[indx].email= document.getElementById('email').value;
            students[indx].gpa= document.getElementById('GPA').value ;
            students[indx].status= document.querySelector('input[name="status"]:checked').value;
            students[indx].gender= document.querySelector('input[name="gender"]:checked').value;
            localStorage.setItem('students',JSON.stringify(students));
            localStorage.setItem('editStudent' , JSON.stringify(students[indx]));
            console.log(document.querySelector('input[name="status"]:checked').value);
            break;
        }
    }
    
}

let myButton = document.getElementById('edit');
myButton.addEventListener("click", function(e){
    modify();
});

