var bgCounter = 0,
API_Key = "563492ad6f91700001000001bec666ceb50c42b9b95807ecdd2044cb",
firstImage,
secondImage,
imageArray = [],
userBackground,
searchTerm;

function setImgNames() {
    firstImage = imageArray[bgCounter];
    bgCounter++;
    secondImage = imageArray[bgCounter];
    bgCounter++;
    rotateBackground();
}

// Start Background Timer
var bgTimer = setInterval(function() {
    setImgNames();
}, 36000);

// Function that loops throught the backgrounds
function rotateBackground() {
    // As if the bg counter is greater than 15 Start Over
    if (bgCounter > 15){
        bgCounter = 0;
        setImgNames();
    } 
    // Else Roatate the background imge
    else {
        $("#cover").fadeOut(1500, function() {
            $("#cover").css("background-image", "url(" + firstImage + ")");
            $("#cover").fadeIn(1500, function() {
                $("#cover").delay(15000).fadeOut(1500, function() {
                    $("#cover").css("background-image", "url(" + secondImage + ")");
                    $("#cover").fadeIn(1500);
                });
            });
        });
    }
}
// Lets the user choose which backgrounds they see and 
// stores the answer in local storage
function changeBackground(event) {
        clearInterval(bgTimer);
        bgCounter = 0;
        $("li.button-container > button").removeClass("active-bg");
        $(this).addClass("active-bg");
        userBackground = $(this).attr("data-background");
        localStorage.setItem('storedBackground', userBackground);
        searchTerm = userBackground;
        imageArray = [];
        bgTimer = setInterval(function() {
            setImgNames();
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
                setImgNames();
            },
            error: function (error) {
                console.log(error);
            }
        });

}

$(document).ready(function() {
    var searchTerm = localStorage.getItem('storedBackground') || "space";
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
            setImgNames();
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$("#background-options").on("click", "button", changeBackground);