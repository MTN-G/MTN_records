import React from 'react';
import './App.css';
import HomePage from './mainPages/homepage.js';
import GridPage from './mainPages/gridpage.js';
import Song from './subPages/song.js'
import Artist from './subPages/artist.js';
import Album from './subPages/album.js';
import Playlist from './subPages/playlist.js';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header.js';
import Page404 from './components/page404'

export default function App() {


  return (
    
    <BrowserRouter>
    <div className="app">
    <Header/>
    <Switch>
    <Route exact path="/" component={() => <HomePage/>}/>
    <Route exact path='/songs' component={() => <GridPage/>}/>
    <Route exact path='/artists' component={() => <GridPage/>}/>
    <Route exact path='/albums' component={() => <GridPage/>}/>
    <Route exact path='/playlists' component={() => <GridPage/>}/>
    <Route path='/songs/:id' component={() => <Song/>}/>
    <Route path='/artists/:id' component={() => <Artist/>}/>
    <Route path='/albums/:id' component={() => <Album/>}/>
    <Route path='/playlists/:id' component={() => <Playlist/>}/>
    <Route path='/404' component={() => <Page404/>}/>
    <Redirect from="*" to="/404"/>
    </Switch> 
    </div>
    </BrowserRouter>
   
  );
};
