"use client";
import Overviews from "./list";
import { useState, useEffect } from "react";

// 샘플 데이터 (실제 데이터는 API 호출로 대체)
const sampleData = [
  { id: 1, imageUrl: "/dog.png", title: "그림1", likes: 120 },
  { id: 2, imageUrl: "/dino.png", title: "그림2", likes: 85 },
  { id: 3, imageUrl: "/frog.png", title: "그림3", likes: 200 },
  { id: 4, imageUrl: "/dog.png", title: "그림4", likes: 150 },
];

export default function GalleryPage() {
  const [drawings, setDrawings] = useState<
    { id: number; imageUrl: string; title: string; likes: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = sampleData; // 예시 데이터를 사용
      setDrawings(data);
    };

    fetchData();
  }, []);

  // 좋아요 수로 그림 정렬
  const sortedDrawings = [...drawings].sort((a, b) => b.likes - a.likes);

  return (
    <div className="w-full py-16">
      <h1 className="text-primary-main font-extrabold text-3xl text-center">
        실시간 인기 그림
      </h1>
      <Overviews drawings={sortedDrawings} />
    </div>
  );
}
