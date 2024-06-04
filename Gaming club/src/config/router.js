let { Router } = require("express");
const { upload } = require("./multer");
const { showHome, showCatalog } = require("../contorllers/home");

let router = Router();

router.get("/", showHome);
router.get("/games/catalog", showCatalog);
router.get("*", (req, res) => {
    res.render("404");
})

module.exports = {
    router
}