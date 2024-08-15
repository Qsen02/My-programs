const { Users } = require("../models/users");
const bcrypt = require("bcrypt");

async function register(username, email, password) {
    let userUsername = await Users.findOne({ username }).lean();
    if (userUsername) {
        throw new Error("This username is already taken!");
    }
    let userEmail = await Users.findOne({ email }).lean();
    if (userEmail) {
        throw new Error("This email is already taken!");
    }
    let newUser = Users({
        username: username,
        email: email,
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

async function checkUserId(id) {
    let users = await Users.find().lean();
    let isValid = users.find(el => el._id.toString() == id);
    if (!isValid) {
        return false;
    }
    return true;
}

module.exports = {
    register,
    login,
    getUserById,
    checkUserId
}