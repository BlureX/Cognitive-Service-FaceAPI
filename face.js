file_list.addEventListener("change", function () {
    status_message.innerHTML = "Please wait while we find out who this is";
    status_message.style.color = "red";
    status_message.style.display = "block";
    processImage(function (file) {
        sendCelebrityRequest(file, function () {
            sendSearchRequest();
        });
    });
});

function readUrl(input) {
    if (input.files) {
        var image_reader = new FileReader();
        image_reader.onload = function (e) {
            $("#selected-image").attr("src", e.target.result);
            person_name.innerHTML = "Fetching name";
        };
        image_reader.readAsDataURL(input.files[0]);
    }
}


function sendImage(file, callback) {
    $.ajax({
        url: "https://api.projectoxford.ai/face/v1.0/detect?returnFaceAttributes",
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
            if ((typeof (data.categories[0].detail) != "undefined") && ((typeof (data.categories[0].detail.celebrities[0]) != "undefined"))) {
                var name = data.categories[0].detail.celebrities[0].name;
                var description = data.description.captions[0].text;
                person_name.innerHTML = name;
                $("#details").html("");
                callback();
            }
            else {
                person_name.innerHTML = "Sorry, person not found";
                status_message.innerHTML = "We could not find who this is, please try another image";
                $("#details").html("");
            }
        }
        else {
            status_message.innerHTML = "We could not find who this is, please try again";
            console.log("We could not find who this is, please try again");
        }
    })
        .fail(function (error) {
        status_message.innerHTML = "Sorry, something went wrong. Please try again";
        console.log(error);
    });
}
