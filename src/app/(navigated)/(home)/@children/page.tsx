// HomePage.tsx
"use client";
import Link from "next/link";
import Card from "@/components/Card";
import { useQuery } from "@tanstack/react-query";

async function getTodos() {
  const response = await fetch("/api/paths");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

interface CardProps {
  id: number;
  imagePath: string;
  title: string;
  description: string;
  likes: number;
}

export default function HomePage() {
  const { data, error } = useQuery<CardProps[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // 클릭 시 abstract 페이지로 이동
  const handleGalleryClick = (card: CardProps) => {
    const { id, imagePath, title, likes, description } = card;

    window.location.href = `/abstract?id=${id}&imageUrl=${imagePath}&title=${encodeURIComponent(
      title
    )}&likes=${likes}&description=${encodeURIComponent(description)}`;
  };

  return (
    <div className="w-full px-8 mt-8">
      <h1 className="text-3xl font-extrabold">오늘의 추천 코스</h1>
      <div className="px-16 pb-8 pt-8 flex items-center justify-center">
        {data?.map((card, idx) => (
          <Card
            key={idx}
            imagePath={card.imagePath}
            title={card.title}
            description={card.description}
            onClick={() => handleGalleryClick(card)}
          />
        ))}
      </div>
    </div>
  );
}
