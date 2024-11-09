"use client";
import React, { useState } from "react";

export default function LocationPage() {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState("");

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position fetched:", position);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError("");
        },
        (error) => {
          setError("위치 정보를 가져올 수 없습니다. 권한을 허용해 주세요.");
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      setError("이 브라우저는 GPS를 지원하지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">현재 위치</h1>
      <button
        onClick={getLocation}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
      >
        위치 가져오기
      </button>

      {location.latitude !== null && location.longitude !== null ? (
        <div>
          <p>위도: {location.latitude}</p>
          <p>경도: {location.longitude}</p>
        </div>
      ) : (
        <p>위치 정보를 가져오려면 버튼을 클릭하세요.</p>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
