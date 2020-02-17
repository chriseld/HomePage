// Here are the HTML elements that need to exist on the page

// <div id="clock" class="clock">loading ...</div>

// <input type="text" name="searchText" id="searchText" placeholder="Google Search">
// <img src="#" alt="#" id="search"></img>

// <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js"></script>

// ...

// Geolocation

var city;
var lat;
var lon;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    getWeather();
}
  
function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
}

// Clock Functionality

$('#clock');

function updateTime() {
  $('#clock-date').html(moment().format('MMMM D YYYY'));
  $('#clock-time').html(moment().format('H:mm:ss'));
}

setInterval(updateTime, 1000);

// Widget Show/Hide Functionality

// Search Widget

$("#search").click(function(){
    var searchText = $("#searchText").val();
    var searchURL = "https://www.google.com/search?q=" + searchText;
    window.open(searchURL,'_blank');
});

// Weather Widget

function getWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=6267744aea8e18ec095542c8b808ca0a";
    var data = $.get(queryURL);
    console.log(data);

}

// Task Manager Widget

// Settings Widget
    // Dark/Light Mode Switcher

$( document ).ready(function() {
    getLocation();


});