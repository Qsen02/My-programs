let mongoose = require("mongoose");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/Gaming-club");
    console.log("Database connected");
}

module.exports = {
    runDB
}