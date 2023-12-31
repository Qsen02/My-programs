let fs = require("fs");

function loadProfile() {
    let data = JSON.parse(fs.readFileSync("./views/curClient.json"));
    return data;
}

function saveProfile(data) {
    fs.writeFileSync("./views/curClient.json", JSON.stringify(data));
}

module.exports = {
    loadProfile,
    saveProfile
}