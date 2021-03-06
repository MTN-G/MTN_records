const { Router } = require('express');
const { Artist } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allArtists = await Artist.findAll({ include: ['songs']});
  res.json(allArtists)
})

router.post('/', async (req, res) => {
  const newArtist = await Artist.create(req.body);
  res.json(newArtist)
})

router.get('/:artistId', async (req, res) => {
  const artist = await Artist.findByPk(req.params.artistId, {
    include: ['albums', 'songs']
  });
  res.json(artist)
})

router.patch('/:artistId', async (req, res) => {
  const artist = await Artist.findByPk(req.params.artistId);
  await artist.update(req.body);
  res.json(artist)
})

router.delete('/:artistId', async (req, res) => {
  const artist = await Artist.findByPk(req.params.artistId);
  await artist.destroy();
  res.json({ deleted: true })
})

module.exports = router;