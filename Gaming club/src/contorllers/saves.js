const { getAllGames } = require("../services/games");

async function showSaves(req, res) {
    let userId = req.user._id;
    let games = await getAllGames().lean();
    let saves = games.filter(el => el.saves.includes(userId));
    let isEmpty = false;
    if (saves.length == 0) {
        isEmpty = true;
    }
    res.render("saves", { saves, isEmpty });
}

module.exports = {
    showSaves
}