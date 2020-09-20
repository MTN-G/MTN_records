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

app.get('/top_songs', (req, res) => {
    mysqlCon.query(`CALL get_top_songs`,
    (error, results)=> {
        if (error) {
            res.send(error.message);
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

app.get(`/songs/:id/`, (req, res)=>{
    mysqlCon.query(`CALL get_song_by_id (${req.params.id})`,
    (error, results) => {
        if (error) {
            res.status(400).send(error);
        };
        if (req.query.album) {
            mysqlCon.query(`select s.* , al.name album from songs s
            join albums al on s.album_id = al.id
            where al.id = ${req.query.album} and s.id != ${req.params.id};`,
            (albumErr, albumRes) => {
                if (albumErr) {
                    res.status(400).send(error);
                    console.log('shit')
                }
                results[0].push(albumRes)
                res.status(200).send(results[0]);
            })
        } 
        else if (req.query.artist) {
            mysqlCon.query(`select s.* , ar.name artist from songs s
            join artists ar on s.artist_id = ar.id
            where ar.id = ${req.query.artist} and s.id != ${req.params.id};`,
            (artistErr, artistRes) => {
                if (artistErr) {
                    res.status(400).send(error);
                }
                results[0].push(artistRes)
                res.status(200).send(results[0]);
            })
        }
        else if (req.query.playlist) {
            mysqlCon.query(`select s.* , pl.name playlist, pl.id pl_id from songs s
            join playlist_songs ps on ps.song_id = s.id
            join playlists pl on pl.id = ps.playlist_id
            where pl.id = ${req.query.playlist} and s.id != ${req.params.id};`,
            (playlistErr, playlistRes) => {
                if (playlistErr) {
                    res.status(404).send(error);
                }
                results[0].push(playlistRes)
                res.status(200).send(results[0]);
            }) 
        } else {
        res.status(200).send(results[0]);
    }});
});

app.get(`/artists/:id`, (req, res)=>{
    mysqlCon.query(`CALL get_artist_by_id (${req.params.id})`,
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        };
        res.status(200).send(results[0]);
    });
});

app.get(`/artists/:id/songs`, (req, res)=>{
    mysqlCon.query(`CALL songs_of_artist (${req.params.id})`,
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        };
        res.status(200).send(results[0]);
    });
});

app.get(`/albums/:id`, (req, res)=>{
    mysqlCon.query(`CALL get_album_by_id (${req.params.id})`,
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        };
        res.status(200).send(results[0]);
    });
});

app.get(`/playlists/:id`, (req, res)=>{
    mysqlCon.query(`CALL get_playlist_by_id (${req.params.id})`,
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        };
        res.status(200).send(results[0]);
    });
});



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