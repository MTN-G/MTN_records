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

    mysqlCon.query(`
    SELECT s.title, al.name album, ar.name artist, sum(i.is_liked) likes
    FROM songs s
    JOIN albums al on s.album_id = al.id
    JOIN artists ar on s.artist_id = ar.id
    JOIN interactions i on s.id = i.song_id
    GROUP BY s.id 
    ORDER BY sum(i.is_liked) DESC
    LIMIT 20`,
    (error, results)=> {
        if (error) {
            res.send(error.message);
        };
        res.send(results);
      });
});

app.get('/top_artists', (req, res) =>{
    mysqlCon.query(`
    SELECT ar.name artist, sum(i.is_liked) likes
    FROM songs s
    JOIN artists ar on s.artist_id = ar.id
    JOIN interactions i on s.id = i.song_id
    GROUP BY s.artist_id 
    ORDER BY sum(i.is_liked) DESC
    LIMIT 20`,
    (error, results)=> {
        if (error) {
            res.send(error.message);
        };
        res.send(results);
      });
});

app.get('/top_albums', (req, res) => {
    mysqlCon.query(`
    SELECT al.name album, ar.name artist, sum(i.is_liked) likes
    FROM songs s
    JOIN albums al on s.album_id = al.id
    JOIN artists ar on s.artist_id = ar.id
    JOIN interactions i on s.id = i.song_id
    GROUP BY s.album_id 
    ORDER BY sum(i.is_liked) DESC
    LIMIT 20`,
    (error, results)=> {
        if (error) {
            res.send(error.message);
        };
        res.send(results);
      });
});

app.get('/top_playlists', (req, res) => {
    mysqlCon.query(`
    SELECT p.name, sum(i.is_liked) likes
    FROM playlists p
    JOIN playlist_songs ps on p.id = ps.playlist_id
    JOIN songs s on s.id = ps.song_id
    JOIN interactions i on s.id = i.song_id
    GROUP BY p.id 
    ORDER BY sum(i.is_liked) DESC
    LIMIT 20`,
    (error, results)=> {
        if (error) {
            res.status(400).send(error.message);
        };
        res.status(200).send(results);
      });
});

app.get(`/:table/:id`, (req, res)=>{
    mysqlCon.query(`SELECT * from ${req.params.table} WHERE id = ${req.params.id}`,
    (error, results)=>{
        if (error) {
            res.status(400).send(error);
        };
        res.status(200).send(results);
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
app.listen(3001)