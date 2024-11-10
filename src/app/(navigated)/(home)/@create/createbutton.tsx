"use client";

import React from 'react';
import { Map } from '@vis.gl/react-google-maps';

export default function CreateMapButton() {

  return (<div className='relative flex flex-col w-fit h-fit'>
    <Map
      
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapId="DEMO_MAP_ID_WRITE_YOUR_OWN"
      //  Map ID is required for advanced markers. 
    />
    </div>
  );
}
