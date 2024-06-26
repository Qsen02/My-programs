const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    playlistName: {
        type: String,
        require: true
    },
    songs: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Songs",
        default: []
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    }
})

const Playlists = mongoose.model("Playlists", playlistSchema);

module.exports = {
    Playlists
}