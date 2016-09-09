var currentImage = $("#image-file")[0];
var status_message = $("#loading-message")[0];
var response = $('#returnValue')[0];

currentImage.addEventListener("change", function () {
    response.innerHTML = "Calculating Age...";
    processImage(function (file){
      postImage(currentImage.files[0], function () {});
    })
});

function readUrl(input) {
    if (input.files) {
        var image_reader = new FileReader();
        image_reader.onload = function (e) {
            $("#selected-image").attr("src", e.target.result);
        };
        image_reader.readAsDataURL(input.files[0]);
    }
}

function processImage(callback) {
    var image = currentImage.files[0];
    var reader = new FileReader();
    if (image) {
        reader.readAsDataURL(image);
    }
    else {
        response.innerHTML = "Invalid file";
    }
    reader.onloadend = function (e) {
        if (!image.name.match(/\.(jpg|png|jpeg)$/)) {
            response.innerHTML = "Image file (jpg, jpeg, png) required.";
        }
        else {
            callback(image);
        }
    };
}

function postImage(file, callback) {
    $.ajax({
        url: "https://api.projectoxford.ai/face/v1.0/detect?returnFaceAttributes=age&returnFaceAttributes=age",
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "853f1791a953444db95387aa0313c142");
        },
        type: "POST",
        data: file,
        processData: false
    })
        .done(function (data) {
        if (data) {
            console.log("YES");
            response.innerHTML = data[0].faceAttributes.age
        }
        else {

        }
    })
        .fail(function (error) {
            console.log("NOPE");
        console.log(error);
    });


}
