import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import SongCard from '../cards/songCard';

export default function Playlist() {
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);

  const match = useRouteMatch('/playlists/:id');

  const fetchPlaylist = async () => {
    const { data } = await axios.get(match.url);
    setPlaylistInfo(data[0]);
    setPlaylistSongs(data);
    console.log(data);
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  return (
    <div id="album">
      <div className="albumPage">
        <h1 className="title">{playlistInfo.playlist}</h1>
        {playlistSongs[0] && <Link to={`/songs/${playlistSongs[0].id}?playlist=${playlistInfo.id}`}><button>Play</button></Link>}
        <img src={playlistInfo.pl_img} height="300" width="500" style={{marginTop: '20px', borderStyle: 'solid', borderRadius: '20px', borderColor: "black"}}/>
        <br /><h3>
        {playlistSongs.length}
        {' '}
        songs in this playlist</h3>
      </div>
      <Carousel breakPoints={breakPoints}>
        {playlistSongs.map(
          (song) => <SongCard song={song} type="playlist" typeId={playlistInfo.id} />,
        )}
      </Carousel>
    </div>
  );
}
