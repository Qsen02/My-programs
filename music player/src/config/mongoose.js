const mongoose = require("mongoose");
const { Users } = require("../models/user");
const { Songs } = require("../models/songs");
const { Playlists } = require("../models/playlists");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/Music-player");
    console.log("Database is running...");
}

module.exports = {
    runDB
}