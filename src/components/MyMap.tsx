"use client";

import React from 'react';
import { AdvancedMarker, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

import { Coord, PathSet } from '@/app/types/common';
import MyPageIcon from 'public/icons/mypage.svg'
import { computeBounds, computeCenterOfGravity } from '@/util/util';

interface Props {
  mapelementid: string;
  ps: PathSet[]
  useCenter?: boolean;
 };

export default function MyMap({ ps, useCenter, mapelementid } : Props) {
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
        strokeWeight: 10,
      });

      flightPath.setMap(map);
  
  }
  
  const firstCoord = totalCoords.length > 0 ? totalCoords[0] : undefined;
  const lastCoord = totalCoords.length > 0 ? totalCoords[totalCoords.length - 1] : undefined;
  
  let bounds = undefined
  let center : undefined | Coord = undefined;
  if (useCenter){
    bounds = computeBounds(totalCoords);
    center = computeCenterOfGravity(totalCoords);

    if (isNaN(bounds.south) || isNaN(bounds.west) || isNaN(bounds.north) || isNaN(bounds.east) || isNaN(center.lat) || isNaN(center.lng)) { 
      bounds = undefined;
      center = undefined;
    }

  } else {
    center = lastCoord;
  }

  

  return (<div className='h-full w-full relative'>
    <Map
      defaultBounds={bounds}
      defaultCenter={center}
      disableDefaultUI
      mapId={mapelementid}
      //  Map ID is required for advanced markers. 
    >
      {firstCoord && <AdvancedMarker position={firstCoord}>
      <div className='bg-white rounded-xl aspect-square text-black p-2 flex flex-col shadow-xl items-center border-black'>
          <h1>
            <div className='text-[24px]'>🦶</div>
            <span>시작</span>
          </h1>
        </div>
      </AdvancedMarker>}
      {lastCoord && <AdvancedMarker position={lastCoord}>
        <div className='bg-white rounded-xl aspect-square text-black p-2 flex flex-col shadow-xl items-center border-black'>
          <MyPageIcon />
          <span>마지막</span>
        </div>
      </AdvancedMarker>}
    </Map>
    </div>
  );
}
