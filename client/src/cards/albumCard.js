import React from 'react';
import { Link } from 'react-router-dom';

export default function AlbumCard({ album }) {
  return (
    <div className="card" id="card" key={album.id}>
      <h2 className="title">{album.album || album.name}</h2>
      <br />
      <img src={album.al_img} alt="cover" width="200" height="100" style={{ marginBottom: '43px' , borderStyle: "solid"}} />
      {album.artist
        && (
        <div>
          {' '}
          by:
          <Link to={`/artists/${album.artist_id}`}><button>{album.artist}</button></Link>
        </div>
        )}
      {window.location.pathname !== `/albums/${album.id}`
        && <Link albumid={album.al_id || album.id} to={`/albums/${album.al_id || album.id}`}><button>Discover Album</button></Link>}
    </div>
  );
}
