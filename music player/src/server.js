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
let { loadClients, saveClients } = require("./models/sign in.js");
let { loadProfile, saveProfile } = require("./models/log in.js");

app.get("/", (req, res) => {
    res.render("input");
});
app.get("/home", (req, res) => {
    let songs = loadJson();
    let curClient = loadProfile();
    res.render("Home", {
        songs,
        curClient
    });
});
app.get("/playlists", (req, res) => {
    let playlists = loadPlaylist();
    let curClient = loadProfile();
    res.render("Playlists", {
        playlists,
        curClient
    });
});
app.get("/create", (req, res) => {
    let songs = loadSong();
    let curClient = loadProfile();
    res.render("Create", {
        songs,
        curClient
    });
});
app.get("/addSong", (req, res) => {
    let curClient = loadProfile();
    res.render("AddSong", {
        curClient
    });
});
app.get("/cancel", (req, res) => {
    let curClient = loadProfile();
    console.log(`${curClient[0].username} cancel the creation of playlist.`);
    res.render("cancel", {
        curClient
    });
    let songs = loadSong();
    songs = [];
    saveSong(songs);
});
app.get("/delete", (req, res) => {
    let curClient = loadProfile();
    res.render("delete", {
        curClient
    });
});
app.get("/addDirectory", (req, res) => {
    let curClient = loadProfile();
    res.render("addDirectory", {
        curClient
    });
});
app.get("/deleteAllsongs", (req, res) => {
    let curClient = loadProfile();
    console.log(`${curClient[0].username} delete all songs.`)
    let deleteSongs = [];
    let songs = loadJson();
    songs = deleteSongs;
    saveHome(songs);
    res.render("deleteAllSongs", {
        curClient
    });
});
app.get("/signIn", (req, res) => {
    res.render("signIn");
});
app.get("/logIn", (req, res) => {
    res.render("logIn");
});
app.get("/error", (req, res) => {
    res.render("error");
});
app.get("/confirmLogOut", (req, res) => {
    let logOut = [];
    let curClient = loadProfile();
    console.log(`${curClient[0].username} has logged out`);
    curClient = logOut;
    saveProfile(curClient);
    res.render("confirmLogOut");
});
app.get("/dublicatedSong", (req, res) => {
    res.render("dublicatedSong");
})
app.post("/addDirectory", (req, res) => {
    let curClient = loadProfile();
    console.log(`${curClient[0].username} added new directory with songs.`);
    let songs = req.body.songDirectory;
    for (let song of songs) {
        if (song.includes("mp3") || song.includes("flac") || song.includes("mp2") || song.includes("mpeg") || song.includes("mpe")) {
            let curSong = {
                name: song
            }
            let allSongs = loadJson();
            allSongs.push(curSong);
            saveHome(allSongs);
        } else {
            continue;
        }
    }
    res.redirect("/home");
});
app.post("/addSong", (req, res) => {
    let curClient = loadProfile();
    console.log(`${curClient[0].username} added song with name ${req.body.audio}`);
    console.log(req.body);
    let newSong = {
        image: req.body.image,
        audio: req.body.audio
    }
    let songs = loadSong();
    if (songs.length == 0) {
        songs.push(newSong);
        saveSong(songs);
        res.redirect("/create");
    } else {
        for (let song of songs) {
            if (newSong.audio == song.audio) {
                res.redirect("/dublicatedSong");
            } else {
                songs.push(newSong);
                saveSong(songs);
                res.redirect("/create");
            }
        }
    }
});
app.post("/create", (req, res) => {
    let curClient = loadProfile();
    console.log(`${curClient[0].username} created a playlist with name ${req.body.playlistName}`);
    console.log(req.body);
    let allSongs = [];
    let newPlaylist = {
        playlistName: req.body.playlistName,
        songs: loadSong()
    };
    let songs = loadSong();
    songs = allSongs;
    let playlists = loadPlaylist();
    playlists.push(newPlaylist);
    savePlaylist(playlists);
    res.redirect("/playlists");
    saveSong(songs);
});
app.post("/delete", (req, res) => {
    let curClient = loadProfile();
    let name = req.body.deletePlaylist;
    let playlists = loadPlaylist();
    for (let i = 0; i < playlists.length; i++) {
        let playlist = playlists[i];
        if (name == playlist.playlistName) {
            playlists.splice(i, 1);
        }
    }
    console.log(`${curClient[0].username} delete playlist with name: ${name}`);
    savePlaylist(playlists);
    res.redirect("/playlists");
});
app.post("/signIn", (req, res) => {
    console.log(`You have new client registered with username:${req.body.username} password:${req.body.password}`);
    let client = {
        username: req.body.username,
        password: req.body.password
    }
    let clients = loadClients();
    clients.push(client);
    saveClients(clients);
    res.redirect("/");
});
app.post("/logIn", (req, res) => {
    let client = {
        username: req.body.username,
        password: req.body.password
    }
    let clients = loadClients();
    let curClient = loadProfile();
    for (let account of clients) {
        if (client.username == account.username) {
            if (client.password == account.password) {
                curClient.push(client);
                saveProfile(curClient);
                console.log(`${curClient[0].username} logged in his profile!`);
                res.redirect("/home");
            } else {
                res.redirect("/error");
            }
        }
    }
    res.redirect("/error");
})
app.listen(3000);