
// import { locationInterval } from "@/util/geo";
'use client';

import { Coord } from "@/app/types/common";

export function locationInterval(callback: (coord: Coord) => void) {
  const wrapperCallback = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          callback({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return setInterval(wrapperCallback, 1000);
}

export default function TestPage() {
  const interval = locationInterval((c) => alert(JSON.stringify(c)));
  return <div>TestPage
    <button onClick={() => navigator.geolocation.getCurrentPosition((pos) => alert(pos.coords.latitude))}>asdf</button>
  </div>;
}