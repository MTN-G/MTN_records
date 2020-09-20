import React, { useEffect, useRef, useState } from 'react';
import { useRouteMatch, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import SongCard from '../cards/songCard';

export default function Song() {
  const nextEl = useRef(null);
  const [songInfo, setSongInfo] = useState({ created_at: '0000-00-00' });
  const [recomendedSongs, setRecomendedSongs] = useState([{ playlist: null }]);

  const match = useRouteMatch('/songs/:id');
  const location = useLocation();

  const fetchSong = async () => {
    try {
      const { data } = await axios.get(match.url + location.search);
      setSongInfo(data[0]);
      data[1] ? setRecomendedSongs(data[1]) : setRecomendedSongs([{ playlist: null }]);
      console.log(data);
    } catch {
      console.log('error');
    }
  };

  const type = location.search.slice(1, location.search.length - 2);

  const opts = {
    height: '400',
    width: '500',
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    fetchSong();
  }, [location]);

  return (
    <div className="subpage">
      <div className="single">
        <b className="title">{songInfo.name || songInfo.song}</b>
        <div className="about">
          <div>
            {' '}
            Artist:
            <Link to={`/artists/${songInfo.artist_id}`}><button>{songInfo.artist}</button></Link>
            <br />
          </div>
          <div>
            Album:
            <Link to={`/albums/${songInfo.album_id}`}><button>{songInfo.album}</button></Link>
          </div>
          {songInfo.length}
        </div>
        <YouTube videoId={songInfo.youtube_link} opts={opts} />
        <div>
          created at
          {songInfo.created_at.toString().slice(0, 10)}
        </div>
        <div>{songInfo.lyrics}</div>
      </div>
      {location.search
        ? (
          <div className="recomended">
            {type === 'album' ? (
              <p>
                More song from
                {songInfo.album}
              </p>
            ) : null }
            {type === 'artist' ? (
              <p>
                More song from
                {songInfo.artist}
              </p>
            ) : null }
            {type === 'playlist' ? (
              <p>
                More song from
                {recomendedSongs[0].playlist}
              </p>
            ) : null }
            {recomendedSongs.map(
              (song) => (
                <SongCard
                  ref={nextEl}
                  miniCard
                  song={song}
                  type={type}
                  typeId={
              type === 'album' ? song.album_id : type === 'artist' ? song.artist_id : type === 'playlist' ? song.pl_id : null
             }
                />
              ),
            )}
          </div>
        ) : null }
    </div>
  );
}
