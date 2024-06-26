const { Router } = require("express");
const { getAllSongs, checkSongId, getSongById, searching } = require("../services/songs");

const homeRouter = Router();

homeRouter.get("/", async(req, res) => {
    let songs = await getAllSongs().lean();
    res.render("Home", { songs });
})

homeRouter.get("/songs/:id", async(req, res) => {
    let id = req.params.id;
    let user = req.user;
    let isValid = await checkSongId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let song = await getSongById(id).lean();
    song.likesCount = song.likes.length;
    if (user) {
        song.isOwner = song.ownerId.toString() == user._id.toString();
        song.isLiked = Boolean(song.likes.find(el => el.toString() == user._id.toString()));
    }
    res.render("details", { song });
})

homeRouter.get("/search", async(req, res) => {
    let query = req.query;
    let songs = await searching(query).lean();
    res.render("Home", { songs });
})

module.exports = {
    homeRouter
}