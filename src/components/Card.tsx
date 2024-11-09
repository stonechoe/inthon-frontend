"use client";
import React from "react";
import Image from "next/image";
import type { CardProps } from "@/app/api/paths/route";

export default function Card({ imagePath, title, description }: CardProps) {
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
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
}
