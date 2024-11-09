"use client";

import React from 'react';
import { computeCenterOfGravity } from '@/util/util';
import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

interface Coord {
  lat: number;
  lng: number;
}

export default function MyMap({ coords } : { coords : Coord[]}) {
  const map = useMap();
  const maps = useMapsLibrary("maps");

    if (!maps) {
      return null;
    }

    const flightPath = new maps.Polyline({
      path: coords,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 1,
    });

  flightPath.setMap(map);

  return (
    <Map
      defaultZoom={3}
      // zoom={}
      center={computeCenterOfGravity(coords)}
      // center={}
      // defaultCenter={}
      gestureHandling={'auto'}
      disableDefaultUI
    />
  );
}
