const mongoose = require("mongoose");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/delicious-food-restaurant");
    console.log("Database connected");
}

module.exports = {
    runDB
}