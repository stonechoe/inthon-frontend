'use client';

import { useCallback, useEffect, useState } from "react";
import MyMap from "@/components/MyMap";
import { Coord } from "@/app/types/common";


export default function CurrentPosPage({initialCoord}: {initialCoord: Coord}) {

  const [coords, setCoords] = useState([
    initialCoord,
    { lat: initialCoord.lat - 1, lng: initialCoord.lng +1},
  ]);

  const appendCoords = useCallback(function appendCoords(pos: GeolocationPosition) {
    setCoords((prev) => {
      const newCoords = [...prev];
      newCoords.push({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      return newCoords;
    });
  }, []);

  useEffect(() => { navigator.geolocation.watchPosition(appendCoords) }, [appendCoords]);
  return <MyMap ps={[{coords, color: '#FF0000'}]} />;
}