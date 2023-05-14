if (localStorage.length == 0) {

    // Adding students data
    let course_and_marks = {
        "IS421": "50,100"
    };
    let course_and_marks2 = {
        "CS321": "20,80"
    };
    let course_and_marks3 = {
        "DS221": "40,90"
    };
    let student = {
        name: "Seif Ahmed Ali",
        id: "20210048",
        dateOfBirth: "03/03/2003",
        university: "CU",
        gender: "Male",
        email :"Seif@gmail.com",
        department: "CS",
        status: "active",
        courses: JSON.stringify([course_and_marks, course_and_marks2,course_and_marks3]),
        pass: "123456789aa",
        gpa: "3.7",

    };


    course_and_marks["CS101"] = course_and_marks["IS213"];
    delete course_and_marks["IS213"];

    course_and_marks2["DS123"] = course_and_marks2["CS213"];
    delete course_and_marks2["CS213"];

    let student1 = {
        name: "Ahmed Ghaly Yousse",
        id: "20211100",
        dateOfBirth: "12/10/2002",
        university: "AUC",
        gender: "Male",
        email :"AhmedGhaly@gmail.com",
        department: "IS",
        status: "active",
        courses: JSON.stringify([course_and_marks, course_and_marks2]),
        pass: "000880aBB",
        gpa: "2.8",

    };

    localStorage.setItem('students', JSON.stringify([student, student1]));


    // Adding students data
    let admin = {
        username: "ahmedsamir12",
        pass: "12312443a"
    };

    let admin1 = {
        username: "wafaa87",
        pass: "000asd123a"
    };
    localStorage.setItem('admins', JSON.stringify([admin, admin1]))


    // Adding courses data

    let course1 = {
        name: "Linear Programming",
        id: "DS221",
        department: "Decision Support",
        number_of_hours: "3",
        lecture_day: "Tuesday",
        hall_number: "B-2"
    };

    let course2 = {
        name: "Data Structures and Algorithms",
        id: "CS321",
        department: "Computer Science",
        number_of_hours: "4",
        lecture_day: "Monday",
        hall_number: "C-3"
    };

    let course3 = {
        name: "Database Systems",
        id: "IS421",
        department: "Information Systems",
        number_of_hours: "3",
        lecture_day: "Thursday",
        hall_number: "D-4"
    };

    let course4 = {
        name: "Computer Networks",
        id: "IT521",
        department: "Information Technology",
        number_of_hours: "3",
        lecture_day: "Friday",
        hall_number: "E-5"
    };

    let course5 = {
        name: "Machine Learning",
        id: "AI621",
        department: "Artificial Intelligence",
        number_of_hours: "3",
        lecture_day: "Wednesday",
        hall_number: "F-6"
    };

    
    localStorage.setItem('courses', JSON.stringify([course1,course2,course3,course4,course5]));

    // Adding Departments data 
    let department1 = ["CS321","CS213","CS101"];
    let department2 = ["IS213","IS421","IS236"];
    let department3 = ["DS221","DS123","DS012"];
    let department4 = ["IT521","IT322","IT644"];
    let department5 = ["AI621","AI622","AI200"];

    localStorage.setItem('departments', JSON.stringify([department1,department2,department3,department4,department5]));
    // Note:
    // if you use 
    // let array_of_departments = JSON.parse(localStorage.getItem('departments'));
    // this array is 2d array

    // array_of_department[0]->CS which is an 1d array of strings(IDs of courses)
    // [1]->IS 
    // [2]->DS
    // [3]->IT
    // [4]->AI

    localStorage.setItem("logged_user", "-1"); // no one is logged in the website(menu will be hidden)
}

let element = document.getElementById('menu');
if(localStorage.getItem('logged_user') == "-1"){
    element.classList.add("hidden");
}else{
    element.classList.remove("hidden");
}
