'use client';

import { useEffect } from "react";
import { removeAccessToken, removeRefreshToken } from "@/util/handleToken";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    removeAccessToken();
    removeRefreshToken();
    alert("로그아웃 되었습니다.");
    router.push("/");
  }, [router]);

  return <div className="w-full h-full font-bold text-center flex flex-col items-center justify-center">로그아웃 중입니다...</div>;
}