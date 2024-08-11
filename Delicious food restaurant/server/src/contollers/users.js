const { Router } = require("express");
const { body, validationResult, check } = require("express-validator");
const { errorParser } = require("../utils");
const { register, login, checkUserId, getUserById } = require("../services/users");
const { setToken } = require("../services/token");

const userRouter = Router();

userRouter.post("/register",
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters long!"),
    body("email").trim().isLength({ min: 3 }).withMessage("Email must be at least 3 characters long!"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 3 characters long!"),
    body("repass").trim().custom((value, { req }) => req.body.password == value).withMessage("Password must match!"),
    body("address").trim().isLength({ min: 3 }).withMessage("Address must be at least 3 characters long!"),
    async(req, res) => {
        const fields = req.body;
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            const user = await register(fields.username, fields.email, fields.password, fields.address);
            const token = setToken(user);
            res.json({ _id: user._id, username: user.username, email: user.email, address: user.address, accessToken: token });
        } catch (err) {
            res.status(400).json({ message: JSON.stringify(errorParser(err).errors) });
        }
    })

userRouter.post("/login",
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters long!"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 3 characters long!"),
    async(req, res) => {
        const fields = req.body;
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            const user = await login(fields.username, fields.password);
            const token = setToken(user);
            res.json({ _id: user._id, username: user.username, email: user.email, address: user.address, accessToken: token });
        } catch (err) {
            res.status(400).json({ message: JSON.stringify(errorParser(err).errors) });
        }
    });

userRouter.get("/logout", (req, res) => {
    res.status(200).json({ message: "Logout was succesfull!" });
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