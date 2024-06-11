const { checkGameId, liking, saving } = require("../services/games");

async function onLike(req, res) {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.render("404");
        return;
    }
    await liking(gameId, userId);
    res.redirect(`/games/details/${gameId}`);
}

async function onSave(req, res) {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.render("404");
        return;
    }
    await saving(gameId, userId);
    res.redirect(`/games/details/${gameId}`);
}

module.exports = {
    onLike,
    onSave
}