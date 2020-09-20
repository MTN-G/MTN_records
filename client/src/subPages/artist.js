import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';
import SongCard from '../cards/songCard.js';
import AlbumCard from '../cards/albumCard.js';

export default function Artist() {
  const [artistInfo, setArtistInfo] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistSongs, setArtistSongs] = useState([]);
  const match = useRouteMatch('/artists/:id');

  const fetchArtist = async () => {
    const { data } = await axios.get(match.url);
    setArtistInfo(data[0]);
    setArtistAlbums(data);
    console.log(data);
  };

  const fetchArtistSongs = async () => {
    const { data } = await axios.get(`${match.url}/songs`);
    setArtistSongs(data);
  };

  useEffect(() => {
    fetchArtist();
    fetchArtistSongs();
    console.log(artistSongs);
  }, []);

  return (
    <div id="artist">
      <div className="artistpage">
        <h2>{artistInfo.artist}</h2>
        <img src={artistInfo.ar_img} alt="cover" width="500" height="300" style={{ marginBottom: '43px' }} />
      </div>
      <div className="carusels">
        <Carousel>
          {artistAlbums.map(
            (album) => <AlbumCard album={album} />,
          )}
        </Carousel>
        <Carousel>
          {artistSongs.map(
            (song) => <SongCard style={{ height: '150px' }} song={song} type="artist" typeId={artistInfo.id} />,
          )}
        </Carousel>
      </div>

    </div>

  );
}
