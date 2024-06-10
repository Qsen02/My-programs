const { Comments } = require("../models/comments");
const { Games } = require("../models/games");

async function addComment(username, content, gameId) {
    let newComment = new Comments({
        username: username,
        content: content,
        gameId: gameId
    });
    await newComment.save();
    await Games.findByIdAndUpdate(gameId, { $push: { comments: newComment } });
}

async function deleteComment(id, gameId, comment) {
    await Comments.findByIdAndDelete(id);
    await Games.findByIdAndUpdate(gameId, { $pull: { comments: comment._id } });
}
async function editComment(id, content) {
    await Comments.findByIdAndUpdate(id, { $set: { content: content } });
}

async function checkCommentId(id) {
    let isValid = await Comments.findById(id);
    if (!isValid) {
        return false;
    }
    return true;
}

function getCommentById(id) {
    let comment = Comments.findById(id);
    return comment;
}
module.exports = {
    addComment,
    deleteComment,
    editComment,
    checkCommentId,
    getCommentById
}