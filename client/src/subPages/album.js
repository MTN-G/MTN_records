import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import SongCard from '../cards/songCard';

export default function Album() {
  const [albumInfo, setAlbumInfo] = useState({Artist: {}, Songs: []});

  const location = useLocation();

  useEffect(() => {
    const fetchAlbum = async () => {
        const { data } = await axios.get('/api' + location.pathname);
        setAlbumInfo(data);
        console.log(data); 
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
        <h1 className="title">{albumInfo.name}</h1>
        <Link to={`/artists/${albumInfo.artistId}`}><button>{albumInfo.Artist.name}</button></Link>
        <img alt="al" src={albumInfo.coverImg} height="300" width="500" style={{marginTop: '20px', borderStyle: 'solid', borderRadius: '20px', borderColor: "black"}} />
        <br />
        <h3>{albumInfo.Songs.length}
        {' '}
        songs in this album</h3>
      </div>
      <Carousel id="songsAlbum" breakPoints={breakPoints}>
        {albumInfo.Songs.map(
          (song) => <SongCard albumSongs={albumInfo.Songs} song={song} type="album" typeId={albumInfo.id} />,
        )}
      </Carousel>
    </div>
  );
}
