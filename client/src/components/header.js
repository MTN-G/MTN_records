import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <div className="links">
        <Link to="/songs"><button>songs</button></Link>
        <Link to="/artists"><button>artists</button></Link>
        <Link to="/albums"><button>albums</button></Link>
        <Link to="/playlists"><button>playlists</button></Link>
      </div>

      <div className="text">
        <h1 className="line">MTN records </h1>
        <h4 className="line">Hear Whatever You Wanna Listen To... </h4>
      </div>
      <div className="links">
        <Link to="/"><button>Home</button></Link>
      </div>
    </div>
  );
}
