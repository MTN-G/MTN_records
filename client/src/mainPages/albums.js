import React, { useState, useEffect } from 'react';
import AlbumCard from '../cards/albumCard';

export default function Albums({fetchData, searchText}) {

  const [albumsList, setAlbumsList] = useState([])

  useEffect(()=>{
    fetchData('/api/albums', setAlbumsList)
  },[])

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