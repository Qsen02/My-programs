const { setToken } = require("../services/token");
const { register } = require("../services/users");

async function showRegisterForm(req, res) {
    res.render("register");
}
async function onRegister(req, res) {
    let fields = req.body;
    let username = fields.username;
    let password = fields.password;
    let repass = fields.repass;
    try {
        if (!username || !password) {
            throw new Error("All fields required!");
        }
        if (password.length < 6) {
            throw new Error("Password must be at least 6 symbols!");
        }
        if (password != repass) {
            throw new Error("Password must match");
        }

        let user = await register(username, password);
        let token = setToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/");
    } catch (err) {
        res.render("register", { error: err.message, fields });
        return;
    }
}

module.exports = {
    showRegisterForm,
    onRegister
}