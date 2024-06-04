const { checkGameId, getGameById } = require("../services/games");

async function showDetails(req, res) {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let game = await getGameById(id).lean();
    res.render("details", { game });
}

module.exports = {
    showDetails
}