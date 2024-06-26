const { Router } = require("express");
const { getAllSongs } = require("../services/songs");

const homeRouter = Router();

homeRouter.get("/", async(req, res) => {
    let songs = await getAllSongs().lean();
    res.render("Home", { songs });
})

module.exports = {
    homeRouter
}