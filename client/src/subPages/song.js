import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory} from "react-router-dom";
import axios from 'axios';
import SongCard from "../cards/songCard";
import YouTube from 'react-youtube'

export default function Song () {
  const [songInfo, setSongInfo] = useState({created_at: '0000-00-00'})
  const [recomendedSongs, setRecomendedSongs] = useState([{playlist: null}])
  const history = useHistory();
  const location = useLocation();

 

  const type =
   location.search.slice(1, location.search.length - 2)

  const opts = {
    height: '250',
    width: '500',
    playerVars: {
      autoplay: 1,
    },
  }

  useEffect(()=>{
    const fetchSong = async () => {
    try {
    const { data } = await axios.get(location.pathname + location.search)
    setSongInfo(data[0])
    data[1] ? setRecomendedSongs(data[1].concat(data[2])) : setRecomendedSongs([{playlist: null}])
  } catch {
    console.log('error')
  }
  };
    fetchSong()
  },[location]) 
  

  function playNext () {
    recomendedSongs[0].id && 
    history.push(`/songs/${recomendedSongs[0].id}${location.search}`)
  }

  return (
  <div className="songPage">
    <div className="single">
      <h1 className="titleSong">{songInfo.name || songInfo.song}</h1>
      <div className="about">
     
     <div> Artist: <Link to={`/artists/${songInfo.artist_id}`}><button>{songInfo.artist}</button></Link><br/></div>
     <div>Album: <Link to={`/albums/${songInfo.album_id}`}><button>{songInfo.album}</button></Link></div> |
     <button onClick={playNext}>play next</button></div>
      <YouTube videoId={songInfo.youtubeLink} opts={opts} onEnd={playNext}/>
  <b className="created">created at {songInfo.created_at.toString().slice(0, 10)}</b>
    </div>
    {location.search ? 
    <div className="recomended">
     {type === 'album' ? <h2>More song from {songInfo.album}</h2>  : null }
     {type === 'artist' ? <h2>More song from {songInfo.artist}</h2> : null }
     {type === 'playlist' ? <h2>More song from {recomendedSongs[0].playlist}</h2> : null }
     {recomendedSongs.map(
        song => song && 
          <SongCard  miniCard={true} song={song} type={type} 
             typeId={
              type === 'album' ?  song.album_id : type === 'artist' ? song.artist_id : type === 'playlist' ?  song.pl_id : null
             }/>
      )} 
    </div> :  null }
  </div>
    )
}
