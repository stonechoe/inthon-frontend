'use client';

import { useEffect, useState } from "react";
import MyMap from "./map";

export default function MyMapPage() {

  const [coords, setCoords] = useState([
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ]);

  function appendCoords() {
    setCoords((prev) => {
      const newCoords = [...prev];
      const lastCoord = newCoords[newCoords.length - 1];
      newCoords.push({ lat: lastCoord.lat, lng: lastCoord.lng + 1 });
      return newCoords;
    });
  }

  useEffect(() => { setInterval(appendCoords, 100); }, []);

  return <MyMap coords={coords} />;
}