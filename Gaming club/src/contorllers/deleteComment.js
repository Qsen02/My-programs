const { checkCommentId, deleteComment, getCommentById } = require("../services/comments");

async function showDeleteCommentForm(req, res) {
    let id = req.params.id;
    let isValid = await checkCommentId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    res.render("deleteComment", { id });
}

async function onDeleteComment(req, res) {
    let id = req.params.id;
    let comment = await getCommentById(id).lean();
    let gameId = comment.gameId;
    let isValid = await checkCommentId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    await deleteComment(id, gameId, comment);
    res.redirect(`/games/details/${gameId}`);
}

async function onRefuseComment(req, res) {
    let id = req.params.id;
    let comment = await getCommentById(id).lean();
    let gameId = comment.gameId;
    let isValid = await checkCommentId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    res.redirect(`/games/details/${gameId}`);
}

module.exports = {
    showDeleteCommentForm,
    onDeleteComment,
    onRefuseComment
}