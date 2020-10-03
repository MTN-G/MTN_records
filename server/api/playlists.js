const e = require('express');
const { Router } = require('express');
const { Playlist } = require('../models');
const playlistSong = require('../models/playlistSong');

const router = Router();

router.get('/', async (req, res) => {
  try {
  const allPlaylists = await Playlist.findAll({include: ['songs' ]});
  res.json(allPlaylists)
} catch (e) {
  console.log(e)
}
});

router.get('/:playlistId', async (req, res) => {
  const playlist = await Album.findByPk(req.params.playlistId);
  res.json(playlist)
});


module.exports = router;