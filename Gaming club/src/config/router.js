const { showHome, showCatalog } = require("../contorllers/home");
const { showDetails } = require("../contorllers/details");
const { showSearchForm, onSearch } = require("../contorllers/search");
const { isUser } = require("../middlewears/guards");
const { onLike, onSave } = require("../contorllers/likes and saves");
const { showSaves } = require("../contorllers/saves");
const { userRouter } = require("../contorllers/users");
const { gameRouter } = require("../contorllers/games");
const { commentRouter } = require("../contorllers/comments");

function routerConfig(app) {
    app.get("/", showHome);
    app.get("/games/catalog", showCatalog);
    app.get("/games/details/:id", showDetails);
    app.get("/games/search", showSearchForm);
    app.get("/search?*", onSearch);
    app.get("/games/:id/like", isUser(), onLike);
    app.get("/games/:id/save", isUser(), onSave);
    app.get("/saves", isUser(), showSaves);

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