const cookieParser = require("cookie-parser");
const express = require("express");
const { session } = require("../middlewares/session");

const secret = "super secret cookie";

function expressConfig(app) {
    app.use(cookieParser(secret));
    app.use(session());
    app.use("/public", express.static("public"));
    app.use(express.urlencoded({ extended: true }));
}

module.exports = {
    expressConfig
}