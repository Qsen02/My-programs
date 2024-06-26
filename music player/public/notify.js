window.addEventListener("load", start);

function start() {
    let notification = document.querySelector(".notification");

    notification.addEventListener("click", closing);

    function closing(event) {
        event.target.style.display = "none";
    }
}