window.addEventListener("load", start);

function start() {
    let notification = document.querySelector(".notification");

    notification.addEventListener("click", closing);

    function closing() {
        notification.style.display = "none";
    }
}