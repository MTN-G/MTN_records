import React from 'react';
import { Link } from 'react-router-dom';

export default function SongCard({
  song, type, typeId, miniCard
}) {
  let url = `/songs/${ song.song_id || song.id}`;

  if (type && typeId) {
    url = `/songs/${song.song_id || song.id}?${type}=${typeId}`;
  }

  if (miniCard) {
    return (
      <>
        <div key={song.id} className="miniCard">
          <b>{song.name}</b>
          <Link to={url}><button style={{ width: '50px', float: 'right' }}>Play Song</button></Link>
        </div>
        <hr />
      </>
    );
  }

  return (

    <div key={song.id} className="card">
      <h2 className="title">{song.name || song.song}</h2>
      <br />
      <img alt="youtube" src={`https://img.youtube.com/vi/${song.youtubeLink}/0.jpg`} height="100" width="200" style={{borderStyle: "solid"}}/>
      <div className="abouthome">
        {song.artist && (
          <div>
            {' '}
            by:
            <Link to={`/artists/${song.artist_id}`}><button>{song.artist}</button></Link>
            <br />
          </div>
        )}
        {song.album && (
          <div>
            from:
            <Link to={`/albums/${song.album_id}`}><button>{song.album}</button></Link>
          </div>
        )}
      </div>
      <br />
      <Link to={url}><button>Go To Song Page</button></Link>
    </div>
  );
}
