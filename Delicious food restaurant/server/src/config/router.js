const express = require("express");
const { userRouter } = require("../contollers/users");

function routerConfig(app) {
    app.use("/users", userRouter);

    app.get("*", (req, res) => {
        res.status(404).json({ message: "Resource not found!" });
    })
}

module.exports = {
    routerConfig
}