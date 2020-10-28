const { Router } = require('express');
const { Op } = require("sequelize");
const { Song, Artist, Album, Playlist } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allSongs = await Song.findAll({
    include: [
      { 
        model: Artist,
        attributes: ["name"]
      },
      {
        model: Album,
        attributes: ["name"]
      }
    ]
  });
  res.json(allSongs)
})



router.get('/:songId', async (req, res) => {
  const song = await Song.findByPk(req.params.songId, {
    include: [
      { 
        model: Artist,
        attributes: ["name"]
      },
      {
        model: Album,
        attributes: ["name"]
      }
    ]
    })
  if (req.query.album) {
    const prevSongs = await Song.findAll({
        where: {
          [Op.and]: [{ albumId: req.query.album }, { id: {[Op.lt]: req.params.songId} }],
        }
    })
    const nextSongs = await Song.findAll({
        where: {
          [Op.and]: [{ albumId: req.query.album}, { id: {[Op.gt]: req.params.songId} }],
        }
  })
    res.json([song, nextSongs.concat(prevSongs)])
  }
  else if (req.query.artist) {
    const prevSongs = await Song.findAll({
      where: {
        [Op.and]: [{ artistId: req.query.artist }, { id: {[Op.lt]: req.params.songId} }],
      }
  })
  const nextSongs = await Song.findAll({
      where: {
        [Op.and]: [{ artistId: req.query.artist }, { id: {[Op.gt]: req.params.songId} }],
      }
})
  res.json([song, nextSongs.concat(prevSongs)])
  }
  else if (req.query.playlist) {
    const prevSongs = await Playlist.findByPk(req.query.playlist, {
      include: {
        model: Song,
        where: {
          id: {[Op.lt]: req.params.songId}
        }
      }   
     })
   const nextSongs = await Playlist.findByPk(req.query.playlist, {
    include: {
      model: Song,
      where: {
        id: {[Op.gt]: req.params.songId}
      }
    }   
   })
   nextSongs && prevSongs ? res.json([song, nextSongs.Songs.concat(prevSongs.Songs), prevSongs.name]) :
   nextSongs ? res.json([song, nextSongs.Songs, nextSongs.name]) :
   prevSongs ? res.json([song, prevSongs.Songs, prevSongs.name]) :
   res.json(song)

  
  }
  else {
    res.json(song)
  }
})


module.exports = router;