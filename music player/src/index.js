const express = require("express");
const { expressConfig } = require("./config/express");
const { hbsConfig } = require("./config/handlebars");
const { routerConfig } = require("./config/router");
const { runDB } = require("./config/mongoose");

const app = express();

async function start() {
    await runDB();

    expressConfig(app);
    hbsConfig(app);

    routerConfig(app);

    app.listen(3000, () => console.log("Server is listening on http://localhost:3000"));
}

start();