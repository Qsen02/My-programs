let fs = require("fs/promises");
let path = require("path");

async function delImg(imgName) {
    await fs.unlink(path.join("static", "images", imgName));
}

module.exports = {
    delImg
}