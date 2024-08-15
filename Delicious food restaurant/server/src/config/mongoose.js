let mongoose = require("mongoose");
const { Users } = require("../models/users");
const { Games } = require("../models/games");
const { Comments } = require("../models/comments");

const localDB = "mongodb://localhost:27017/Gaming-club"

async function runDB() {
    await mongoose.connect(localDB);
    console.log("Database connected");
}

module.exports = {
    runDB
}