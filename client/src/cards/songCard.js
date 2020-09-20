import React from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

export default function SongCard({
  song, type, typeId, miniCard,
}) {
  let url = `/songs/${song.id}`;

  if (type && typeId) {
    url = `/songs/${song.id}?${type}=${typeId}`;
  }
  console.log(url);

  const opts = {
    height: '100',
    width: '200',
  };

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
      <b className="title">{song.name || song.song}</b>
      <br />
      <YouTube videoId={song.youtube_link} opts={opts} />
      <div className="about">
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
