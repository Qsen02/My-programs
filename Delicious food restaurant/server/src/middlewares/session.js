const { verifyToken } = require("../services/token");

function session() {
    return function(req, res, next) {
        const token = req.headers["x-authorization"];
        if (token) {
            try {
                const payload = verifyToken(token);
                req.user = payload;
            } catch (err) {
                return res.status(403).json({ message: "You don't have credentials, please login or register!" });
            }
        }
        next();
    }
}

module.exports = {
    session
}