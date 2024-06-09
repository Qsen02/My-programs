const { Games } = require("../models/games");
const { Users } = require("../models/users");

function getAllGames() {
    return Games.find();
}

function getGameById(id) {
    return Games.findById(id);
}

async function createGame(data, user) {
    let newGame = new Games({
        name: data.name,
        year: data.year,
        description: data.description,
        image: data.image,
        creator: data.creator,
        category: data.category,
        ownerId: user._id
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

async function liking(gameId, userId) {
    await Games.findByIdAndUpdate(gameId, { $push: { userLikes: userId }, $inc: { likes: 1 } });
}

async function comment(gameId, username, content) {
    await Games.findByIdAndUpdate(gameId, { $push: { comments: { username, content } } });
}

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    deleteGame,
    editGame,
    searching,
    checkGameId,
    liking,
    comment
}