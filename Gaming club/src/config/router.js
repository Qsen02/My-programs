let { Router } = require("express");
const { upload } = require("./multer");
const { showHome, showCatalog } = require("../contorllers/home");
const { showCreateForm, onCreate } = require("../contorllers/create");
const { showDetails } = require("../contorllers/details");
const { showSearchForm, onSearch } = require("../contorllers/search");

let router = Router();

router.get("/", showHome);
router.get("/games/catalog", showCatalog);
router.get("/games/create", showCreateForm);
router.post("/games/create", upload.single("image"), onCreate);
router.get("/games/details/:id", showDetails);
router.get("/games/search", showSearchForm);
router.get("/search?*", onSearch);
router.get("*", (req, res) => {
    res.render("404");
})

module.exports = {
    router
}