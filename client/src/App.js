import React, { useState, useEffect} from 'react';
import './App.css';
import HomePage from './mainPages/homepage.js';
import Songs from './mainPages/songs.js';
import Song from './subPages/song.js'
import Artists from './mainPages/artists.js';
import Artist from './subPages/artist.js';
import Albums from './mainPages/albums.js';
import Album from './subPages/album.js';
import Playlists from './mainPages/playlists.js';
import Playlist from './subPages/playlist.js';
import {BrowserRouter, Switch, Route, useParams} from 'react-router-dom';
import Header from './header.js';
import axios from 'axios';

   

export default function App() {

  const fetchData = async (type, setList) => {
      const { data } = await axios.get(type);
      setList(data)
    };

  const searchText = async ( value, type, setList) => {
      const { data } = await axios.get(`${type}?searchText=${value}`);
      setList(data);
  };

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Switch>
    <Route exact path="/" component={() => <HomePage/>}/>
    <Route exact path='/songs' component={() => <Songs fetchData={fetchData} searchText={searchText} />}/>
    <Route exact path='/artists' component={() => <Artists fetchData={fetchData} searchText={searchText}  />}/>
    <Route exact path='/albums' component={() => <Albums fetchData={fetchData} searchText={searchText}  />}/>
    <Route exact path='/playlists' component={() => <Playlists fetchData={fetchData} searchText={searchText}  />}/>
    <Route path='/songs/:id' component={() => <Song/>}/>
    <Route path='/artists/:id' component={() => <Artist/>}/>
    <Route path='/albums/:id' component={() => <Album/>}/>
    <Route path='/playlists/:id' component={() => <Playlist/>}/>
    </Switch>
    </BrowserRouter>
    </>
  );
};
