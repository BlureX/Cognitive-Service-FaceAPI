var currentImage = $("#image-file")[0];
var status_message = $("#loading-message")[0];

currentImage.addEventListener("change", function () {
    status_message.innerHTML = "Calculating Age...";
    var file = currentImage[0];
    sendImage(file, function () {});

});

function readUrl(input) {
    if (input.files) {
        var image_reader = new FileReader();
        image_reader.readAsDataURL(input.files[0]);
    }
}

function processImage(callback) {
    var file = currentImage[0];
    var reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
    }
    else {
        // status_message.innerHTML = "Invalid file";
        // person_name.innerHTML = "Cannot obtain name for this file";
        console.log("Invalid file");
    }
    reader.onloadend = function (e) {
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            status_message.innerHTML = "Please upload an image file (jpg or png).";
        }
        else {
            callback(file);
        }
    };
}

function sendImage(file, callback) {
    $.ajax({
        url: "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=age&returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=age",
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "853f1791a953444db95387aa0313c142");
        },
        type: "POST",
        url: file
    })
        .done(function (data) {
        if (data) {
            console.log(data);
        }
        else {

        }
    })
        .fail(function (error) {
        console.log(error);
    });
}
