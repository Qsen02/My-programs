const { Dishes } = require("../models/dishes");

function getAllDishes() {
    const dishes = Dishes.find();
    return dishes;
}

function getDishById(dishId) {
    const dish = Dishes.findById(dishId);
    return dish;
}

function getNextDishes(page) {
    const skipCount = 3 * page;
    const dishes = Dishes.find().skip(skipCount).limit(3);
    return dishes;
}

async function createDish(data, user) {
    const dish = new Dishes(data);
    dish.ownerId = user._id;
    await dish.save();
    return dish;
}

async function deleteDish(dishId) {
    await Dishes.findByIdAndDelete(dishId);
}
async function editDish(dishId, data) {
    await Dishes.findByIdAndUpdate(dishId, data);
}

async function likeDish(dishId, user) {
    await Dishes.findByIdAndUpdate(dishId, { $push: { likes: user._id } });
}

async function unlikeDish(dishId, user) {
    await Dishes.findByIdAndUpdate(dishId, { $pull: { likes: user._id } });
}

function searchDishes(query) {
    const dishes = Dishes.find({ title: new RegExp(query, "i") });
    return dishes;
}

async function checkDishId(dishId) {
    const dishes = await Dishes.find().lean();
    const isValid = dishes.find(el => el._id.toString() == dishId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    getAllDishes,
    getDishById,
    getNextDishes,
    createDish,
    deleteDish,
    editDish,
    searchDishes,
    checkDishId,
    likeDish,
    unlikeDish
}