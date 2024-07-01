const { getAllGames, checkGameId, getGameById, searching, getAuthorGames } = require("../services/games");
const { Router } = require("express");
const { getUserById } = require("../services/users");
const { isUser } = require("../middlewears/guards");

const homeRouter = Router();

homeRouter.get("/", (req, res) => {
    res.render("home");
});

homeRouter.get("/games/catalog", async(req, res) => {
    let data = await getAllGames().lean();
    let isEmpty = false;
    if (data.length == 0) {
        isEmpty = true;
    }
    res.render("catalog", { data, isEmpty });
})

homeRouter.get("/games/details/:id", async(req, res) => {
    let id = req.params.id;
    let user = req.user;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let game = await getGameById(id).lean();
    game.isUser = user;
    game.isOwner = user && user._id == game.ownerId;
    game.isLiked = false;
    let isEmpty = false;
    let isHaveUser = false;
    let creator = await getUserById(game.ownerId).lean();
    if (user) {
        game.isSave = game.saves.find(el => el == user._id);
        game.savesCount = game.saves.length;
        game.isLiked = game.userLikes.includes(user._id);
        isHaveUser = true;
        for (let comment of game.comments) {
            if (creator.username == comment.username) {
                comment.isOwner = true;
            } else {
                comment.isOwner = false;
            }
            if (user.username == comment.username) {
                comment.isYourComment = true;
            } else {
                comment.isYourComment = false;
            }
        }
    }
    if (game.comments.length == 0) {
        isEmpty = true;
    }
    let commentCount = game.comments.length;
    res.render("details", { game, isEmpty, commentCount, isHaveUser, creator: creator.username });
})

homeRouter.get("/profile", isUser(), async(req, res) => {
    let user = req.user;
    let authorGames = await getAuthorGames(user).lean();
    let games = await getAllGames().lean();
    let saves = games.filter(el => el.saves.includes(user._id));
    let authorGameCount = authorGames.length;
    let savesCount = saves.length
    res.render("profile", { saves, authorGames, authorGameCount, savesCount });
})

homeRouter.get("/games/search", async(req, res) => {
    let query = req.query;
    let games = await searching(query).lean();
    res.render("search", { games });
})

module.exports = {
    homeRouter
}