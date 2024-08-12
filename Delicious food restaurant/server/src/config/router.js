const { userRouter } = require("../contollers/users");
const { dishesRouter } = require("../contollers/dishes");

function routerConfig(app) {
    app.use("/users", userRouter);

    app.use("/dishes", dishesRouter);

    app.get("*", (req, res) => {
        res.status(404).json({ message: "Resource not found!" });
    })
}

module.exports = {
    routerConfig
}