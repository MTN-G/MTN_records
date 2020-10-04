const { Router } = require('express');
const { Album, Artist, Song } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allAlbums = await Album.findAll({
    include: [
      {
        model: Artist,
        attributes: ["name"] 
      },
      {
        model: Song,
        attributes: ['id', 'name', 'youtubeLink']
      }
    ]
  });
  res.json(allAlbums)
});

router.get('/:albumId', async (req, res) => {
  const album = await Album.findByPk(req.params.albumId, {
    include: [
      {
        model: Artist,
        attributes: ["name"] 
      },
      {
        model: Song,
        attributes: ['id', 'name', 'youtubeLink']
      }
    ]
  });
  res.json(album)
});



module.exports = router;