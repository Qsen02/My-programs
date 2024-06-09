const { checkGameId, getGameById, comment } = require("../services/games");

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
    if (user) {
        game.isLiked = game.userLikes.includes(user._id);
    }
    if (game.comments.length == 0) {
        isEmpty = true;
    }
    for (let comment of game.comments) {
        if (user.username == comment.username) {
            comment.isYourComment = true;
        } else {
            comment.isYourComment = false;
        }
    }
    let commentCount = game.comments.length;
    res.render("details", { game, isEmpty, commentCount });
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
        let game = await getGameById(id).lean();
        let isEmpty = false;
        if (game.comments.length == 0) {
            isEmpty = true;
        }
        for (let comment of game.comments) {
            if (user.username == comment.username) {
                comment.isYourComment = true;
            } else {
                comment.isYourComment = false;
            }
        }
        let commentCount = game.comments.length;
        res.render("details", { game, error: err.message, commentCount, isEmpty });
        return;
    }
}

module.exports = {
    showDetails,
    onComment
}