const mongoose = require("mongoose");

const dishesSchema = new mongoose.Schema({
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

const Dishes = mongoose.model("Dishes", dishesSchema);

module.exports = {
    Dishes
}