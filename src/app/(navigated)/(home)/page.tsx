import Link from "next/link";

import Card from "@/components/Card";

export default function HomePage() {
  return (
    <div className="w-full h-full">
      오늘의 추천 코스
      <div className="px-16 pb-8 pt-8 flex items-center justify-center ">
        <Card
          imagePath="/dog.png"
          title="댕댕이 코스"
          description="강아지 모양 코스를 달려보세요"
        />{" "}
      </div>
      <Link href="/login" className="text-blue-500">
        로그인 페이지로 이동
      </Link>
      <Link href="/drawing">드로잉?? 달리기시작</Link>
    </div>
  );
}
