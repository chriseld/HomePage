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
  switch (error.code) {
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

$(".icon").click(function () {
  var iconId = $(this).attr('id');
  // console.log(iconId);
  // getContent(contentId);

  switch (iconId) {
    //settings
    case "1":
      $(".widget").removeClass("show")
      $(".widget").addClass("hide");
      $("#settings").removeClass("hide");
      $("#settings").addClass("show");
      break;
    //to do  
    case "2":
      $(".widget").removeClass("show");
      $(".widget").addClass("hide");
      $("#todo").removeClass("hide");
      $("#todo").addClass("show");
      break;
    //weather
    case "3":
      $(".widget").addClass("hide");
      $(".widget").removeClass("show");
      $("#weather").removeClass("hide");
      $("#weather").addClass("show");
      break;
    //clock
    case "4":
      $("#clock").addClass("hide");
      $("#todo").removeClass("hide");
      $("#todo").addClass("show");
      break;
  }

  $(".close-widget").on("click", function () {
    $(".widget").removeClass("show");
    $(".widget").addClass("hide");
    $("#clock").addClass("show");
  })

});



// Search Widget

$("#search").click(function () {
  var searchText = $("#searchText").val();
  var searchURL = "https://www.google.com/search?q=" + searchText;
  window.open(searchURL, '_blank');
});

// Weather Widget

// Change3
function getWeather() {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=6267744aea8e18ec095542c8b808ca0a";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var location = JSON.parse(JSON.stringify(response.name));
    var wicon = $("<img class='wicon' alt='" + response.weather[0].description + "' src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
    var temperature = JSON.parse(JSON.stringify(Math.round(response.main.temp))) + "&deg;F";
    var highTemp = JSON.parse(JSON.stringify(Math.round(response.main.temp_max))) + "&deg;F";
    var lowTemp = JSON.parse(JSON.stringify(Math.round(response.main.temp_min))) + "&deg;F";
  
    $(".location").append(location);
    $(".wicon").append(wicon);
    $(".temp").append(temperature);
    $(".High").append(highTemp);
    $(".Low").append(lowTemp);

});

}

// Task Manager Widget

$("#todo-submit").on("click", function(event) {

  event.preventDefault();

var item = $("<div>");
item.attr("id", "agenda-item");
item.addClass("input-item");
$(".item-wrapper").append(item);

  item.append("<i class='fas fa-times'></i><div class='input-item'>" + $("#todo-input").val() + "</div><i class='fas fa-check'></i><br>");

});

// Settings Widget
// Dark/Light Mode Switcher

$(document).ready(function () {
  getLocation();


});