    var deleteButtons = document.querySelectorAll(".delete");

    // Attach click event handler to each delete button
    deleteButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            if (confirm("Are you sure you want to delete this student?")) {
                // Find the closest delete-form ancestor of the clicked button
                var deleteForm = button.closest(".delete-form");
                deleteForm.submit();
            }
        });
    });