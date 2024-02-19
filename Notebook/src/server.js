let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let handlebars = require("express-handlebars");
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use("/public", express.static("public"));
let hbs = handlebars.create({
    extname: ".hbs"
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
let { load, save } = require("./models/notes");
app.get("/", (req, res) => {
    let notes = load();
    res.render("home", {
        notes
    });
});
app.get("/CreateNote.html", (req, res) => {
    res.render("createNote");
});
app.post("/CreateNote.html", (req, res) => {
    console.log(`Потребител създаде бележка: "${req.body.description}"`);
    let newNote = {
        description: req.body.description
    };
    let notes = load();
    notes.push(newNote);
    save(notes);
    res.redirect("/");
});
app.get("/delete.html", (req, res) => {
    res.render("delete");
});
app.post("/delete.html", (req, res) => {
    let deleteNote = req.body.deletedNote;
    let notes = load();
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        if (deleteNote == note.description) {
            notes.splice(i, 1);
            break;
        }
    }
    save(notes);
    console.log(`Потребител изтри бележка: "${deleteNote}"`);
    res.redirect("/");
});
app.listen(2000);