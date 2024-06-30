const { verifyToken } = require("../services/token");

function session() {
    return function(req, res, next) {
        let token = req.cookies.token;
        if (token) {
            try {
                let playload = verifyToken(token);
                req.user = playload;
                res.locals.hasUser = true;
                res.locals.user = playload;
            } catch (err) {
                res.clearCookie("token");
            }
        }
        next();
    }
}

module.exports = {
    session
}