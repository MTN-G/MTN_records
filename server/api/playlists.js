const { Router } = require('express');
const { Playlist } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allPlaylists = await Playlist.findAll();
  res.json(allPlaylists)
});

router.get('/:playlistId', async (req, res) => {
  const album = await Album.findByPk(req.params.playlistId);
  res.json({ ...album.get(), duration })
});


module.exports = router;