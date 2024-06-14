let mongoose = require("mongoose");

let gamesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: [5, "Name must be at least 5 symbols long and only digits and letters!"],
        match: [/^[a-zA-Z0-9 ]+$/gi, "Name must be at least 5 symbols long and only digits and letters!"]
    },
    year: {
        type: Number,
        require: true,
        min: [1960, "Age must be between 1960 and 2030"],
        max: [2030, "Age must be between 1960 and 2030"]
    },
    creator: {
        type: String,
        require: true,
        minLength: [5, "Creator must be at least 5 symbols long and only digits and letters!"],
        match: [/^[a-zA-Z0-9 ]+$/gi, "Creator must be at least 5 symbols long and only digits and letters!"]
    },
    category: {
        type: String,
        require: true,
        minLength: [3, "Category must be at least 3 symbols long and only digits and letters!"],
        match: [/^[a-zA-Z0-9 ]+$/gi, "Category must be at least 5 symbols long and only digits and letters!"]
    },
    image: String,
    likes: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        require: true,
        minLength: [20, "Description must be between 20 and 1000 symbols!"],
        maxLenght: [1000, "Description must be between 20 and 1000 symbols!"]
    },
    ownerId: {
        type: String,
        require: true
    },
    userLikes: {
        type: [String],
        default: []
    },
    comments: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Comments",
        default: []
    },
    saves: {
        type: [String],
        default: []
    }
});

let Games = mongoose.model("Games", gamesSchema);

module.exports = {
    Games
}