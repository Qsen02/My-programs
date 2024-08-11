const express = require("express");
const { expressConfig } = require("./config/express");
const { runDB } = require("./config/mongoose");

const port = 3000;

async function start() {
    await runDB();

    const app = express();

    expressConfig(app);

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    })
}

start();