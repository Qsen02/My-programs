const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");
const { createSong, checkSongId, getSongById, deleteSong, liking } = require("../services/songs");
const { upload } = require("../config/multer");
const { delAudio } = require("../services/audio");

const songRouter = Router();

songRouter.get("/songs/create", isUser(), (req, res) => {
    res.render("createSong");
})

songRouter.post("/songs/create", isUser(), upload.single("audio"),
    body("artist").isLength({ min: 2 }).withMessage("Artist must be at least 2 characters long!"),
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long!"),
    body("audio").custom((value, { req }) => req.file).withMessage("Audio file is mandatory!"),
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
                let audioFile = req.file;
                audioPath = audioFile.path;
            }
            await createSong({ audio: audioPath, name: fields.name, artist: fields.artist }, user);
            res.redirect("/");
        } catch (err) {
            res.render("createSong", { errors: errorParser(err).errors, name: fields.name });
        }
    })

songRouter.get("/songs/:id/delete", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkSongId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    res.render("delete", { id });
})

songRouter.get("/songs/:id/delete/no", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkSongId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    res.redirect(`/songs/${id}`);
})

songRouter.get("/songs/:id/delete/yes", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkSongId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let song = await getSongById(id).lean();
    let audio = song.audio;
    let audioArr = audio.split("\\");
    let audioName = audioArr[audioArr.length - 1];
    await deleteSong(id);
    if (audioName) {
        await delAudio(audioName);
    };
    res.redirect("/");
})

songRouter.get("/songs/:id/like", isUser(), async(req, res) => {
    let id = req.params.id;
    let user = req.user;
    let isValid = await checkSongId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    await liking(id, user);
    res.redirect(`/songs/${id}`);
})
module.exports = {
    songRouter
}