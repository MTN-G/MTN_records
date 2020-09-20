import React from 'react';
import { Link } from 'react-router-dom';

export default function ArtistCard({ artist }) {
  return (
    <div className="card" id="card" key={artist.id}>
      <b>{artist.artist || artist.name}</b>
      <br />
      <img src={artist.ar_img} alt="cover" width="200" height="100" style={{ marginBottom: '43px' }} />
      <Link artistid={artist.id} to={`/artists/${artist.id}`}><button>Discover</button></Link>
    </div>
  );
}
