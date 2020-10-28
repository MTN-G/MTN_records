import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import SongCard from '../cards/songCard.js';
import ArtistCard from '../cards/artistCard.js';
import AlbumCard from '../cards/albumCard.js';
import PlaylistCard from '../cards/playlistCard.js';

export default function HomePage () {
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topPlaylists, setTopPlaylists] = useState([]);

  const importSongs = async () => {
    const { data } = await axios.get('/songs');
    setTopSongs(data);
  };

  const importArtists = async () => {
    const { data } = await axios.get('/artists');
    setTopArtists(data);
  };

  const importAlbums = async () => {
    const { data } = await axios.get('/albums');
    setTopAlbums(data);
  };

  const importPlaylists = async () => {
    const { data } = await axios.get('/playlists');
    setTopPlaylists(data);
  };

  useEffect(() => {
    importSongs();
    importArtists();
    importAlbums();
    importPlaylists();
  }, []);

  

  return (
    <div className="gridhome">
      <div className="quarter">
        <h2>Top 20 Song</h2>
        <Carousel>
          {topSongs.map(
            (song) => <SongCard song={song} />,
          )}
        </Carousel>
      </div>
      <div className="quarter">
        <h2>Top 20 Artists</h2>
        <Carousel>
          {topArtists.map(
            (artist) => <ArtistCard artist={artist} />,
          )}
        </Carousel>
      </div>
      <div className="quarter">
        <h2>Top 20 Albums</h2>
        <Carousel>
          {topAlbums.map(
            (album) => <AlbumCard album={album} />,
          )}
        </Carousel>
      </div>
      <div className="quarter">
        <h2>Top 20 Playlists</h2>
        <Carousel>
          {topPlaylists.map(
            (playlist) => <PlaylistCard playlist={playlist} />,
          )}
        </Carousel>
      </div>
    </div>
  );
}
