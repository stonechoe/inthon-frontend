"use client";
import React from "react";
import Image from "next/image";
import type { CardProps } from "@/app/api/paths/route";

import ShareButton from "./ShareButton";

interface EnhancedCardProps extends CardProps {
  isShare?: boolean;
  linkUrl?: string;
  onClick?: () => void;
}

export default function Card({
  imagePath,
  title,
  description,
  isShare = true,
  linkUrl = "/",
  onClick,
}: EnhancedCardProps) {


  return (
    <div
      onClick={onClick} // 카드 전체에 onClick 적용
      className="rounded-lg border border-primary-200 w-full max-w-xs cursor-pointer"
    >
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

        {/* 공유하기 또는 링크 이동 버튼 */}
        <ShareButton linkUrl={linkUrl} isShare={isShare} title={title} description={description} imagePath={imagePath} />
        
      </div>
    </div>
  );
}
