const { getCommentById, checkCommentId, editComment } = require("../services/comments");

async function showEditCommentForm(req, res) {
    let id = req.params.id;
    let isValid = await checkCommentId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let comment = await getCommentById(id);
    let content = comment.content;
    res.render("editComment", { content });
}

async function onEditComment(req, res) {
    let id = req.params.id;
    let isValid = await checkCommentId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let content = req.body.content;
    let comment = await getCommentById(id);
    try {
        if (!content) {
            throw new Error("Field required!");
        }
        await editComment(id, content);
        res.redirect(`/games/details/${comment.gameId}`);
    } catch (err) {
        res.render("editComment", { error: err.message });
        return;
    }
}

module.exports = {
    showEditCommentForm,
    onEditComment
}