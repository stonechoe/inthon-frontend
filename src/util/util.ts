import { Coord } from "@/app/types/common";

interface LangLat {
  lat: number;
  lng: number;
}

// Convert degrees to radians
function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

export function computeCenterOfGravity(points: LangLat[]): LangLat {


// Convert radians to degrees
function toDegrees(rad : number) {
  return (rad * 180) / Math.PI;
}

// Convert lat/lng to Cartesian coordinates
function toCartesian(lat: number, lng: number) {
  const latRad = toRadians(lat);
  const lngRad = toRadians(lng);
  return {
    x: Math.cos(latRad) * Math.cos(lngRad),
    y: Math.cos(latRad) * Math.sin(lngRad),
    z: Math.sin(latRad),
  };
}

// Compute the average Cartesian coordinates
let avgX = 0, avgY = 0, avgZ = 0;
points.forEach(coord => {
  const { x, y, z } = toCartesian(coord.lat, coord.lng);
  avgX += x;
  avgY += y;
  avgZ += z;
});

const total = points.length;
avgX /= total;
avgY /= total;
avgZ /= total;

// Convert the average Cartesian coordinates back to lat/lng
const hyp = Math.sqrt(avgX * avgX + avgY * avgY);
const avgLat = toDegrees(Math.atan2(avgZ, hyp));
  const avgLng = toDegrees(Math.atan2(avgY, avgX));
  return { lat: avgLat, lng: avgLng };
}

export function meterDistance(c1: Coord, c2: Coord) {
  const R = 6371e3; // metres
  const φ1 = toRadians(c1.lat);
  const φ2 = toRadians(c2.lat);
  const Δφ = toRadians(c2.lat - c1.lat);
  const Δλ = toRadians(c2.lng - c1.lng);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function computeBounds(points: LangLat[]) {
  
  const minLat = Math.min(...points.map(p => p.lat));
  const maxLat = Math.max(...points.map(p => p.lat));
  const minLng = Math.min(...points.map(p => p.lng));
  const maxLng = Math.max(...points.map(p => p.lng));
  return {
    // ne: { lat: maxLat, lng: maxLng },
    // sw: { lat: minLat, lng: minLng },
    east: maxLng,
    south: minLat,
    north: maxLat,
    west: minLng
  };
}