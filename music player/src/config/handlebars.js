const handlebars = require("express-handlebars");

function hbsConfig(app) {
    const hbs = handlebars.create({
        extname: "hbs"
    })
    app.engine("hbs", hbs.engine);
    app.set("view engine", "hbs");
}

module.exports = {
    hbsConfig
}