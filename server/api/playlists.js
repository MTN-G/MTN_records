const { Router } = require('express');
const { Playlist } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allPlaylists = await Playlist.findAll({include: ['songs']});
  res.json(allPlaylists)
});

router.get('/:playlistId', async (req, res) => {
  const playlist = await Album.findByPk(req.params.playlistId);
  res.json(playlist)
});


module.exports = router;