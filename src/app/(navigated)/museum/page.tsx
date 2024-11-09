"use client";
import Overviews from "./list";
import { useState, useEffect } from "react";

// 샘플 데이터 (실제 데이터는 API 호출로 대체)
const sampleData = [
  {
    id: 1,
    imageUrl: "/dog.png",
    title: "초원의 자유로운 친구",
    likes: 122,
    description:
      "푸른 초원 위를 자유롭게 달리는 강아지의 모습이 자연과 조화를 이룬 장면입니다.",
  },
  {
    id: 2,
    imageUrl: "/dino.png",
    title: "공룡의 위엄",
    likes: 87,
    description:
      "초원의 한가운데에 서 있는 공룡의 장엄한 모습이 고대의 웅장함을 떠올리게 합니다.",
  },
  {
    id: 3,
    imageUrl: "/frog.png",
    title: "연못의 작은 철학자",
    likes: 203,
    description:
      "연못가에 앉아있는 개구리의 유쾌한 표정이 평화로운 자연의 한 순간을 포착하고 있습니다.",
  },
  {
    id: 4,
    imageUrl: "/dog.png",
    title: "햇살 아래의 행복",
    likes: 150,
    description:
      "잔디밭에서 기쁨을 만끽하는 강아지의 모습이 따스한 햇살과 어우러진 장면입니다.",
  },
];

export default function GalleryPage() {
  const [drawings, setDrawings] = useState<
    {
      id: number;
      imageUrl: string;
      title: string;
      likes: number;
      description: string;
    }[]
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
    <div className="w-full m-px">
      <h1 className="font-extrabold text-3xl text-center">오늘의 명화들:</h1>
      <Overviews drawings={sortedDrawings} />
    </div>
  );
}
