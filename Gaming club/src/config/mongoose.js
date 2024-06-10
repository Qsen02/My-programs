let mongoose = require("mongoose");
const { Users } = require("../models/users");
const { Games } = require("../models/games");
const { Comments } = require("../models/comments");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/Gaming-club");
    console.log("Database connected");
}

module.exports = {
    runDB
}