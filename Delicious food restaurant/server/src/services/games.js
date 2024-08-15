const { Comments } = require("../models/comments");
const { Games } = require("../models/games");

function getAllGames() {
    return Games.find();
}

function getNextGames(page) {
    const skipCount = 3 * page;
    return Games.find().skip(skipCount).limit(3);

}

function getGameById(id) {
    return Games.findById(id).populate("comments");
}

async function createGame(data, user) {
    let newGame = new Games(data);
    newGame.ownerId = user._id;
    await newGame.save();
    return newGame;
}

async function deleteGame(id) {
    let game = await Games.findById(id).lean();
    for (let comment of game.comments) {
        await Comments.findByIdAndDelete(comment._id.toString());
    }
    await Games.findByIdAndDelete(id);
}

async function editGame(id, data) {
    await Games.findByIdAndUpdate(id, data);
}

function searching(query, criteria) {
    let results = null;
    if (criteria == "name") {
        results = Games.find({ name: RegExp(query, "i") });
    } else if (criteria == "year") {
        results = Games.find({ year: Number(query) });
    } else if (criteria == "category") {
        results = Games.find({ category: RegExp(query, "i") });
    }

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

async function unLike(gameId, userId) {
    await Games.findByIdAndUpdate(gameId, { $pull: { userLikes: userId }, $inc: { likes: -1 } });
}

async function comment(gameId, username, content) {
    await Games.findByIdAndUpdate(gameId, { $push: { comments: { username, content } } });
}

async function saving(gameId, userId) {
    await Games.findByIdAndUpdate(gameId, { $push: { saves: userId } });
}

async function unSave(gameId, userId) {
    await Games.findByIdAndUpdate(gameId, { $pull: { saves: userId } });
}

function getAuthorGames(user) {
    let data = Games.find({ ownerId: user._id });
    return data;
}

async function getSavedGames(userId) {
    let data = await Games.find().lean();
    let games = data.filter(el => el.saves.includes(userId));
    return games;
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
    comment,
    saving,
    getAuthorGames,
    unLike,
    unSave,
    getSavedGames,
    getNextGames
}