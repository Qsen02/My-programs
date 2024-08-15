let mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true,
    },
    gameId: {
        type: String,
        require: true
    }
});

let Comments = mongoose.model("Comments", commentSchema);

module.exports = {
    Comments
}