"use client";

import React from 'react';
import { computeCenterOfGravity } from '@/util/util';
import { AdvancedMarker, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

import { PathSet } from '@/app/types/common';
import MyPageIcon from 'public/icons/mypage.svg'

export default function MyMap({ ps } : { ps : PathSet[] }) {
  const map = useMap();
  const maps = useMapsLibrary("maps");

    if (!maps) {
      return null;
    }
  
  const totalCoords = ps.flatMap(p => p.coords);
  
  for (const p of ps) {

    const flightPath = new maps.Polyline({
      path: p.coords,
      geodesic: true,
      strokeColor: p.color,
      strokeOpacity: 1.0,
      strokeWeight: 1,
    });

    flightPath.setMap(map);
  }

  const firstCoord = totalCoords[0];
  const lastCoord = totalCoords[totalCoords.length - 1];

  return (<div className='h-full w-full relative'>
    <Map
      defaultZoom={20}
      center={lastCoord}
      disableDefaultUI
      mapId="DEMO_MAP_ID"
      //  Map ID is required for advanced markers. 
    >
      <AdvancedMarker position={firstCoord}>
      <div className='bg-white rounded-xl aspect-square text-black p-2 flex flex-col shadow-xl items-center border-black'>
          <h1>
            <div className='text-[24px]'>🦶</div>
            <span>시작</span>
          </h1>
        </div>
      </AdvancedMarker>
      <AdvancedMarker position={lastCoord}>
        <div className='bg-white rounded-xl aspect-square text-black p-2 flex flex-col shadow-xl items-center border-black'>
          <MyPageIcon />
          <span>내 위치</span>
        </div>
      </AdvancedMarker>
    </Map>
    </div>
  );
}
