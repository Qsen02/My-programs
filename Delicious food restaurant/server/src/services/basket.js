const { Basket } = require("../models/basket");
const { Users } = require("../models/users");

function getAllFromBasket() {
    const dishes = Basket.find();
    return dishes;
}

async function addToBasket(data) {
    const newDish = new Basket(data);
    await newDish.save();
    return newDish;
}

async function removeFromBasket(dishId) {
    await Basket.findByIdAndDelete(dishId);
}

async function cancelOrder() {
    await Basket.deleteMany();
}

function getFromBasketById(id) {
    const dish = Basket.findById(id);
    return dish;
}

async function ordering(userId) {
    const dishes = await Basket.find().lean();
    if (dishes.length == 0) {
        throw new Error("Basket is empty!");
    }
    await Users.findByIdAndUpdate(userId, { $push: { orderHistory: dishes } });
    await Basket.deleteMany();
}

async function checkFromBasketId(id) {
    const dishes = await Basket.find().lean();
    const isValid = dishes.find(el => el._id.toString() == id);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    getAllFromBasket,
    getFromBasketById,
    addToBasket,
    cancelOrder,
    removeFromBasket,
    ordering,
    checkFromBasketId
}