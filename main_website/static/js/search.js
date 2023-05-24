

document.getElementById("deleteButton").addEventListener("click", function() {
    if (confirm("Are you sure you want to delete this student?")) {
        document.getElementById("deleteForm").submit();
    }
});