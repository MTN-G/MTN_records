import React from 'react';
import {consts} from 'react-elastic-carousel';

export function myArrow({type, onClick, isEdge, style} ) {
    const pointer = type === consts.PREV ? '<' : '>'
    return (
      <button style={{padding: '3px', height: '50px', marginTop: "80px", justifyContent: 'center', fontSize: '25px'}} onClick={onClick} disabled={isEdge}>
        <b>{pointer}</b>
      </button>
    )
  }