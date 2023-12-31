let fs = require("fs");

function loadClients() {
    let data = JSON.parse(fs.readFileSync("./views/clients.json"));
    return data;
}

function saveClients(data) {
    fs.writeFileSync("./views/clients.json", JSON.stringify(data));
}

module.exports = {
    loadClients,
    saveClients
}