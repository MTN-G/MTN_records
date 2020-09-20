import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArtistCard from '../cards/artistCard';

export default function Artists({ fetchData, searchText }) {
  const [artistsList, setArtistsList] = useState([]);

  useEffect(() => {
    fetchData('/artists', setArtistsList);
  }, []);

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
