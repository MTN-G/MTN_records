const { Router } = require('express');
const { Song } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allSongs = await Song.findAll();
  res.json(allSongs)
})

router.get('/:songId', async (req, res) => {
  const song = await Song.findByPk(req.params.songId)
  res.json(song)
})

module.exports = router;