const mongoose = require("mongoose");
const { Users } = require("../models/users");
const { Dishes } = require("../models/dishes");
const { Basket } = require("../models/basket");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/delicious-food-restaurant");
    console.log("Database connected");
}

module.exports = {
    runDB
}