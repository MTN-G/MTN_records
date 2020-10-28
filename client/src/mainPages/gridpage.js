import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import ArtistCard from '../cards/artistCard';
import PlaylistCard from '../cards/playlistCard';
import SongCard from '../cards/songCard';
import AlbumCard from '../cards/albumCard'

export default function GridPage () {
  const [list, setList] = useState([]);
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(location.pathname);
      setList(data)
    };
    fetchData()
  }, [location]);
  
  const searchText = async (value) => {
    const { data } = await axios.get(`${location.pathname}?searchText=${value}`);
    setList(data);
};

  return (
    <div className='gridpage'>
      <input
        className="input"
        onChange={(e) => searchText(e.target.value)}
        type="text"
        placeholder="search your music..."
      />
      <div className="mainpage">
        {list.map(
          piece => {
            switch (location.pathname) {
              case '/artists' : 
                return <ArtistCard artist={piece} />
              case '/albums' :
                return <AlbumCard album={piece} />
              case '/playlists' :
                return <PlaylistCard playlist={piece} />
              case '/songs' :
                return <SongCard song={piece} />
              default: 
                return null
          }      
        })}
      </div>
    </div>
  );
}
