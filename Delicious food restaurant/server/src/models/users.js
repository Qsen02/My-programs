const mongoose = require("mongoose");

const userShcema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    }
})

const Users = mongoose.model("users", userShcema);

module.exports = {
    Users
}