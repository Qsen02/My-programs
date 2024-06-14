const { checkGameId, getGameById } = require("../services/games");
const { getUserById } = require("../services/users");

async function showDetails(req, res) {
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
}

module.exports = {
    showDetails,
}