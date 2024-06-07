const { setToken } = require("../services/token");
const { login } = require("../services/users");

async function showLoginform(req, res) {
    res.render("login");
}
async function onLogin(req, res) {
    let fields = req.body;
    let username = fields.username;
    let password = fields.password;

    try {
        if (!username || !password) {
            throw new Error("All fields required!");
        }
        let user = await login(username, password);
        let token = setToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/");
    } catch (err) {
        res.render("login", { error: err.message, fields });
        return;
    }
}
module.exports = {
    showLoginform,
    onLogin
}