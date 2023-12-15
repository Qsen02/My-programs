let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let handlebars = require("express-handlebars");
app.use(bodyParser.urlencoded({
    extended: true
}));
let hbs = handlebars.create({
    extname: ".hbs"
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});
app.get("/binaryCalculator.html", (req, res) => {
    console.log(`Потребител е посетил: двоичен калкулатор`);
    res.render("binaryCalculator");
});
app.get("/standartCalculator.html", (req, res) => {
    console.log(`Потребител е посетил: стандартен калкулатор`);
    res.render("standartCalculator");
});
app.get("/info.html", (req, res) => {
    console.log("Потребител е влязъл в информация");
    res.render("info");
});
app.listen(3000);