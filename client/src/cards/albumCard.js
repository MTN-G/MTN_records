import React from 'react';
import { Link } from 'react-router-dom';

export default function AlbumCard({ album }) {
  return (
    <div className="card" id="card" key={album.id}>
      <b className="title">{album.album || album.name}</b>
      <br />
      <img src={album.al_img} alt="cover" width="200" height="100" style={{ marginBottom: '43px' }} />
      {album.artist
        && (
        <div>
          {' '}
          by:
          <Link to={`/artists/${album.artist_id}`}><button>{album.artist}</button></Link>
        </div>
        )}
      {window.location.pathname !== `/albums/${album.id}`
        && <Link albumid={album.id} to={`/albums/${album.id}`}><button>Discover Album</button></Link>}
    </div>
  );
}
