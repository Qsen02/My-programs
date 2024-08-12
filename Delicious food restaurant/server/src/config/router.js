const { userRouter } = require("../contollers/users");
const { dishesRouter } = require("../contollers/dishes");
const { basketRouter } = require("../contollers/basket");

function routerConfig(app) {
    app.use("/users", userRouter);

    app.use("/dishes", dishesRouter);

    app.use("/basket", basketRouter);

    app.get("*", (req, res) => {
        res.status(404).json({ message: "Resource not found!" });
    })
}

module.exports = {
    routerConfig
}