window.addEventListener("load", start);

function start() {
    let notification = document.querySelector(".error");
    notification.style.display = "block";
    notification.addEventListener("click", onClose);

    setInterval(() => notification.style.display = "none", 10000);

    function onClose(event) {
        notification.style.display = "none";
    }
}