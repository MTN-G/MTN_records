import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Carousel from 'react-elastic-carousel';
import SongCard from '../cards/songCard.js'
import axios from 'axios';
import AlbumCard from "../cards/albumCard.js";

export default function Artist () {

  const [artistInfo, setArtistInfo] = useState([])
  const [artistAlbums, setArtistAlbums] = useState([])
  const [artistSongs, setArtistSongs] = useState([])
  const location = useLocation();

  useEffect(()=>{
    const fetchArtist = async () => {
      const { data } = await axios.get(location.pathname);
      setArtistInfo(data[0][0])
      setArtistAlbums(data[0])
      setArtistSongs(data[1])
    };
    fetchArtist()
  },[location])

  console.log(artistAlbums)

  return (<div id="artist">
  <div className="artistpage">
      <h1 className="title">{artistInfo.artist}</h1>
      
      <img src={artistInfo.ar_img} alt="cover" width="500" height="300" style={{marginTop: '20px', borderStyle: 'solid', borderRadius: '20px', borderColor: "black"}}></img>
  </div>
  <div className="carusels">
    <div style={{width: "500px", textAlign: "center"}}>
  <h3>display {artistAlbums.length} albums of {artistInfo.artist} </h3>
  <Carousel >
    {artistAlbums.map(
    album => <AlbumCard album={album}/>   
    )}
  </Carousel ></div> 
  <div style={{width: "500px",  textAlign: "center"}}> <h3>display {artistSongs.length} songs of {artistInfo.artist} </h3>
  <Carousel >
    {artistSongs.map(
    song => <SongCard style={{height:"150px"}} song={song} type="artist" typeId={artistInfo.id}/>
    )}
  </Carousel> </div>
  </div> 
  </div>

    
    )
}