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
    }
})

const Basket = mongoose.model("Basket", bascketSchema);

module.exports = {
    Basket
}