import React from 'react';
import { Link } from 'react-router-dom';

export default function PlaylistCard({ playlist }) {
  return (
    <div className="card" id="card" key={playlist.id}>
      <b>{playlist.playlist || playlist.name}</b>
      <br />
      <img src={playlist.pl_img} alt="cover" width="200" height="100" style={{ marginBottom: '43px' }} />
      {window.location.pathname !== `/playlists/${playlist.id}`
        && <Link to={`/playlists/${playlist.id}`}><button>Discover Playlist</button></Link>}
    </div>
  );
}
