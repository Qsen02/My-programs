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
    const text = document.querySelector("nav div p");
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