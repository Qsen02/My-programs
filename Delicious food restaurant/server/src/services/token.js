const jwt = require("jsonwebtoken");

const secret = "jwt secret";

function setToken(user) {
    let payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }
    let token = jwt.sign(payload, secret, { expiresIn: "3d" });

    return token;
}

function verifyToken(token) {
    let playload = jwt.verify(token, secret);

    return playload;
}

module.exports = {
    setToken,
    verifyToken
}