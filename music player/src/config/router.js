const { homeRouter } = require("../controllers/home");
const { songRouter } = require("../controllers/songs");
const { userRouter } = require("../controllers/user");

function routerConfig(app) {
    app.use(songRouter);

    app.use(userRouter);

    app.use(homeRouter);

    app.get("*", (req, res) => {
        res.render("404");
    })
}

module.exports = {
    routerConfig
}