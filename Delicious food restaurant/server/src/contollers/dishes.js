const { Router } = require("express");
const { getAllDishes, checkDishId, getDishById, getNextDishes, searchDishes, createDish, deleteDish, editDish, likeDish, unlikeDish } = require("../services/dishes");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../utils");

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

dishesRouter.post("/",
    body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long!"),
    body("price").isNumeric({ min: 0 }).withMessage("Price must be positive number!"),
    body("category").isLength({ min: 3 }).withMessage("Category must be at least 3 characters long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    body("description").isLength({ min: 10, max: 200 }).withMessage("Description must be between 10 and 200 characters long!"),
    async(req, res) => {
        const fields = req.body;
        const title = fields.title;
        const price = fields.price;
        const category = fields.category;
        const image = fields.image;
        const description = fields.description;
        const user = req.user;
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            const newDish = await createDish({ title, price, category, image, description }, user);
            res.status(200).json(newDish);
        } catch (err) {
            res.status(400).json({ message: JSON.stringify(errorParser(err).errors) });
        }
    })

dishesRouter.delete("/:dishId", async(req, res) => {
    const dishId = req.params.dishId;
    const isValid = await checkDishId(dishId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await deleteDish(dishId);
    res.status(200).json({ message: "Record deleted successfully!" });
})

dishesRouter.put("/:dishId",
    body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long!"),
    body("price").isNumeric({ min: 0 }).withMessage("Price must be positive number!"),
    body("category").isLength({ min: 3 }).withMessage("Category must be at least 3 characters long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    body("description").isLength({ min: 10, max: 200 }).withMessage("Description must be between 10 and 200 characters long!"),
    async(req, res) => {
        const fields = req.body;
        const title = fields.title;
        const price = fields.price;
        const category = fields.category;
        const image = fields.image;
        const description = fields.description;
        const dishId = req.params.dishId;
        const isValid = await checkDishId(dishId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await editDish(dishId, { title, price, category, image, description });
            res.status(200).json({ message: "Record edited successsfully!" });
        } catch (err) {
            res.status(400).json({ message: JSON.stringify(errorParser(err).errors) });
        }
    })

dishesRouter.post("/:dishId/like", async(req, res) => {
    const dishId = req.params.dishId;
    const isValid = await checkDishId(dishId);
    const user = req.user;
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await likeDish(dishId, user);
    res.status(200).json({ message: "Record liked successsfully" });
})

dishesRouter.post("/:dishId/unlike", async(req, res) => {
    const dishId = req.params.dishId;
    const isValid = await checkDishId(dishId);
    const user = req.user;
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await unlikeDish(dishId, user);
    res.status(200).json({ message: "Record unlike successsfully" });
})

module.exports = {
    dishesRouter
}