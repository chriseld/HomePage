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
    //history
    case "4":
      $(".widget").addClass("hide");
      $(".widget").removeClass("show");
      $("#history").removeClass("hide");
      $("#history").addClass("show");
      break;
  }

  $(".close-widget").on("click", function () {
    $(".widget").removeClass("show");
    $(".widget").addClass("hide");
    $("#clock").addClass("show");
  })

});

// Settings Widget

$("#name-submit").on("click", function(event) {
  event.preventDefault();
  var name = $("#user-name").val();
  $(".username").text(name);
  localStorage.setItem("name", JSON.stringify(name));
});

function getUsername() {
  if(localStorage.getItem("name")) {
    var name = JSON.parse(localStorage.getItem("name"));
    $(".username").text(name);
  }
}

// Search Widget

$("#search").on("click", function(event) {
  event.preventDefault();
  var searchText = $("#searchText").val();
  var searchURL = "https://www.google.com/search?q=" + searchText;
  window.open(searchURL, '_blank');
});

// Weather Widget

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

  if(!$("#todo-input").val()) return;

  var toDoItems = JSON.parse(localStorage.getItem("toDoItems") || "[]");
  
  if(toDoItems.length < 10) {
  
    var agendaItem = {
      item: $("#todo-input").val(),
      complete: false
    }

    toDoItems.push(agendaItem);

    localStorage.setItem("toDoItems", JSON.stringify(toDoItems));

    getTodos();

    $("#todo-input").val("");
  } else {
    return;
  }
});

function getTodos() {
  $(".item-wrapper").empty();
  var toDoItems = JSON.parse(localStorage.getItem("toDoItems") || "[]");
  for(var i=0; i < toDoItems.length; i++) {
    $(".item-wrapper").append("<div class='itemWrap'><i class='fas fa-times remove'></i><div class='input-item'>" + toDoItems[i].item + "</div><i class='fas fa-check complete'></i></div>");
    if(JSON.parse(localStorage.getItem("toDoItems"))[i].complete === true) {
      var closestItem = JSON.parse(localStorage.getItem("toDoItems"))[i].item;
      console.log(closestItem);
      var nearest = $("div.input-item:contains(" + closestItem + ")");
      nearest.toggleClass("itemComplete");
      nearest.siblings("i.fa-check").addClass("finished");
    }
  }
}

$(document).ready(function () {
  $(document).on('click', '.remove', function() {
      var closestItem = $(this).siblings(".input-item")[0].innerText;
      for(var i = 0; i < JSON.parse(localStorage.getItem("toDoItems")).length; i++) {
        if(JSON.parse(localStorage.getItem("toDoItems"))[i].item === closestItem) {
          var storageArr = [];
          storageArr = JSON.parse(localStorage.getItem("toDoItems"));
          storageArr.splice(i, 1);
          localStorage.setItem("toDoItems", JSON.stringify(storageArr));
        }
      };
      $(this).closest(".itemWrap").remove();
    });
    
    $(document).on('click', '.complete', function() {
      $(this).toggleClass("finished");
      var closestItem = $(this).siblings(".input-item")[0].innerText;
      for(var i = 0; i < JSON.parse(localStorage.getItem("toDoItems")).length; i++) {
        if(JSON.parse(localStorage.getItem("toDoItems"))[i].item === closestItem) {
          var storageArr = [];
          storageArr = JSON.parse(localStorage.getItem("toDoItems"));
          if(storageArr[i].complete === false) {
            storageArr[i].complete = true;
            console.log(this);
            $(this).siblings(".input-item").toggleClass("itemComplete");
          } else {
            storageArr[i].complete = false;
            $(this).siblings(".input-item").toggleClass("itemComplete");
          }
          localStorage.setItem("toDoItems", JSON.stringify(storageArr));
        }
      };
    });
});

// On Page Load

$(document).ready(function () {
  getLocation();
  getTodos();
  getUsername();
});