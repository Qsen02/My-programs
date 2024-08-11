const express = require("express");
const { cors } = require("../middlewares/cors");
const { session } = require("../middlewares/session");

function expressConfig(app) {
    app.use(cors());
    app.use(session());
    app.use(express.json());
}

module.exports = {
    expressConfig
}