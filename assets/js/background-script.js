var bgCounter = 0,
API_Key = "563492ad6f91700001000001bec666ceb50c42b9b95807ecdd2044cb",
firstImage,
secondImage,
imageArray = [],
userBackground,
searchTerm;

var bgTimer = setInterval(function() {
    firstImage = imageArray[bgCounter];
    bgCounter++;
    // console.log(firstImage);
    secondImage = imageArray[bgCounter];
    bgCounter++;
    // console.log(secondImage);
    slider();
}, 40000);


function slider() {
    if (bgCounter > 15){
        clearInterval(bgTimer);
    } else {
        $("#cover").fadeOut(3000, function() {
            $("#cover").css("background-image", "url(" + firstImage + ")");
            $("#cover").fadeIn(3000, function() {
                $("#cover").delay(15000).fadeOut(3000, function() {
                    $("#cover").css("background-image", "url(" + secondImage + ")");
                    $("#cover").fadeIn(3000);
                });
            });
        });
    }
}

function changeBackground(event) {
        clearInterval(bgTimer);
        bgCounter = 0;
        userBackground = $(this).attr("data-background");
        localStorage.setItem('storedBackground', userBackground);
        searchTerm = userBackground;
        imageArray = [];
        bgTimer = setInterval(function() {
            firstImage = imageArray[bgCounter];
            bgCounter++;
            // console.log(firstImage);
            secondImage = imageArray[bgCounter];
            bgCounter++;
            // console.log(secondImage);
            slider();
        }, 40000);
        $.ajax({
            method: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", API_Key);
            },
            url: "https://api.pexels.com/v1/search?query=" + searchTerm,
            success: function (response) {
                console.log(searchTerm);
                for (var i = 0; i < response.photos.length; i++) {
                    imageArray.push(response.photos[i].src.large2x);
                }
                firstImage = response.photos[bgCounter].src.large2x;
                bgCounter++;
                // console.log(firstImage);
                secondImage = response.photos[bgCounter].src.large2x;
                bgCounter++;
                // console.log(secondImage);
                slider();
            },
            error: function (error) {
                console.log(error);
            }
        });

}

$(document).ready(function() {
    var searchTerm = localStorage.getItem('storedBackground') || "space";
    // if (storedBackground) {
    //     searchTerm = storedBackground;
    // } else {
    //     searchTerm = "space";
    // }
    $.ajax({
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", API_Key);
        },
        url: "https://api.pexels.com/v1/search?query=" + searchTerm,
        success: function (response) {
            for (var i = 0; i < response.photos.length; i++) {
                imageArray.push(response.photos[i].src.large2x);
            }
            firstImage = response.photos[bgCounter].src.large2x;
            bgCounter++;
            // console.log(firstImage);
            secondImage = response.photos[bgCounter].src.large2x;
            bgCounter++;
            // console.log(secondImage);
            slider();
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$("#background-options").on("click", "button", changeBackground);