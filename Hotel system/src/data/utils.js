export function getUserData() {
    return JSON.parse(localStorage.getItem("user"));
}

export function setUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
}

export function removeUserData() {
    localStorage.removeItem("user");
}

export function updateNav() {
    const guest = document.getElementById("guest");
    const user = document.getElementById("user");
    const admin = document.getElementById("admin");
    let userData = getUserData();
    const profileText = document.querySelector(".profile p");
    if (!userData) {
        guest.style.display = "block";
        user.style.display = "none";
        admin.style.display = "none";
        profileText.textContent = "Guest";
    } else if (userData.IsAdmin) {
        guest.style.display = "none";
        user.style.display = "none";
        admin.style.display = "block";
        profileText.textContent = userData.username;
    } else {
        guest.style.display = "none";
        user.style.display = "block";
        admin.style.display = "none";
        profileText.textContent = userData.username;
    }
}

export function notify(message) {
    const notification = document.querySelector(".notification");
    const text = document.querySelector(".notification p");
    const closeBtn = document.querySelector(".notification button");
    text.textContent = message;
    notification.style.display = "inline-block";
    closeBtn.addEventListener("click", onClose);

    setTimeout(() => notification.style.display = "none", 3000);

    function onClose() {
        notification.style.display = "none";
    }
}