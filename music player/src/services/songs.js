const { Songs } = require("../models/songs");

function getAllSongs() {
    let data = Songs.find();
    return data;
}

function getSongById(id) {
    let data = Songs.findById(id);
    return data;
}

async function createSong(data, user) {
    let newData = new Songs(data);
    newData.ownerId = user._id;
    await newData.save();
    return newData;
}

async function deleteSong(id) {
    await Songs.findByIdAndDelete(id);
}

async function checkSongId(id) {
    let data = await Songs.find().lean();
    let isValid = data.find(el => el._id == id);
    if (!isValid) {
        return false;
    }
    return true;
}

function searching(values) {
    let query = {}
    if (values.artist) {
        query.artist = new RegExp(values.artist, "i");
    }
    if (values.name) {
        query.name = new RegExp(values.name, "i");
    }
    let result = Songs.find(query);
    return result;
}

async function liking(songId, user) {
    await Songs.findByIdAndUpdate(songId, { $push: { likes: user._id } });
}

module.exports = {
    getAllSongs,
    getSongById,
    deleteSong,
    checkSongId,
    createSong,
    searching,
    liking
}