const jwt = require("jsonwebtoken");

const secret = "jwt secret";

function setToken(user) {
    let playload = {
        _id: user._id,
        username: user.username,
        likedMovies: user.likedMovies
    }
    let token = jwt.sign(playload, secret, { expiresIn: "3d" });

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