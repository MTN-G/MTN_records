import React, { useState, useEffect, useCallback } from 'react';
import AlbumCard from '../cards/albumCard';

export default function Albums({fetchData, searchText}) {

  const [albumsList, setAlbumsList] = useState([])
  const fetchAlbums = useCallback(fetchData)

  useEffect(()=>{
    fetchAlbums('/albums', setAlbumsList)
  },[fetchAlbums])

    return (<><input className="input"
       onChange={e =>  searchText(e.target.value, '/albums', setAlbumsList) }
       type="text" placeholder={`search your music...`}>
         </input>
      <div className="mainpage">
      
      {albumsList.map(
            album => <AlbumCard album={album}/>
          )}
      </div></>
    );
  };