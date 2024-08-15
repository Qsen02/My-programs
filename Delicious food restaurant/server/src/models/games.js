let mongoose = require("mongoose");

let gamesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    year: {
        type: Number,
        require: true,
    },
    creator: {
        type: String,
        require: true,
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
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
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