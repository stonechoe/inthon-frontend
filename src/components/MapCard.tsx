"use client";
import React from "react";
import MyMap from "./MyMap";
import { CardProps } from "./Card";
import type { PathSet } from "@/app/types/common";

import ShareButton from "./ShareButton";

interface MapCardProps extends CardProps {
  pathsets: PathSet[];
  isShare?: boolean;
  linkUrl?: string;
  onClick?: () => void;
}

export default function MapCard({
  pathsets,
  title,
  description,
  isShare = true,
  linkUrl = "/",
  onClick,
}: MapCardProps) {


  return (
    <div
      onClick={onClick} // 카드 전체에 onClick 적용
      className="rounded-lg border border-primary-200 w-full max-w-xs cursor-pointer"
    >
      <div className="w-full h-64 bg-gray-200 rounded-t-lg overflow-hidden relative">
        {pathsets && <MyMap useCenter ps={pathsets} />}
      </div>
      <div className="p-4">
        <div className="font-bold">{title}</div>
        <div className="text-sm text-gray-500 mb-4">{description}</div>

        {/* 공유하기 또는 링크 이동 버튼 */}
        <ShareButton linkUrl={linkUrl} isShare={isShare} title={title} description={description} imagePath="/dino.png" />
      </div>
    </div>
  );
}
