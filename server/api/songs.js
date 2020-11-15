require("dotenv").config();
const { Router } = require('express');
const { Op } = require("sequelize");
const { Song, Artist, Album, Playlist } = require('../models');
const insertData = require('../elasticSearch/addData');


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
  if (req.query.addData) {
    const count = insertData("songs", "song");
    res.send(count)
  };

  res.json(allSongs)
})

const getFiltered = async (index, filter, size) => {
  const filtered = await client.search({
    size: size,
    index: index,
    body: {
      query: {
        prefix: { 'name': filter }
      }
    }
  })
  return filtered;
}
  
  router.get('/ss', async (req, res) => {
    const filter = req.query.filter ;
    const filteredSongs = await getFiltered('songs', filter, 3);
    res.send(filteredSongs)
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