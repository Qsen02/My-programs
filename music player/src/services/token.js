const jwt = require("jsonwebtoken");

const secret = "super secret json web token";

function setToken(user) {
    let payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    }

    let token = jwt.sign(payload, secret, { expiresIn: "3d" });

    return token;
}

function verifyToken(token) {
    let isValid = jwt.verify(token, secret);

    return isValid;
}

module.exports = {
    setToken,
    verifyToken
}