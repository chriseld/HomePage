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

  switch(iconId) {
    //settings
    case "1":
      $("#clock").addClass("hide");
      $("#todo").removeClass("hide");
      $("#todo").addClass("show");
      break;
    //to do  
    case "2":
      $(".widget").addClass("hide");
      $("#todo").removeClass("hide");
      $("#todo").addClass("show");
      break;
    //weather
    case "3":
      $(".widget").addClass("hide");
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
});


function clearScreen() {
	var myNode = document.getElementsByClassName("widget");
	for (var i = 0; i < myNode.length; i++) {
		myNode[i].style.display="none";
	}
}

function showScreen(contentId) {
	var contentBlock = document.getElementById(contentId);
	contentBlock.style.display = "block";
}

function getContent(contentId) {
	clearScreen();
	showScreen(contentId);
}

$(".icon").click(function(){
  var contentId = $(this).attr('id');
  console.log(contentId);
  getContent(contentId);
});

// Search Widget

$("#search").click(function () {
  var searchText = $("#searchText").val();
  var searchURL = "https://www.google.com/search?q=" + searchText;
  window.open(searchURL, '_blank');
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

$(document).ready(function () {
  getLocation();


});