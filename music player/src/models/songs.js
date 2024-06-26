const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    audio: {
        type: String,
        require: true
    },
    likes: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    }
})

const Songs = mongoose.model("Songs", songSchema);

module.exports = {
    Songs
}