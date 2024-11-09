interface LangLat {
  lat: number;
  lng: number;
}

export function computeCenterOfGravity(points: LangLat[]): LangLat {

// Convert degrees to radians
function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

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