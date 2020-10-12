import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Carousel from 'react-elastic-carousel';
import SongCard from '../cards/songCard.js'
import axios from 'axios';
import AlbumCard from "../cards/albumCard.js";
import Album from "./album.js";

export default function Artist () {

  const [artistInfo, setArtistInfo] = useState({albums: [], songs: []})
  const loacation = useLocation();

  useEffect(()=>{
    const fetchArtist = async () => {
      const { data } = await axios.get(loacation.pathname);
      setArtistInfo(data)
      console.log(data)
    };
    fetchArtist()
  },[loacation])

  return (<div id="artist">
  <div className="artistpage">
      <h1 className="title">{artistInfo.name}</h1>
      
      <img src={artistInfo.coverImg} alt="cover" width="500" height="300" style={{marginTop: '20px', borderStyle: 'solid', borderRadius: '20px', borderColor: "black"}}></img>
  </div>
  <div className="carusels">
    <div style={{width: "500px", textAlign: "center"}}>
  <h3>display {artistInfo.albums.length} albums of {artistInfo.name} </h3>
  <Carousel >
    {artistInfo.albums.map(
    album => <AlbumCard album={album}/>   
    )}
  </Carousel ></div> 
  <div style={{width: "500px",  textAlign: "center"}}> <h3>display {artistInfo.songs.length} songs of {artistInfo.name} </h3>
  <Carousel >
    {artistInfo.songs.map(
    song => <SongCard style={{height:"150px"}} song={song} searchParam={`?artist=${artistInfo.id}`}/>
    )}
  </Carousel> </div>
  </div> 
  </div>

    
    )
}