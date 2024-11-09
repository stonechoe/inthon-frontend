"use client";

import React, { useEffect } from 'react';
import { AdvancedMarker, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

import { Coord } from '@/app/types/common';

interface Props {
  initialCoord: Coord;
  coords: Coord[];
  setCoords: React.Dispatch<React.SetStateAction<Coord[]>>;
}

export default function PathCreateMap({ initialCoord, coords, setCoords } : Props) {
  const map = useMap();
  const maps = useMapsLibrary("maps");


  useEffect(() => { 


    if (!maps) {
      return;
    }

    const flightPath = new maps.Polyline({
      path: coords,
      geodesic: true,
      strokeColor: '#244800',
      strokeOpacity: 1.0,
      strokeWeight: 1,
    });
    flightPath.setMap(map);


  }, [maps, coords, map]);

  return (<div className='h-full w-full relative'>
    <Map
      defaultZoom={20}
      defaultCenter={initialCoord}
      disableDefaultUI
      mapId="DEMO_MAP_ID"
      //  Map ID is required for advanced markers. 
      onClick={(e) => setCoords(((coords: Coord[]) => { 
        // alert('hi')
        const newCoods = [...coords];
        if (e.detail.latLng) {
          newCoods.push(e.detail.latLng);
        }
        e.stop();

        if (!maps) {
          return newCoods;
        }

        const newFlightPath = new maps.Polyline({
          path: newCoods.slice(-2),
          geodesic: true,
          strokeColor: '#244800',
          strokeOpacity: 1.0,
          strokeWeight: 1,
        });
        newFlightPath.setMap(map);

        return newCoods;
      }))}
    >
      {coords.map((coord, index) => (
        <AdvancedMarker key={index} position={coord}>
          <div className='p-2 flex flex-col items-center border-black'>
            <h1>
              <div className='text-[24px]'>🦶</div>
            </h1>
          </div>
        </AdvancedMarker>))}
    </Map>
    </div>
  );
}
