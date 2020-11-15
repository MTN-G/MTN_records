import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

import '../App.css';

export default function Search () {

  const [filteredItems, setFilteredItems] = useState();
  const [element, setElement] = useState('all')

  const searchFunction = async (value) => {
    const { data } = await axios.get(`/search/${element}`, {
      params: {
        searchText: value
      }
    });
    setFilteredItems(data);
  };

  console.log(filteredItems)

  return (
   <div className='searchPage'>
       <input
        className="input"
        onChange={(e) => searchFunction(e.target.value)}
        type="text"
        placeholder="search your music..."
      />
      <select onChange={e => setElement(e.target.value)}>
        <option>all</option>
        <option>songs</option>
        <option>albums</option>
        <option>artists</option>
        <option>playlists</option>
      </select>
      <div style={{display: 'flex'}}>
      {filteredItems &&
          filteredItems.map((obj => 
              obj.data.length > 0 &&
              <div >
                  <h2>{obj.name}</h2>
                  <ul>
                      {
                          obj.data.map(item => 
                          <li><Link to={`/${obj.name.toLowerCase()}/${item.id}`}><button>{item.name}</button></Link></li>
                          )
                      }
                  </ul>
            
              </div>
          ))
      }</div>
  </div>  
  );
};
