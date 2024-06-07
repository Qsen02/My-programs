const { checkGameId, liking } = require("../services/games");
const { setToken } = require("../services/token");

async function onLike(req, res) {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.render("404");
        return;
    }
    let user = await liking(gameId, userId);
    res.clearCookie("token");
    let token = setToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.redirect(`/games/details/${gameId}`);
}

module.exports = {
    onLike
}