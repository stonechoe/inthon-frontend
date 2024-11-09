"use client";

import React from 'react';
import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

export default function MyMap() {
  const map = useMap();
  const maps = useMapsLibrary("maps");
  const position = { lat: 0, lng: -164 };

  const flightPlanCoordinates = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ];

  if (!maps) {
    return null;
  }

  const flightPath = new maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);

  return (
    <Map
      defaultZoom={3}
      // zoom={}
      defaultCenter={position}
      // center={}
      // gestureHandling={'greedy'}
      disableDefaultUI
    />
  );
}
