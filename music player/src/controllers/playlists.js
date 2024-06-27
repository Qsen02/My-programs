const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { createPlaylist, checkPlaylistId, getPlaylistById, getAuthorPlaylists, deletePlaylist } = require("../services/playlists");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");

const playlistRouter = Router();

playlistRouter.get("/playlists", isUser(), async(req, res) => {
    let user = req.user;
    let playlists = await getAuthorPlaylists(user).lean();
    res.render("playlists", { playlists });
})

playlistRouter.get("/playlists/create", isUser(), (req, res) => {
    res.render("createPlaylist");
})

playlistRouter.post("/playlists/create", isUser(),
    body("playlistName").isLength({ min: 3 }).withMessage("Playlist name mut be at least 3 characters long!"),
    async(req, res) => {
        let fields = req.body;
        let user = req.user;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await createPlaylist(fields, user);
            res.redirect("/playlists");
        } catch (err) {
            res.render("createPlaylist", { errors: errorParser(err).errors, playlistName: fields.playlistName });
        }
    });

playlistRouter.get("/playlists/:id", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkPlaylistId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let playlist = await getPlaylistById(id).lean();
    playlist.songs.forEach(el => el.playlistId = id);
    res.render("playlistDetails", { playlist });
})

playlistRouter.get("/playlists/:id/delete", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkPlaylistId(id);
    if (!isValid) {
        res.render("404");
        return;
    };
    res.render("deletePlaylist", { id });
})

playlistRouter.get("/playlists/:id/delete/no", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkPlaylistId(id);
    if (!isValid) {
        res.render("404");
        return;
    };
    res.redirect("/playlists");
})

playlistRouter.get("/playlists/:id/delete/yes", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkPlaylistId(id);
    if (!isValid) {
        res.render("404");
        return;
    };
    await deletePlaylist(id);
    res.redirect("/playlists");
})

module.exports = {
    playlistRouter
}