"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function AbstractPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const imageUrl = searchParams.get("imageUrl");
  const title = searchParams.get("title");
  const likes = searchParams.get("likes");

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">경로 정보</h1>

      {/* 경로 이미지 */}
      <div className="relative w-full h-64 mb-6">
        {imageUrl && (
          <Image
            src={imageUrl as string}
            alt={title as string}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        )}
      </div>

      {/* 경로 정보 */}
      <div className="flex flex-col items-center space-y-4">
        <h2 className="font-bold text-xl">{title}</h2>
        <div className="text-lg font-semibold">
          좋아요 수: <span className="text-primary">{likes}</span>
        </div>
      </div>
    </div>
  );
}
