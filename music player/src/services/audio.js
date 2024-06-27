let fs = require("fs/promises");
let path = require("path");

async function delAudio(imgName) {
    await fs.unlink(path.join("public", "songsAndImg", imgName));
}

module.exports = {
    delAudio
}