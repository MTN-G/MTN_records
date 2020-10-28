const { Router } = require('express');
const { Playlist, Album, Artist, Song } = require('../models');
const router = Router();
const { Op } = require("sequelize");

router.use('/songs', require('./songs'));
router.use('/albums', require('./albums'));
router.use('/artists', require('./artists'));
router.use('/playlists', require('./playlists'));

router.get('/search',async (req, res) => {
    let allElements = []  
    const allPlaylists = await Song.findAll({
        where: {
            name: {
                [Op.substring] : `${req.query.searchText}`
            }
        }
    });
    res.send(allPlaylists)
    })

module.exports = router;