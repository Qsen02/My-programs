const { getAllGames, searching } = require("../services/games")

async function showSearchForm(req, res) {
    let games = await getAllGames().lean();
    let isEmpty = false;
    if (games.length == 0) {
        isEmpty = true;
    }
    res.render("search", { games, isEmpty });
}

async function onSearch(req, res) {
    let url = req.url.split("?")[1];
    console.log(req);
    let query = url.split("=")[1].trim();
    let newQuery = query.replaceAll("+", " ");
    let games = await searching(newQuery).lean();
    let isEmpty = false;
    if (games.length == 0) {
        isEmpty = true;
    }
    res.render("search", { games, isEmpty });
}

module.exports = {
    showSearchForm,
    onSearch
}