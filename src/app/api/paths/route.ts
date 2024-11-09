import { NextResponse } from "next/server";

export interface CardProps {
  imagePath: string;
  title: string;
  description: string;
}

export async function GET(): Promise<NextResponse<CardProps[]>> {
  return NextResponse.json([
    {
      imagePath: "/dog.png",
      title: "댕댕이 코스",
      description: "강아지 모양 코스를 달려보세요",
    },
  ]);
}