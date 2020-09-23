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
    const { data } = await axios.get('/api/songs');
    setTopSongs(data);
  };

  const importArtists = async () => {
    const { data } = await axios.get('/api/artists');
    setTopArtists(data);
  };

  const importAlbums = async () => {
    const { data } = await axios.get('/api/albums');
    setTopAlbums(data);
  };

  const importPlaylists = async () => {
    const { data } = await axios.get('/api/playlists');
    setTopPlaylists(data);
  };

  useEffect(() => {
    importSongs();
    importArtists();
    importAlbums();
    // importPlaylists();
  }, []);

  

  return (
    <div className="grid">
      <div className="quarter">
        <h2>Top 20 Song</h2>
        <Carousel>
          {topSongs.map(
            (song) => <SongCard song={song} />,
          )}
        </Carousel>
        <hr />
      </div>
      <div className="quarter">
        <h2>Top 20 Artists</h2>
        <Carousel>
          {topArtists.map(
            (artist) => <ArtistCard artist={artist} />,
          )}
        </Carousel>
        <hr />
      </div>
      <div className="quarter">
        <h2>Top 20 Albums</h2>
        <Carousel>
          {topAlbums.map(
            (album) => <AlbumCard album={album} />,
          )}
        </Carousel>
        <hr />
      </div>
      <div className="quarter">
        <h2>Top 20 Playlists</h2>
        <Carousel>
          {topPlaylists.map(
            (playlist) => <PlaylistCard playlist={playlist} />,
          )}
        </Carousel>
        <hr />
      </div>
    </div>
  );
}
