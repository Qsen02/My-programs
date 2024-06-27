const { homeRouter } = require("../controllers/home");
const { playlistRouter } = require("../controllers/playlists");
const { songRouter } = require("../controllers/songs");
const { userRouter } = require("../controllers/user");

function routerConfig(app) {
    app.use(playlistRouter);

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