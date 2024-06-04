let express = require("express");

function expressConfig(app) {
    app.use("/static", express.static("static"));
    app.use(express.urlencoded({ extended: true }));
}

module.exports = {
    expressConfig
}