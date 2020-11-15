const { Router } = require('express');
const { Playlist, Album, Artist, Song } = require('../models');
const router = Router();
const { Op } = require("sequelize");
const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

router.use('/songs', require('./songs'));
router.use('/albums', require('./albums'));
router.use('/artists', require('./artists'));
router.use('/playlists', require('./playlists'));

const client = new Client({
    cloud: {
        id: process.env.SEARCH_ID,
    },
    auth: {
        username: process.env.SEARCH_USERNAME,
        password: process.env.SEARCH_PASSWORD,
    },
});

const getFiltered = async (index, filter, size) => {
    const filtered = await client.search({
      size: size,
      index: index,
      body: {
        query: {
          wildcard: { name: `*${filter}*`}
            }
        }
    })
    return filtered.body.hits.hits.map(obj => obj._source);
}

router.get('/search/:element', async (req, res) => {
    const filter = req.query.searchText
    if (filter === '') res.send([])
    if (req.params.element === 'all') {
        const response = [
            {
                name: 'Songs',
                data: await getFiltered('songs', filter, 3)
            },
            {
                name: 'Albums',
                data: await getFiltered('albums', filter, 3)
            },
            {
                name: 'Artists',
                data: await getFiltered('artists', filter, 3)
            },
            {
                name: 'Playlists',
                data: await getFiltered('playlists', filter, 3)
            }
        ]
        console.log(response)
        res.send(response)
    } else {
        res.send([{
            name: req.params.element,
            data: await getFiltered(req.params.element, filter)
        }])
    }})

module.exports = router;


// async function findAllBySearch (model, query) {
//     const response = await model.findAll({
//         where: {
//             name: {
//                 [Op.substring] : `${query}`
//             }
//         }
//     });
//     return response
// }