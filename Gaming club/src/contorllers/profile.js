const { getAllGames, getAuthorGames } = require("../services/games");

async function showProfile(req, res) {
    let user = req.user;
    let authorGames = await getAuthorGames(user).lean();
    let games = await getAllGames().lean();
    let saves = games.filter(el => el.saves.includes(user._id));
    let authorGameCount = authorGames.length;
    let savesCount = saves.length
    res.render("profile", { saves, authorGames, authorGameCount, savesCount });
}

module.exports = {
    showProfile
}