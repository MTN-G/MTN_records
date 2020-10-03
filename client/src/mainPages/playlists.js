import React, { useState, useEffect, useCallback } from 'react';
import PlaylistCard from '../cards/playlistCard';

export default function Playlists({ fetchData, searchText }) {
  const [plList, setPlList] = useState([]);
  const fetchPlaylist = useCallback(fetchData)

  useEffect(() => {
    fetchPlaylist('/playlists', setPlList);
  }, [fetchPlaylist]);

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
