const { checkGameId, deleteGame, getGameById } = require("../services/games");
const { delImg } = require("../services/image");

async function showDeleteForm(req, res) {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    res.render("delete", { id });
}

async function onDelete(req, res) {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let game = await getGameById(id).lean();
    let img = game.image;
    let imgArr = img.split("\\");
    let imgName = imgArr[imgArr.length - 1];
    await deleteGame(id);
    if (imgName) {
        await delImg(imgName);
    }
    res.redirect("/games/catalog");
}

async function onReject(req, res) {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    res.redirect(`/games/details/${id}`);
}

module.exports = {
    showDeleteForm,
    onDelete,
    onReject
}