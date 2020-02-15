var button = $(".toggle-button")
var dock = $(".dock")

button.on("click", animateMenu)

function animateMenu() {
    button.addClass("button-open")
    dock.addClass("dock-open")
}

