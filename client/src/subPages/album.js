import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import SongCard from '../cards/songCard';

export default function Song() {
  const [albumInfo, setAlbumInfo] = useState([]);
  const [albumSongs, setAlbumSongs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchAlbum = async () => {
      const { data } = await axios.get(location.pathname);
      setAlbumInfo(data[0]);
      setAlbumSongs(data);
    };
    fetchAlbum();
  }, [location]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  return (

    <div id="album">
      <div className="albumPage">
        <h1 className="title">{albumInfo.album}</h1>
        {albumSongs[0] && <Link to={`/songs/${albumSongs[0].song_id}?album=${albumInfo.id}`}><button>Play</button></Link>}
        <Link to={`/artists/${albumInfo.artist_id}`}><button>{albumInfo.artist}</button></Link>
        <img alt="album" src={albumInfo.al_img} height="300" width="500" style={{marginTop: '20px', borderStyle: 'solid', borderRadius: '20px', borderColor: "black"}} />
        <br />
        <h3>{albumSongs.length}
        {' '}
        songs in this album</h3>
      </div>
      <Carousel id="songsAlbum" breakPoints={breakPoints}>
        {albumSongs.map(
          (song) => <SongCard albumSongs={albumSongs} song={song} type="album" typeId={albumInfo.id} />,
        )}
      </Carousel>
    </div>
  );
}
