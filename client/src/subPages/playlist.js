import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
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

  return (
    <div id="album">
      <div className="albumPage">
        <h2>{playlistInfo.playlist}</h2>
        <img src={playlistInfo.pl_img} height="300" width="500" />
        <br />
        {playlistSongs.length}
        {' '}
        songs in this playlist
      </div>
      <Carousel>
        {playlistSongs.map(
          (song) => <SongCard song={song} type="playlist" typeId={playlistInfo.id} />,
        )}
      </Carousel>
    </div>
  );
}
