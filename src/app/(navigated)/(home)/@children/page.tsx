// HomePage.tsx
"use client";

import PathView from "../@recommend/PathView";
import { useQuery } from "@tanstack/react-query";
import { authInstance } from "@/util/instance";
import { PathData } from "../@recommend/page";

async function fetchAllPaths() {
  return await authInstance.get("/paths").then((res) => res.data) as PathData[];
}

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ["allpath"],
    queryFn: fetchAllPaths
  });

  const first = data?.at(0);

  if (!first) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full px-8 mt-8">
      <h1 className="text-3xl font-extrabold">오늘의 추천 코스</h1>
      <div className="px-16 pb-8 pt-8 flex items-center justify-center">
        {data?.at(0) && (
          <PathView
            key={first.identifier}
            identifier={first.identifier}
            mapelementidprefix="home"
            title={first.title}
            description={first.description}
          />
        )}
      </div>
    </div>
  );
}
