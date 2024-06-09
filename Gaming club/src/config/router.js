let { Router } = require("express");
const { upload } = require("./multer");
const { showHome, showCatalog } = require("../contorllers/home");
const { showCreateForm, onCreate } = require("../contorllers/create");
const { showDetails, onComment } = require("../contorllers/details");
const { showSearchForm, onSearch } = require("../contorllers/search");
const { showDeleteForm, onDelete, onReject } = require("../contorllers/delete");
const { showEditForm, onEdit } = require("../contorllers/edit");
const { showRegisterForm, onRegister } = require("../contorllers/register");
const { showLoginform, onLogin } = require("../contorllers/login");
const { isGuest, isUser } = require("../middlewears/guards");
const { onLike } = require("../contorllers/likes");

let router = Router();

router.get("/", showHome);
router.get("/games/catalog", showCatalog);
router.get("/games/create", isUser(), showCreateForm);
router.post("/games/create", isUser(), upload.single("image"), onCreate);
router.get("/games/details/:id", showDetails);
router.get("/games/search", showSearchForm);
router.get("/search?*", onSearch);
router.get("/games/delete/:id", isUser(), showDeleteForm);
router.get("/games/delete/:id/yes", isUser(), onDelete);
router.get("/games/delete/:id/no", isUser(), onReject);
router.get("/games/edit/:id", isUser(), showEditForm);
router.post("/games/edit/:id", isUser(), upload.single("image"), onEdit);
router.get("/register", isGuest(), showRegisterForm);
router.post("/register", isGuest(), onRegister);
router.get("/login", isGuest(), showLoginform);
router.post("/login", isGuest(), onLogin);
router.get("/games/:id/like", onLike);
router.post("/details/:id/comment", onComment);
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
})
router.get("*", (req, res) => {
    res.render("404");
})

module.exports = {
    router
}