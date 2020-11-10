import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory} from "react-router-dom";
import axios from 'axios';
import SongCard from "../cards/songCard";
import YouTube from 'react-youtube';

export default function Song () {
  
  const [songInfo, setSongInfo] = useState();
  const [recomendedSongs, setRecomendedSongs] = useState();
  const [playlistName, setPlaylistName] = useState('');

  const history = useHistory();
  const location = useLocation();

  const opts = {
    height: '250',
    width: '500',
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(()=>{
    const fetchSong = async () => {
      try {
        const { data } = await axios.get(location.pathname + location.search)
        if (data.length > 1) {
          setSongInfo(data[0]);
          setRecomendedSongs(data[1]);
          if (data.length > 2) {
            setPlaylistName(data[2]);
          };
        } else {
            setSongInfo(data);
        };
      } catch {
          console.log('error');
      };
    };
    fetchSong();
  } , [location]) 
  

  function playNext () {
    recomendedSongs[0].id && 
    history.push(`/songs/${recomendedSongs[0].id}${location.search}`);
  };

  return songInfo ? (
    <div className="songPage">
      <div className="single"> 
      {  <>
        <h1 className="titleSong">{songInfo.name}</h1>
        <div className="about">
      <div>Artist: <Link to={`/artists/${songInfo.artistId}`}><button>{songInfo.Artist && songInfo.Artist.name}</button></Link><br/></div>
      <div>Album: <Link to={`/albums/${songInfo.albumId}`}><button>{songInfo.Album && songInfo.Album.name}</button></Link></div> |
    {recomendedSongs && <button onClick={playNext}>play next</button>}</div>
        <YouTube videoId={songInfo.youtubeLink} opts={opts} onEnd={playNext}/>
    <b className="created">created at {songInfo.createdAt && songInfo.createdAt.toString().slice(0, 10)}</b>
      </>}</div>
      {location.search && recomendedSongs? 
      <div className="recomended">
      {location.search.includes('album') ? <h2>More song from {songInfo.Album.name}</h2>  : null }
      {location.search.includes('artist')? <h2>More song from {songInfo.Artist.name}</h2> : null }
      {location.search.includes('playlist') ? <h2>More song from {playlistName}</h2> : null }
      {recomendedSongs.map(
          song => song && 
            <SongCard  miniCard={true} song={song} searchParam={location.search}/>
        )} 
      </div> :  null }
    </div> 
    ) : (<>{console.log(songInfo)}</>)
};
