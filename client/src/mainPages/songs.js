import React, { useState, useEffect } from 'react';
import SongCard from '../cards/songCard';

export default function Songs({ fetchData, searchText }) {
  const [songsList, setSongsList] = useState([]);

  useEffect(() => {
    fetchData('/api/songs', setSongsList);
  }, []);

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
