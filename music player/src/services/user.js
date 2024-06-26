const bcrypt = require("bcrypt");
const { Users } = require("../models/user");

async function register(email, username, password) {
    let userEmail = await Users.findOne({ email }).lean();
    if (userEmail) {
        throw new Error("This user already exists!");
    }
    let userUsername = await Users.findOne({ username }).lean();
    if (userUsername) {
        throw new Error("This username has already taken!");
    }
    let newUser = new Users({
        email: email,
        username: username,
        password: await bcrypt.hash(password, 10)
    });
    await newUser.save();
    return newUser;
}

async function login(email, password) {
    let user = await Users.findOne({ email }).lean();
    if (!user) {
        throw new Error("Password or email don't match!");
    }
    let isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
        throw new Error("Password or email don't match!");
    }
    return user;
}

module.exports = {
    register,
    login
}