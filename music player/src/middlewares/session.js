const { verifyToken } = require("../services/token");

function session() {
    return function(req, res, next) {
        let token = req.cookies.token;
        if (token) {
            try {
                let verifiedToken = verifyToken(token);
                req.user = verifiedToken;
                res.locals.hasUser = true;
                res.locals.user = verifiedToken;
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