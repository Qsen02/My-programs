const { checkGameId, getGameById, comment } = require("../services/games");
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
    let creatorName = await getUserById(game.ownerId).lean();
    if (user) {
        game.isLiked = game.userLikes.includes(user._id);
        isHaveUser = true;
        for (let comment of game.comments) {
            if (creatorName.username == comment.username) {
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
    res.render("details", { game, isEmpty, commentCount, isHaveUser });
}

async function onComment(req, res) {
    let user = req.user;
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let content = req.body.content;
    try {
        if (!content) {
            throw new Error("Field required!");
        }
        await comment(id, user.username, content);
        res.redirect(`/games/details/${id}`);
    } catch (err) {
        res.redirect(`/games/details/${id}`);
        return;
    }
}

module.exports = {
    showDetails,
    onComment
}