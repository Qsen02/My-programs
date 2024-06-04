let mongoose = require("mongoose");

let gamesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true,
        min: 1960,
        max: 2030
    },
    creator: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    likes: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        require: true,
        maxLenght: 1000
    }
});

let Games = mongoose.model("Games", gamesSchema);

module.exports = {
    Games
}