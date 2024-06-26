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

function searching(query) {
    let result = Songs.find({ name: new RegExp(query.name, "i") });
    return result;
}
module.exports = {
    getAllSongs,
    getSongById,
    deleteSong,
    checkSongId,
    createSong,
    searching
}