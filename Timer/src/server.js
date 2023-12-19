let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let handlebars = require("express-handlebars");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/public", express.static("public"));
let hbs = handlebars.create({
    extname: ".hbs"
})
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.get("/", (req, res) => {
    res.render("home");
});
app.get("/Chronometer.html", (req, res) => {
    console.log("Потребител е поселит хронометър");
    res.render("Chronometer");
});
app.get("/Timer.html", (req, res) => {
    console.log("Потребител е поселит таймер");
    res.render("Timer");
});
app.listen(3000);