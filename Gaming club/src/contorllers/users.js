const { Router } = require("express");
const { isGuest } = require("../middlewears/guards");
const { setToken } = require("../services/token");
const { register, login } = require("../services/users");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");

let userRouter = Router();

userRouter.get("/register", isGuest(), (req, res) => {
    res.render("register");
});

userRouter.post("/register",
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 symbols long!"),
    body("password").trim().isAlphanumeric().isLength({ min: 6 }).withMessage("Password must be at least 6 symbols and may contain onlu digits and letters!"),
    body("repass").trim().custom((value, { req }) => req.body.password == value).withMessage("Password must match!"),
    isGuest(),
    async(req, res) => {
        let fields = req.body;
        let username = fields.username;
        let password = fields.password;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            let user = await register(username, password);
            let token = setToken(user);
            res.cookie("token", token, { httpOnly: true });
            res.redirect("/");
        } catch (err) {
            res.render("register", { errors: errorParser(err).errors, fields });
            return;
        }
    });

userRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
})

userRouter.get("/login", isGuest(), (req, res) => {
    res.render("login");
});

userRouter.post("/login",
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 symbols long!"),
    body("password").trim().isAlphanumeric().isLength({ min: 6 }).withMessage("Password must be at least 6 symbols and may contain onlu digits and letters!"),
    isGuest(),
    async(req, res) => {
        let fields = req.body;
        let username = fields.username;
        let password = fields.password;

        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            let user = await login(username, password);
            let token = setToken(user);
            res.cookie("token", token, { httpOnly: true });
            res.redirect("/");
        } catch (err) {
            res.render("login", { errors: errorParser(err).errors, fields });
            return;
        }
    });

module.exports = {
    userRouter
}