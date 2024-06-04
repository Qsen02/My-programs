const { getAllGames } = require("../services/games");

async function showHome(req, res) {
    res.render("home");
}

async function showCatalog(req, res) {
    let data = await getAllGames().lean();
    let isEmpty = false;
    if (data.length == 0) {
        isEmpty = true;
    }
    res.render("catalog", { data, isEmpty });
}

module.exports = {
    showHome,
    showCatalog
}