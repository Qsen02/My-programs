const mongoose = require("mongoose");

const bascketSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
    likes: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    }
})

const Basket = mongoose.model("Basket", bascketSchema);

module.exports = {
    Basket
}