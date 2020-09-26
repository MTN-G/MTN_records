import React, { useState, useEffect, useCallback } from 'react';
import SongCard from '../cards/songCard';

export default function Songs({ fetchData, searchText }) {
  
  const fetchSongs = useCallback(fetchData, [])
  const [songsList, setSongsList] = useState([]);

  useEffect(()=>{
    fetchSongs('/songs', setSongsList)
  }, [fetchSongs]);

  return (
    <>
      <input
        className="input"
        onChange={(e) => searchText(e.target.value, '/songs', setSongsList)}
        type="text"
        placeholder="search your music..."
      />
      <div className="mainpage">

        {songsList.map(
          (song) => <SongCard song={song} />,
        )}
      </div>
    </>
  );
}
