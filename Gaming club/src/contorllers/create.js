const { createGame } = require("../services/games");

async function showCreateForm(req, res) {
    res.render("create");
}

async function onCreate(req, res) {
    let fields = req.body;
    let user = req.user;
    let errors = {
        name: !fields.name,
        year: !fields.year,
        description: !fields.description,
        category: !fields.category,
        creator: !fields.creator
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
    if (Object.values(errors).includes(true)) {
        res.render("create", { errors, game: req.body });
        return;
    }
    await createGame({ name, year, description, category, creator, image: "\\" + imgPath }, user);
    res.redirect("/games/catalog");
}

module.exports = {
    showCreateForm,
    onCreate
}