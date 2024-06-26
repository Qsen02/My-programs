const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");
const { createSong } = require("../services/songs");
const { upload } = require("../config/multer");

const songRouter = Router();

songRouter.get("/songs/create", isUser(), (req, res) => {
    res.render("createSong");
})

songRouter.post("/songs/create", isUser(), upload.single("audio"),
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long!"),
    async(req, res) => {
        let fields = req.body;
        let user = req.user;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            let audioPath = "";
            if (req.file) {
                console.log(req.file);
                let audioFile = req.file;
                audioPath = audioFile.path;
            }
            await createSong({ audio: "\\" + audioPath, name: fields.name }, user);
            res.redirect("/");
        } catch (err) {
            res.render("createSong", { errors: errorParser(err).errors, name: fields.name });
        }
    })

module.exports = {
    songRouter
}