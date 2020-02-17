var button = $(".toggle-button")
var dock = $(".dock")

button.on("click", openMenu)

function openMenu() {
    // reset()
    $(this).toggleClass("button-open")
    dock.toggleClass("dock-show")
    $(".background").toggleClass("background-shift")
}


// $(".close").on("click", closeMenu)

// function closeMenu() {
//     console.log("clicked");

//     button.toggleClass("button-open")
//     dock.toggleClass("dock-closed")
// }

// function reset() {
//     dock.removeClass("dock-open")
//     dock.removeClass("dock-closed")
// }



// $(document).ready(function() {
//     var $toggleButton = $('.toggle-button');
//     $toggleButton.on('click', function() {
//       $(this).toggleClass('button-open');
//     });
//   });