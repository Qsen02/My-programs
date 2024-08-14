const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { register, login, checkUserId, getUserById } = require("../services/users");
const { setToken } = require("../services/token");
const { createBasket, removeBasket } = require("../services/basket");

const userRouter = Router();

userRouter.post("/register",
    body("username").trim().isLength({ min: 3 }),
    body("email").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 6 }),
    body("repass").trim().custom((value, { req }) => req.body.password == value),
    body("address").trim().isLength({ min: 3 }),
    async(req, res) => {
        const fields = req.body;
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Your data aren't in valid format!");
            }
            const user = await register(fields.username, fields.email, fields.password, fields.address);
            const token = setToken(user);
            await createBasket(user);
            res.json({ _id: user._id, username: user.username, email: user.email, address: user.address, accessToken: token });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

userRouter.post("/login",
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 6 }),
    async(req, res) => {
        const fields = req.body;
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Username or password don't match!");
            }
            const user = await login(fields.username, fields.password);
            const token = setToken(user);
            await createBasket(user);
            res.json({ _id: user._id, username: user.username, email: user.email, address: user.address, accessToken: token });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

userRouter.get("/logout", async(req, res) => {
    const user = req.user;
    res.status(200).json({ message: "Logout was succesfull!" });
    await removeBasket(user);
})

userRouter.get("/:userId", async(req, res) => {
    const userId = req.params.userId;
    const isValid = await checkUserId(userId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const user = await getUserById(userId).lean();
    res.json(user);
})

module.exports = {
    userRouter
}