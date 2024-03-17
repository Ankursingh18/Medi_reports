document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileInput");
    const uploadedImage = document.getElementById("uploadedImage");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const file = fileInput.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader(); // Create a FileReader object

            reader.onload = function(event) {
                // Set the src attribute of the image element to the data URL of the loaded file
                uploadedImage.src = event.target.result;
                uploadedImage.style.display = "block"; // Show the uploaded image
            };

            reader.readAsDataURL(file); // Read the file as a data URL
        } else {
            alert("Please select an image file.");
        }
    });
});
