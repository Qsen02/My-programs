const express = require("express");
const { session } = require("../middlewears/session");
const { setCors } = require("../middlewears/cors");

function expressConfig(app) {
    app.use(setCors());
    app.use(session());
    app.use(express.json());
}

module.exports = {
    expressConfig
}