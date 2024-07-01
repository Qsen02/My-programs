const { Router } = require("express");
const { checkGameId, deleteGame, getGameById, createGame, editGame, liking, saving } = require("../services/games");
const { delImg } = require("../services/image");
const { isUser } = require("../middlewears/guards");
const { upload } = require("../config/multer");
const { errorParser } = require("../util");

let gameRouter = Router();

gameRouter.get("/games/create", isUser(), (req, res) => {
    res.render("create");
});

gameRouter.post("/games/create", isUser(), upload.single("image"), async(req, res) => {
    let fields = req.body;
    let user = req.user;

    let name = fields.name;
    let year = fields.year;
    let description = fields.description;
    let category = fields.category;
    let creator = fields.creator;
    let imgPath = "";
    if (req.file) {
        let imgFile = req.file;
        imgPath = imgFile.path;
    }
    try {
        await createGame({ name, year, description, category, creator, image: "\\" + imgPath }, user);
        res.redirect("/games/catalog");
    } catch (err) {
        res.render("create", { errors: errorParser(err).errors, game: req.body });
        return;
    }
});

gameRouter.get("/games/delete/:id", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    res.render("delete", { id });
});

gameRouter.get("/games/delete/:id/yes", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let game = await getGameById(id).lean();
    let img = game.image;
    let imgArr = img.split("\\");
    let imgName = imgArr[imgArr.length - 1];
    await deleteGame(id);
    if (imgName) {
        await delImg(imgName);
    }
    res.redirect("/games/catalog");
});

gameRouter.get("/games/delete/:id/no", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    res.redirect(`/games/details/${id}`);
});

gameRouter.get("/games/edit/:id", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let game = await getGameById(id).lean();
    res.render("edit", { game });
});

gameRouter.post("/games/edit/:id", isUser(), upload.single("image"), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let game = await getGameById(id).lean();
    let fields = req.body;
    let name = fields.name;
    let year = fields.year;
    let description = fields.description;
    let category = fields.category;
    let creator = fields.creator;
    let imgPath = "";
    try {
        if (req.file) {
            let imgFile = req.file;
            imgPath = imgFile.path;
            let img = game.image;
            let imgArr = img.split("\\");
            let imgName = imgArr[imgArr.length - 1];
            await editGame(id, { name, year, description, category, creator, image: "\\" + imgPath });
            if (imgName && imgName != "gaming-banner-for-games-with-glitch-effect-neon-light-on-text-illustration-design-free-vector.jpg") {
                await delImg(imgName);
            }
        } else {
            await editGame(id, { name, year, description, category, creator });
        }
        res.redirect(`/games/details/${id}`);
    } catch (err) {
        res.render("edit", { errors: errorParser(err).errors, game });
        return;
    }
});

gameRouter.get("/games/:id/like", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.render("404");
        return;
    }
    await liking(gameId, userId);
    res.redirect(`/games/details/${gameId}`);
})

gameRouter.get("/games/:id/save", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.render("404");
        return;
    }
    await saving(gameId, userId);
    res.redirect(`/games/details/${gameId}`);
})

module.exports = {
    gameRouter
}