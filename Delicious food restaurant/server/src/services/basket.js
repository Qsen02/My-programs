const { Basket } = require("../models/basket");
const { Users } = require("../models/users");

async function createBasket(user) {
    const newBasket = new Basket();
    newBasket.ownerId = user._id;
    await newBasket.save();
    return newBasket;
}

async function addToBasket(basketId, data) {
    await Basket.findByIdAndUpdate(basketId, { $push: { dishes: data } });
}

async function removeFromBasket(basketId, dish) {
    await Basket.findByIdAndUpdate(basketId, { $pull: { dishes: dish } });
}

async function cancelOrder(id) {
    await Basket.findByIdAndDelete(id);
}

function getBasketById(id) {
    const dish = Basket.findById(id);
    return dish;
}

async function ordering(basketId, userId) {
    const basket = await Basket.findById(basketId).lean();
    if (basket.dishes.length == 0) {
        throw new Error("Basket is empty!");
    }
    await Users.findByIdAndUpdate(userId, { $push: { orderHistory: basket.dishes } });
    await Basket.findByIdAndUpdate(basketId, { $set: { dishes: [] } });
}

async function checkBasketId(id) {
    const dishes = await Basket.find().lean();
    const isValid = dishes.find(el => el._id.toString() == id);
    if (isValid) {
        return true;
    }
    return false;
}

async function removeBasket(user) {
    const basket = await Basket.findOne({ ownerId: user._id });
    await Basket.findByIdAndDelete(basket._id);
}

module.exports = {
    getBasketById,
    createBasket,
    addToBasket,
    cancelOrder,
    removeFromBasket,
    ordering,
    checkBasketId,
    removeBasket
}