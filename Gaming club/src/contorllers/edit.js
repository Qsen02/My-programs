const { getGameById, checkGameId, editGame } = require("../services/games");
const { delImg } = require("../services/image");

async function showEditForm(req, res) {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let game = await getGameById(id).lean();
    res.render("edit", { game });
}

async function onEdit(req, res) {
    let id = req.params.id;
    let isValid = await checkGameId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let fields = req.body;
    let errors = {
        name: !fields.name,
        year: !fields.year,
        description: !fields.description,
        category: !fields.category,
        creator: !fields.creator
    }
    let game = await getGameById(id).lean();
    if (Object.values(errors).includes(true)) {
        res.render("edit", { errors, game });
        return;
    }
    let name = fields.name;
    let year = fields.year;
    let description = fields.description;
    let category = fields.category;
    let creator = fields.creator;
    let imgPath = "";

    if (req.file) {
        let imgFile = req.file;
        imgPath = imgFile.path;
    }
    let img = game.image;
    let imgArr = img.split("\\");
    let imgName = imgArr[imgArr.length - 1];
    await editGame(id, { name, year, description, category, creator, image: "\\" + imgPath });
    if (imgName) {
        await delImg(imgName);
    }
    res.redirect(`/games/details/${id}`);
}

module.exports = {
    showEditForm,
    onEdit
}