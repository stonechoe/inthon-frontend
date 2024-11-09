"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import type { CardProps } from "@/app/api/paths/route";

declare global {
  interface Window {
    Kakao: any;
  }
}

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

export default function Card({ imagePath, title, description }: CardProps) {
  useEffect(() => {
    // 카카오 SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY); // 환경변수로 설정한 Kakao App Key 사용
    }
  }, []);

  const handleShareClick = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: description,
          imageUrl: imagePath,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else if (navigator.share) {
      // Web Share API 사용 (모바일 지원)
      navigator
        .share({
          title: title,
          text: description,
          url: window.location.href,
        })
        .catch((error) => console.error("공유에 실패했습니다.", error));
    } else {
      // 데스크톱에서 사용할 네이버 공유 링크
      const naverShareUrl = `https://share.naver.com/web/shareView?url=${encodeURIComponent(
        window.location.href
      )}&title=${encodeURIComponent(title)}`;
      window.open(naverShareUrl, "_blank");
    }
  };

  return (
    <div className="rounded-lg border border-primary-200 w-full max-w-xs">
      <div className="w-full h-64 bg-gray-200 rounded-t-lg overflow-hidden relative">
        <Image
          src={imagePath}
          alt="Card image"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-4">
        <div className="font-bold">{title}</div>
        <div className="text-sm text-gray-500 mb-4">{description}</div>

        {/* 공유하기 버튼 */}
        <button
          onClick={handleShareClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full font-semibold hover:bg-blue-600 transition"
        >
          공유하기
        </button>
      </div>
    </div>
  );
}
