const { homeRouter } = require("../contorllers/home");;
const { userRouter } = require("../contorllers/users");
const { gameRouter } = require("../contorllers/games");
const { commentRouter } = require("../contorllers/comments");

function routerConfig(app) {
    app.use(homeRouter);

    app.use(gameRouter);

    app.use(commentRouter);

    app.use(userRouter);

    app.get("*", (req, res) => {
        res.render("404");
    })
}

module.exports = {
    routerConfig
}