const { Router } = require('express');
const { Playlist, Album, Artist, Song } = require('../models');
const router = Router();
const { Op } = require("sequelize");

router.use('/songs', require('./songs'));
router.use('/albums', require('./albums'));
router.use('/artists', require('./artists'));
router.use('/playlists', require('./playlists'));

router.get('/search',async (req, res) => {
    if (req.query.searchText === '') res.send([])
    const response = [
        {
            name: 'Songs',
            data: await findAllBySearch(Song, req.query.searchText)
        },
        {
            name: 'Albums',
            data: await findAllBySearch(Album, req.query.searchText)
        },
        {
            name: 'Artists',
            data: await findAllBySearch(Artist, req.query.searchText)
        },
        {
            name: 'Playlists',
            data: await findAllBySearch(Playlist, req.query.searchText)
        }
    ]
    console.log(response)
    res.send(response)
    })

async function findAllBySearch (model, query) {
    const response = await model.findAll({
        where: {
            name: {
                [Op.substring] : `${query}`
            }
        }
    });
    return response
}

module.exports = router;