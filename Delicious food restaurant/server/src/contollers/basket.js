const { Router } = require("express");
const { getAllFromBasket, addToBasket, removeFromBasket, getFromBasketById, ordering, checkFromBasketId, cancelOrder } = require("../services/basket");
const { isUser } = require("../middlewares/guard");

const basketRouter = Router();

basketRouter.get("/", isUser(), async(req, res) => {
    const basketDishes = await getAllFromBasket().lean();
    res.json(basketDishes);
})

basketRouter.post("/", isUser(), async(req, res) => {
    const data = req.body;
    const newDishInBasket = await addToBasket(data);
    res.json(newDishInBasket);
})

basketRouter.delete("/:dishId", isUser(), async(req, res) => {
    const dishId = req.params.dishId;
    const isValid = await checkFromBasketId(dishId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await removeFromBasket(dishId);
    res.status(200).json({ message: "Record remove from basket successfully" });
})

basketRouter.get("/:dishId", isUser(), async(req, res) => {
    const dishId = req.params.dishId;
    const isValid = await checkFromBasketId(dishId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const dish = await getFromBasketById(dishId).lean();
    res.json(dish);
})

basketRouter.post("/order", isUser(), async(req, res) => {
    const user = req.user;
    try {
        await ordering(user._id);
        res.status(200).json({ message: "Order was successfull!" });
    } catch (err) {
        res.status(400).json({ message: JSON.stringify(errorParser(err).errors) });
    }
})

basketRouter.post("/cancel", isUser(), async(req, res) => {
    await cancelOrder();
    res.status(200).json({ message: "Order was canceled successfully" });
})

module.exports = {
    basketRouter
}