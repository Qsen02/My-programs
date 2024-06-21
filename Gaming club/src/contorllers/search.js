const { searching } = require("../services/games")

async function onSearch(req, res) {
    let query = req.query;
    let games = await searching(query).lean();
    res.render("search", { games });
}

module.exports = {
    onSearch
}