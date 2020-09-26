import React, { useState, useEffect, useCallback } from 'react';
import ArtistCard from '../cards/artistCard';

export default function Artists({ fetchData, searchText }) {

  const fetchArtists = useCallback(fetchData, [])
  const [artistsList, setArtistsList] = useState([]);

  useEffect(() => {
    fetchArtists('/artists', setArtistsList);
  }, [fetchArtists]);

  return (
    <>
      <input
        className="input"
        onChange={(e) => searchText(e.target.value, '/artists', setArtistsList)}
        type="text"
        placeholder="search your music..."
      />
      <div className="mainpage">

        {artistsList.map(
          (artist) => <ArtistCard artist={artist} />,
        )}
      </div>
    </>
  );
}
