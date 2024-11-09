"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function AbstractPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const imageUrl = searchParams.get("imageUrl");
  const title = searchParams.get("title");
  const likes = searchParams.get("likes");
  const description = searchParams.get("description");

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>

      {/* 경로 이미지 */}
      <div className="relative w-full h-64 mb-6 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl as string}
            alt={title as string}
            width={300}
            height={300}
            objectFit="cover"
            className="rounded-lg"
          />
        )}
      </div>

      {/* 경로 정보 */}
      <div className="flex flex-col items-center space-y-4">
        <div className="text-lg font-semibold">{description}</div>

        {/* 달리기 시작 버튼 */}
        <button
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
          onClick={() => alert("달리기를 시작합니다!")}
        >
          달리기 시작
        </button>
      </div>
    </div>
  );
}
