// check that user has chosen exactly 3 courses and that they are different
function validateForm() {
    var course1 = document.getElementById("course1").value;
    var course2 = document.getElementById("course2").value;
    var course3 = document.getElementById("course3").value;

    // Check if all option fields are filled
    if (course1 === "select" || course2 === "select" || course3 === "select") {
        alert("Please select all three courses.");
        return false;
    }

    // Check if all selected courses are different
    if (course1 === course2 || course1 === course3 || course2 === course3) {
        alert("Please select three different courses.");
        return false;
    }
    // All validations passed
    return true;
}
