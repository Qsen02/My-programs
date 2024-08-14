const { Router } = require("express");
const { addToBasket, removeFromBasket, getBasketById, ordering, checkBasketId, cancelOrder, createBasket } = require("../services/basket");
const { isUser } = require("../middlewares/guard");

const basketRouter = Router();

basketRouter.get("/:basketId", isUser(), async(req, res) => {
    const id = req.params.basketId;
    const isValid = await checkBasketId(id);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const basket = await getBasketById(id).lean();
    res.json(basket);
})

basketRouter.put("/:basketId", isUser(), async(req, res) => {
    const id = req.params.basketId;
    const data = req.body;
    const newDishInBasket = await addToBasket(id, data);
    res.json(newDishInBasket);
})

basketRouter.delete("/dishId/from/basketId", isUser(), async(req, res) => {
    const dishId = req.params.dishId;
    const basketId = req.params.basketId;
    const isBasketValid = await checkBasketId(basketId);
    if (!isBasketValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const isDishValid = await checkBasketId(dishId);
    if (!isDishValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await removeFromBasket(basketId, dishId);
    res.status(200).json({ message: "Record remove from basket successfully" });
})

basketRouter.get("/:basketId", isUser(), async(req, res) => {
    const basketId = req.params.basketId;
    const isValid = await checkBasketId(basketId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const dish = await getBasketById(basketId).lean();
    res.json(dish);
})

basketRouter.post("/order/:basketId", isUser(), async(req, res) => {
    const id = req.params.basketId;
    const user = req.user;
    try {
        await ordering(id, user._id);
        res.status(200).json({ message: "Order was successfull!" });
    } catch (err) {
        res.status(400).json({ message: JSON.stringify(errorParser(err).errors) });
    }
})

basketRouter.post("/cancel/:basketId", isUser(), async(req, res) => {
    const id = req.params.basketId;
    await cancelOrder(id);
    res.status(200).json({ message: "Order was canceled successfully" });
})

module.exports = {
    basketRouter
}