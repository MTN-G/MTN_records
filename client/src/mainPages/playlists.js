import React, { useState, useEffect } from 'react';
import PlaylistCard from '../cards/playlistCard';

export default function Playlists({ fetchData, searchText }) {
  const [plList, setPlList] = useState([]);

  useEffect(() => {
    fetchData('/playlists', setPlList);
    console.log(plList);
  }, []);

  return (
    <>
      <input
        className="input"
        onChange={(e) => searchText(e.target.value, '/playlists', setPlList)}
        type="text"
        placeholder="search your music..."
      />
      <div className="mainpage">

        {plList.map(
          (playlist) => <PlaylistCard playlist={playlist} />,
        )}
      </div>
    </>
  );
}
