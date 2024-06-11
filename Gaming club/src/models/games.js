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
    image: String,
    likes: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        require: true,
        maxLenght: 1000
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