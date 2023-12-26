let fs = require("fs");

function loadPlaylist() {
    let data = JSON.parse(fs.readFileSync("./views/playlists.json"));
    return data;
}

function savePlaylist(data) {
    fs.writeFileSync("./views/playlists.json", JSON.stringify(data));
}

module.exports = {
    loadPlaylist,
    savePlaylist
}