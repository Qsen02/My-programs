const { Router } = require("express");
const { getAllDishes, checkDishId, getDishById, getNextDishes, searchDishes } = require("../services/dishes");

const dishesRouter = Router();

dishesRouter.get("/", async(req, res) => {
    const dishes = await getAllDishes().lean();
    res.json(dishes);
})

dishesRouter.get("/:dishId", async(req, res) => {
    const dishId = req.params.dishId;
    const isValid = await checkDishId(dishId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const dish = await getDishById(dishId).lean();
    res.json(dish);
})

dishesRouter.get("/page/:pageNumber", async(req, res) => {
    const page = req.params.pageNumber;
    if (page < 0) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const dishes = await getNextDishes(page).lean();
    res.json(dishes);
})

dishesRouter.get("/search/:query", async(req, res) => {
    const query = req.params.query;
    const results = await searchDishes(query).lean();
    res.json(results);
})

module.exports = {
    dishesRouter
}