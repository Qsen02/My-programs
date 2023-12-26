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
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

let { loadSong, saveSong } = require("./models/songs.js");
let { loadPlaylist, savePlaylist } = require("./models/playlists.js");
let { loadJson, saveHome } = require("./models/home.js");

app.get("/", (req, res) => {
    let songs = loadJson();
    res.render("Home", {
        songs
    });
});
app.get("/home", (req, res) => {
    let songs = loadJson();
    res.render("Home", {
        songs
    });
});
app.get("/playlists", (req, res) => {
    let playlists = loadPlaylist();
    res.render("Playlists", {
        playlists
    });
});
app.get("/create", (req, res) => {
    let songs = loadSong();
    res.render("Create", {
        songs
    });
});
app.get("/addSong", (req, res) => {
    res.render("AddSong");
});
app.get("/cancel", (req, res) => {
    console.log("Someone cancel the creation of playlist");
    res.render("cancel");
    let songs = loadSong();
    songs = [];
    saveSong(songs);
});
app.get("/delete", (req, res) => {
    res.render("delete");
});
app.get("/addDirectory", (req, res) => {
    res.render("addDirectory");
});
app.post("/addDirectory", (req, res) => {
    console.log("Someone added new directory with songs");
    let songs = req.body.songDirectory;
    for (let song of songs) {
        let curSong = {
            name: song
        }
        let allSongs = loadJson();
        allSongs.push(curSong);
        saveHome(allSongs);
    }
    res.redirect("/home");
});
app.post("/addSong", (req, res) => {
    console.log(`Someone added song with name ${req.body.audio}`);
    console.log(req.body);
    let newSong = {
        image: req.body.image,
        audio: req.body.audio
    }
    let songs = loadSong();
    songs.push(newSong);
    saveSong(songs);
    res.redirect("/create");
});
app.post("/create", (req, res) => {
    console.log(`Someone created a playlist with name ${req.body.playlistName}`);
    console.log(req.body);
    let allSongs = [];
    let newPlaylist = {
        playlistName: req.body.playlistName,
        songs: loadSong()
    };
    let playlists = loadPlaylist();
    playlists.push(newPlaylist);
    savePlaylist(playlists);
    saveSong(allSongs);
    res.redirect("/playlists")
});
app.post("/delete", (req, res) => {
    let name = req.body.deletePlaylist;
    let playlists = loadPlaylist();
    for (let i = 0; i < playlists.length; i++) {
        let playlist = playlists[i];
        if (name == playlist.playlistName) {
            playlists.splice(i, 1);
        }
    }
    console.log(`Someone delete playlist with name: ${name}`);
    savePlaylist(playlists);
    res.redirect("/playlists");
})
app.listen(3000);