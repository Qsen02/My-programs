export function setUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(localStorage.getItem("user"));
}

export function clearUserData() {
    localStorage.removeItem("user");
}

export function updateNav() {
    const guest = document.querySelector(".guest");
    const user = document.querySelector(".user");
    let userData = getUserData();
    const text = document.querySelector("nav").children[5].children[1];
    if (userData) {
        user.style.display = "inline-block";
        guest.style.display = "none";
        text.textContent = userData.username;
    } else {
        user.style.display = "none";
        guest.style.display = "inline-block";
        text.textContent = "Guest";
    }
}

export function notify(message, color) {
    let notification = document.querySelector(".notification");
    let textMsg = document.querySelector(".notification p");
    let btnRef = document.querySelector(".notification button");
    btnRef.addEventListener("click", onClose);
    notification.style.display = "inline-block";
    textMsg.textContent = message;
    notification.style.backgroundColor = color;
    setTimeout(() => notification.style.display = "none", 3000);

    function onClose() {
        notification.style.display = "none";
    }
}

export function onConfirm(message) {
    let confirming = document.querySelector(".confirm");
    let acceptBtn = document.getElementById("accept");
    let refuseBtn = document.getElementById("refuse");
    let textMsg = document.querySelector(".confirm p");
    confirming.style.display = "inline-block";
    textMsg.textContent = message;

    return new Promise((accept, refuse) => {
        acceptBtn.addEventListener("click", () => {
            confirming.style.display = "none";
            accept(true);
        })
        refuseBtn.addEventListener("click", () => {
            confirming.style.display = "none";
            refuse(false);
        })
    })
}