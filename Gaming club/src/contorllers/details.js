const { checkGameId, getGameById } = require("../services/games");

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
    if (user) {
        game.isLiked = game.userLikes.includes(user._id);
    }
    res.render("details", { game });
}

module.exports = {
    showDetails
}