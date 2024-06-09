const { Users } = require("../models/users");
const bcrypt = require("bcrypt");

async function register(username, password) {
    let user = await Users.findOne({ username }).lean();
    if (user) {
        throw new Error("This user is already taken!");
    }
    let newUser = Users({
        username: username,
        password: await bcrypt.hash(password, 10)
    })
    newUser.save();
    return newUser;
}

async function login(username, password) {
    let user = await Users.findOne({ username }).lean();
    if (!user) {
        throw new Error("Username or password don't match!");
    }
    let isVaildPass = await bcrypt.compare(password, user.password);
    if (!isVaildPass) {
        throw new Error("Username or password don't match!");
    }
    return user;
}

function getUserById(id) {
    let user = Users.findById(id);
    return user;
}

module.exports = {
    register,
    login,
    getUserById
}