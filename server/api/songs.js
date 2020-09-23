const { Router } = require('express');
const { Song } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allSongs = await Song.findAll();
  res.json(allSongs)
})

module.exports = router;