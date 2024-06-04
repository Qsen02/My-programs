const { Games } = require("../models/games");

function getAllGames() {
    return Games.find();
}

function getGameById(id) {
    return Games.findById(id);
}

async function createGame(data) {
    let newGame = new Games({
        name: data.name,
        year: data.year,
        description: data.description,
        creator: data.creator,
        category: data.category
    })
    await newGame.save();
    return newGame;
}

async function deleteGame(id) {
    await Games.findByIdAndDelete(id);
}

async function editGame(id, data) {
    await Games.findByIdAndUpdate(id, { $set: data });
}

function searching(query) {
    let results = Games.find({ name: query });
    return results;
}

async function checkGameId(id) {
    let games = Games.find();
    let isValid = games.find(el => el._id == id);
    return isValid;
}

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    deleteGame,
    editGame,
    searching,
    checkGameId
}