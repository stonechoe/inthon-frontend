import React, { useState } from "react";
import KakaoImage from "public/kakao_login_medium_narrow.png";
import Image from "next/image";

interface Drawing {
  id: number;
  title: string;
  likes: number;
  imageUrl: string;
}

interface OverviewsProps {
  drawings: Drawing[];
}

function Overviews({ drawings }: OverviewsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {drawings.map((drawing) => (
        <div key={drawing.id} className="border p-4 rounded-lg shadow-md">
          <div className="relative w-full h-48">
            <Image
              src={drawing.imageUrl}
              alt="카카오톡 로그인"
              layout="fill" // 부모 요소를 꽉 채우도록 설정
              objectFit="cover" // 이미지를 잘라서 채우기
              className="rounded-md"
            />
          </div>

          <div className="mt-2 text-center">
            <h3 className="font-bold text-lg">{drawing.title}</h3>
            <div className="flex items-center justify-center mt-2">
              <span className="text-gray-500">💙 {drawing.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Overviews;
