const { Router } = require('express');
const { Playlist, PlaylistSong, Song } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  try {
  const allPlaylists = await Playlist.findAll();
  res.json(allPlaylists)
} catch (e) {
  console.log(e)
}
});

router.get('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId, {
    include: {
      model: Song
    }
  });
  res.json(playlist)
});


module.exports = router;