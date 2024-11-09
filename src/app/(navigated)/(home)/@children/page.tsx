'use client';

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

export default function HomePage() {
  const { data, error } = useQuery<CardProps[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <div className="w-full px-4 pt-16">
      <h1 className="text-3xl font-extrabold">오늘의<br />추천 코스</h1>
      <div className="px-16 pb-8 pt-8 flex items-center justify-center ">
        {error && <div>에러가 발생했습니다</div>}
        {
          data?.map((card, index) => (
            <Card
              key={index}
              imagePath={card.imagePath}
              title={card.title}
              description={card.description}
            />))
      }
      </div>
      <Link href="/login" className="text-blue-500">
        로그인 페이지로 이동
      </Link>
      <Link href="/drawing">드로잉?? 달리기시작</Link>
    </div>
  );
}