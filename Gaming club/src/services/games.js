const { Games } = require("../models/games");
const { Users } = require("../models/users");

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
        image: data.image,
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
    let results = Games.find({ name: RegExp(query) });
    return results;
}

async function checkGameId(id) {
    let games = await Games.find().lean();
    let isValid = games.find(el => el._id == id);
    return isValid;
}

async function liking(movieId, userId) {
    await Games.findByIdAndUpdate(movieId, { $inc: likes });
    await Users.findByIdAndUpdate(userId, { $push: { likedGames: movieId } });
}

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    deleteGame,
    editGame,
    searching,
    checkGameId,
    liking
}