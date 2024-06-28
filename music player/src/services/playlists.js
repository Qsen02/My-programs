const { Playlists } = require("../models/playlists");
const { Songs } = require("../models/songs");

function getAuthorPlaylists(user) {
    let data = Playlists.find({ ownerId: user._id });
    return data;
}

function getPlaylistById(id) {
    let data = Playlists.findById(id).populate("songs");
    return data;
}

async function createPlaylist(data, user) {
    let playlist = new Playlists(data);
    playlist.ownerId = user._id;
    await playlist.save();
}

async function deletePlaylist(id) {
    await Playlists.findByIdAndDelete(id);
}

async function addSongToPlaylist(playlistId, song) {
    await Playlists.findByIdAndUpdate(playlistId, { $push: { songs: song._id } });
}

async function deleteSongFromPlaylist(playlistId, song) {
    await Playlists.findByIdAndUpdate(playlistId, { $pull: { songs: song._id } });
}

async function checkPlaylistId(id) {
    let data = await Playlists.find().lean();
    let isValid = data.find(el => el._id == id);
    if (!isValid) {
        return false;
    }
    return true;
}

async function getTheRestSongs(playlistId) {
    let songs = await Songs.find().lean();
    let playlist = await Playlists.findById(playlistId).lean();
    let data = songs.filter(el => !playlist.songs.map(el => el.toString()).includes(el._id.toString()));
    return data;
}

module.exports = {
    getAuthorPlaylists,
    getPlaylistById,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    deleteSongFromPlaylist,
    checkPlaylistId,
    getTheRestSongs
}