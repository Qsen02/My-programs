const { Router } = require("express");
const { setToken } = require("../services/token");
const { register, login, getUserById, checkUserId } = require("../services/users");
const { body, validationResult } = require("express-validator");
const { getAuthorGames, getSavedGames } = require("../services/games");

let userRouter = Router();

userRouter.post("/register",
    body("username").trim().isLength({ min: 3 }),
    body("email").trim().isLength({ min: 3 }).isEmail(),
    body("password").trim().isLength({ min: 6 }),
    body("repass").trim().custom((value, { req }) => req.body.password == value),
    async(req, res) => {
        let fields = req.body;
        let username = fields.username;
        let password = fields.password;
        let email = fields.email;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Your data is not in valid format");
            }
            let user = await register(username, email, password);
            let token = setToken(user);
            res.json({ _id: user._id, username: user.username, email: user.email, accessToken: token });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

userRouter.get("/logout", (req, res) => {
    res.status(200).json("User logged out successfully!");
})

userRouter.post("/login",
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isAlphanumeric().isLength({ min: 6 }),
    async(req, res) => {
        let fields = req.body;
        let username = fields.username;
        let password = fields.password;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Username or password don't match!");
            }
            let user = await login(username, password);
            let token = setToken(user);
            res.json({ _id: user._id, username: user.username, email: user.email, accessToken: token });
        } catch (err) {
            res.status(400).json({ message: err.message });
            return;
        }
    });

userRouter.get("/:id", async(req, res) => {
    const id = req.params.id;
    const isValid = await checkUserId(id);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const user = await getUserById(id).lean();
    res.json({ _id: user._id, username: user.username, email: user.email, accessToken: user.accessToken });
})

userRouter.get("/:userId/authorGames", async(req, res) => {
    const userId = req.params.userId;
    const isValid = await checkUserId(userId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const user = await getUserById(userId);
    const games = await getAuthorGames(user).lean();
    res.json(games);
})

userRouter.get("/:userId/savedGames", async(req, res) => {
    const userId = req.params.userId;
    const isValid = await checkUserId(userId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const games = await getSavedGames(userId);
    res.json(games);
})



module.exports = {
    userRouter
}