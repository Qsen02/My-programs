let fs = require("fs");

function load() {
    let data = JSON.parse(fs.readFileSync("./views/notes.json"));
    return data;
}

function save(data) {
    fs.writeFileSync("./views/notes.json", JSON.stringify(data));
}


module.exports = {
    load,
    save,
};