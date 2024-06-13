let mongoose = require("mongoose");

let usersSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

let Users = mongoose.model("Users", usersSchema);

module.exports = {
    Users
}