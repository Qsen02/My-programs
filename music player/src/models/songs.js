let fs = require("fs");

function loadSong() {
    let data = JSON.parse(fs.readFileSync("./views/songs.json"));
    return data;
}

function saveSong(data) {
    fs.writeFileSync("./views/songs.json", JSON.stringify(data));
}

module.exports = {
    loadSong,
    saveSong
};