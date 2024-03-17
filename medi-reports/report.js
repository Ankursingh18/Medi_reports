const firebaseConfig = {
    apiKey: "AIzaSyA33_FgsaM0cZhB0ypE3fGo4v3-NkbeQfs",
    authDomain: "report-12e64.firebaseapp.com",
    projectId: "report-12e64",
    storageBucket: "report-12e64.appspot.com",
    messagingSenderId: "637281970457",
    appId: "1:637281970457:web:902800eab47a7402fffd88",
    
  };
  
  
  document.addEventListener("DOMContentLoaded", function() {
    var filetext = document.querySelector(".filetext");
    var uploadpercentage = document.querySelector(".uploadpercentage");
    var progress = document.querySelector(".progress");
    var percentVal;
    var fileItem;
    var fileName;
    var img = document.querySelector(".img");

   function getfile(e) {
        fileItem = e.target.files[0];
        fileName = fileItem.name;
        filetext.innerHTML = fileName;
    }

    function uploadImage() {
        alert("your report has been successfully uploaded")
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            let storageRef = firebase.storage().ref("images/" + fileName);
            let uploadTask = storageRef.put(fileItem);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    uploadpercentage.innerHTML = percentVal + "%";
                    progress.style.width = percentVal + "%";
                },
                (error) => {
                    console.log("error is ", error);
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                        if (url !== "") {
                            img.setAttribute("src", url);
                            img.style.display = "block";
                        }
                    });
                }
            );
        } else {
            console.log("Firebase is not defined.");
        }
    }

    // Attach onchange event listener to file input
    var fileInput = document.getElementById("fileinput");
    if (fileInput) {
        fileInput.addEventListener("change", getfile);
    }

    // Attach onclick event listener to upload button
    var uploadButton = document.getElementById("uploadButton");
    if (uploadButton) {
        uploadButton.addEventListener("click", uploadImage);
    }
});
