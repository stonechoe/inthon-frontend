"use client";

import React, { use } from 'react';
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
  
  function undefinedIfContainsNaN(coord: Coord | undefined): Coord | undefined {
    if (coord === undefined) return undefined;
    return ((isNaN(coord.lat) || isNaN(coord.lng)) ? undefined : coord) || undefined;
  }

  function undefinedIfContainsNaNDirection(coord: {
    west: number
    east: number
    north: number
    south: number
  }): any {
    const isundef = isNaN(coord.west) ||
    isNaN(coord.east) ||
    isNaN(coord.north) ||
    isNaN(coord.south);
    return isundef ? undefined : coord;
  }

  return (<div className='h-full w-full relative'>
    <Map
      defaultBounds={useCenter ?  undefined: undefinedIfContainsNaNDirection(computeBounds(totalCoords)) }
      defaultCenter={useCenter ? undefinedIfContainsNaN(lastCoord) : undefined}
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
