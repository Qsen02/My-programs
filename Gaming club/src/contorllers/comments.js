const { Router } = require("express");
const { checkCommentId, deleteComment, getCommentById, addComment, editComment } = require("../services/comments");
const { isUser } = require("../middlewears/guards");
const { checkGameId } = require("../services/games");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");

let commentRouter = Router();

commentRouter.get("/details/:id/comment", isUser(), (req, res) => {
    res.render("createComment");
})

commentRouter.post("/details/:id/comment",
    body("content").isLength({ min: 3 }).withMessage("Comment must be at least 3 symbols long!"),
    isUser(), async(req, res) => {
        let user = req.user;
        let id = req.params.id;
        let isValid = await checkGameId(id);
        if (!isValid) {
            res.render("404");
            return;
        }
        let content = req.body.content;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await addComment(user.username, content, id);
            res.redirect(`/games/details/${id}`);
        } catch (err) {
            res.render("createComment", { errors: errorParser(err).errors, content });
            return;
        }
    });

commentRouter.get("/comment/:id/delete", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkCommentId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    res.render("deleteComment", { id });
});

commentRouter.get("/comment/:id/delete/yes", isUser(), async(req, res) => {
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
});

commentRouter.get("/comment/:id/delete/no", isUser(), async(req, res) => {
    let id = req.params.id;
    let comment = await getCommentById(id).lean();
    let gameId = comment.gameId;
    let isValid = await checkCommentId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    res.redirect(`/games/details/${gameId}`);
});

commentRouter.get("/comment/:id/edit", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkCommentId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let comment = await getCommentById(id);
    let content = comment.content;
    res.render("editComment", { content });
});

commentRouter.post("/comment/:id/edit",
    body("content").isLength({ min: 3 }).withMessage("Comment must be at least 3 symbols long!"),
    isUser(), async(req, res) => {
        let id = req.params.id;
        let isValid = await checkCommentId(id);
        if (!isValid) {
            res.render("404");
            return;
        }
        let content = req.body.content;
        let comment = await getCommentById(id);
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await editComment(id, content);
            res.redirect(`/games/details/${comment.gameId}`);
        } catch (err) {
            res.render("editComment", { errors: errorParser(err).errors });
            return;
        }
    });

module.exports = {
    commentRouter
}