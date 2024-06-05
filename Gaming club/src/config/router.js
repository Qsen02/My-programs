let { Router } = require("express");
const { upload } = require("./multer");
const { showHome, showCatalog } = require("../contorllers/home");
const { showCreateForm, onCreate } = require("../contorllers/create");
const { showDetails } = require("../contorllers/details");
const { showSearchForm, onSearch } = require("../contorllers/search");
const { showDeleteForm, onDelete, onReject } = require("../contorllers/delete");
const { showEditForm, onEdit } = require("../contorllers/edit");

let router = Router();

router.get("/", showHome);
router.get("/games/catalog", showCatalog);
router.get("/games/create", showCreateForm);
router.post("/games/create", upload.single("image"), onCreate);
router.get("/games/details/:id", showDetails);
router.get("/games/search", showSearchForm);
router.get("/search?*", onSearch);
router.get("/games/delete/:id", showDeleteForm);
router.get("/games/delete/:id/yes", onDelete);
router.get("/games/delete/:id/no", onReject);
router.get("/games/edit/:id", showEditForm);
router.post("/games/edit/:id", upload.single("image"), onEdit);
router.get("*", (req, res) => {
    res.render("404");
})

module.exports = {
    router
}