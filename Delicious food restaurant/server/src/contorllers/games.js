const { Router } = require("express");
const { checkGameId, deleteGame, getGameById, createGame, editGame, liking, saving, getAllGames, searching, unLike, unSave, getNextGames } = require("../services/games");
const { isUser } = require("../middlewears/guards");
const { body, validationResult } = require("express-validator");

let gameRouter = Router();

gameRouter.get("/", async(req, res) => {
    let games = await getAllGames().lean();
    res.json(games);
})

gameRouter.get("/page/:page", async(req, res) => {
    const page = Number(req.params.page);
    const allGames = await getAllGames().lean();
    const maxPage = Math.ceil(allGames.length / 3);
    const games = await getNextGames(page).lean();
    res.json({ games, maxPage });
})

gameRouter.get("/:id", async(req, res) => {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    let game = await getGameById(id).lean();
    res.json(game);
})

gameRouter.post("/",
    isUser(),
    body("name").isLength({ min: 3 }),
    body("year").isInt({ min: 1960, max: 2030 }),
    body("category").isLength({ min: 3 }),
    body("creator").isLength({ min: 3 }),
    body("description").isLength({ min: 20, max: 1000 }),
    body("image").matches(/^https?:\/\//),
    async(req, res) => {
        let fields = req.body;
        let user = req.user;
        let name = fields.name;
        let year = fields.year;
        let description = fields.description;
        let category = fields.category;
        let creator = fields.creator;
        let image = fields.image;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Your data is not in valid format");
            }
            await createGame({ name, year, description, category, creator, image }, user);
            res.status(200).json({ message: "Record created successfully!" })
        } catch (err) {
            res.status(400).json({ message: err.message });
            return;
        }
    });

gameRouter.get("/search/:value/by/:criteria", async(req, res) => {
    let query = req.params.value;
    let criteria = req.params.criteria;
    if (query == " ") {
        query = "";
    }
    let games = await searching(query, criteria).lean();
    const maxPage = Math.ceil(games.length / 3);
    res.json({ games, maxPage });
})

gameRouter.delete("/:id", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    await getGameById(id).lean();
    await deleteGame(id);
    res.status(200).json({ message: "Record deleted successfully!" });
});

gameRouter.put("/:id", isUser(),
    body("name").isLength({ min: 3 }),
    body("year").isInt({ min: 1960, max: 2030 }),
    body("category").isLength({ min: 3 }),
    body("creator").isLength({ min: 3 }),
    body("description").isLength({ min: 20, max: 1000 }),
    body("image").matches(/^https?:\/\//),
    async(req, res) => {
        let id = req.params.id;
        let isValid = await checkGameId(id);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        let fields = req.body;
        let name = fields.name;
        let year = fields.year;
        let description = fields.description;
        let category = fields.category;
        let creator = fields.creator;
        let image = fields.image;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Your data is not in valid format");
            }
            await editGame(id, { name, year, description, category, creator, image });
            let game = await getGameById(id);
            res.json(game)
        } catch (err) {
            res.status(400).json({ message: err.message });
            return;
        }
    });

gameRouter.post("/:id/like", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.status(404).json("Resource not found!");
        return;
    }
    await liking(gameId, userId);
    const game = await getGameById(gameId).lean();
    res.json(game);
})

gameRouter.post("/:id/unlike", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.status(404).json("Resource not found!");
        return;
    }
    await unLike(gameId, userId);
    const game = await getGameById(gameId).lean();
    res.json(game);
})


gameRouter.post("/:id/save", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    await saving(gameId, userId);
    const game = await getGameById(gameId).lean();
    res.json(game);
})


gameRouter.post("/:id/unsave", isUser(), async(req, res) => {
    let gameId = req.params.id;
    let userId = req.user._id;
    let isValid = await checkGameId(gameId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    await unSave(gameId, userId);
    const game = await getGameById(gameId).lean();
    res.json(game);
})


module.exports = {
    gameRouter
}