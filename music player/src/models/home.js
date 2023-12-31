let fs = require("fs");

function loadJson() {
    let data = JSON.parse(fs.readFileSync("./views/home.json"));
    return data;
}

function saveHome(data) {
    fs.writeFileSync("./views/home.json", JSON.stringify(data));
}

module.exports = {
    loadJson,
    saveHome,
}