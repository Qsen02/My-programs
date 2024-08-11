const jwt = require("jsonwebtoken");

const secret = "super secret token";

function setToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        address: user.address
    }
    const token = jwt.sign(payload, secret, { expiresIn: "3d" });
    return token;
}

function verifyToken(token) {
    const payload = jwt.verify(token, secret);

    return payload;
}

module.exports = {
    setToken,
    verifyToken
}