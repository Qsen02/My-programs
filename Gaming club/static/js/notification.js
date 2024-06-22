window.addEventListener("load", start);

function start() {
    let notification = document.querySelector(".error");
    notification.style.display = "block";
    notification.addEventListener("click", onClose);

    function onClose() {
        notification.style.display = "none";
    }
}