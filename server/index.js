require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

let mysqlCon = mysql.createConnection({
    host: "localhost",
    user: process.env.USER ,
    password: process.env.PASSWARD ,
    database: process.env.DB ,
    multipleStatements: true
  });

mysqlCon.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

function playReapet (nextSong, prevSong, results, res) {
    mysqlCon.query(`${nextSong}`, 
        (errorA, resA) => {
            if (errorA) {
                res.status(400).send(errorA);
            }
            results[0].push(resA[0])
            
        })
    mysqlCon.query(`${prevSong}`, 
        (errorA, resA) => {
            if (errorA) {
                res.status(400).send(errorA);
            }
            results[0].push(resA[0])
            res.status(200).send(results[0]);
        })
}

// get 20 top of.. 
app.get('/top_songs', (req, res) => {
    mysqlCon.query(`CALL get_top_songs`,
    (error, results)=> {
        if (error) {
            res.status(404).send(error.message);
        };
        res.send(results[0]);
      });
});

app.get('/top_artists', (req, res) =>{
    mysqlCon.query(`CALL get_top_artists`,
    (error, results)=> {
        if (error) {
            res.send(error.message);
        };
        res.send(results[0]);
      });
});

app.get('/top_albums', (req, res) => {
    mysqlCon.query(`CALL get_top_albums`,
    (error, results)=> {
        if (error) {
            res.send(error.message);
        };
        res.send(results[0]);
      });
});

app.get('/top_playlists', (req, res) => {
    mysqlCon.query(`CALL get_top_playlists`,
    (error, results)=> {
        if (error) {
            res.send(error.message);
        };
        res.send(results[0]);
      });
});

// get song info and suggested song
app.get(`/songs/:id/`, (req, res)=>{
    mysqlCon.query(`CALL get_song_by_id (${req.params.id})`,
    (error, results) => {
        if (error) {
            res.status(400).send(error);
        };
        if (req.query.album) {
            playReapet(
                `CALL next_song_album  (${req.query.album}, ${req.params.id})`,
                `CALL prev_song_album  (${req.query.album}, ${req.params.id})`,
                results, res)
        } 
         else if (req.query.artist) {
             playReapet(
                `CALL next_song_artist  (${req.query.artist}, ${req.params.id})`,
                `CALL prev_song_artist  (${req.query.artist}, ${req.params.id})`,
                results, res)
        }
        else if (req.query.playlist) {
            playReapet(
                `CALL next_songs (${req.query.playlist}, ${req.params.id})`,
                `CALL prev_songs (${req.query.playlist}, ${req.params.id})`,
                results, res)
        } else {
        res.status(200).send(results[0]);
    }});
});

// get specific artist
app.get(`/artists/:id`, (req, res)=>{
    mysqlCon.query(`CALL get_artist_by_id (${req.params.id})`,
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        };
        res.status(200).send(results[0]);
    });
});

// get all songs of artist
app.get(`/artists/:id/songs`, (req, res)=>{
    mysqlCon.query(`CALL songs_of_artist (${req.params.id})`,
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        };
        res.status(200).send(results[0]);
    });
});

// get specific album 
app.get(`/albums/:id`, (req, res)=>{
    mysqlCon.query(`CALL get_album_by_id (${req.params.id})`,
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        };
        res.status(200).send(results[0]);
    });
});

// get specefic playlist
app.get(`/playlists/:id`, (req, res)=>{
    mysqlCon.query(`CALL get_playlist_by_id (${req.params.id})`,
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        };
        res.status(200).send(results[0]);
    });
});

// post new element
app.post(`/:table`, (req, res)=>{
    const newRow = req.body;
    mysqlCon.query(`INSERT INTO ${req.params.table}s set ?`, [newRow],
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        } 
        res.send(results);
    });
})

// update element
app.put(`/:table/:id`, (req, res)=>{
    const id = req.params.id;
    const newRow = req.body;
    mysqlCon.query(`UPDATE ${req.params.table} set ? WHERE id = ?`, [newRow, id],
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        } 
        res.send(results);
    });
})

// delete element
app.delete(`/:table/:id`, (req, res) => {
    const id = req.params.id;
    mysqlCon.query(`DELETE FROM ${req.params.table}s WHERE id = ?`, [id],
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        } 
        res.send(results);
    });
})

// get all from element
app.get(`/:table/`, (req, res) => {
    mysqlCon.query(`SELECT * from ${req.params.table}`,
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        };
        if (req.query.searchText) {
            const text = req.query.searchText;
            const filtered = results.filter((value) => value.name.toLowerCase().includes(text.toLowerCase()));
            res.send(filtered);
          } else {
            res.status(200).send(results);
          }
    });
})

app.listen(3001)