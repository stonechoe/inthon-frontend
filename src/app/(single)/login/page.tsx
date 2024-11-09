"use client";
import React, { useEffect } from "react";
import KakaoImage from "public/kakao_login_medium_narrow.png";
import Image from "next/image";
import TryLogin from "./aux/api";
import { useSearchParams } from "next/navigation";

const K_REST_API_KEY = process.env.NEXT_PUBLIC_K_REST_API_KEY;
const K_REDIRECT_URI = `http://localhost:3000/login`;

const Loginpage = () => {
  const sp = useSearchParams();
  const code = sp.get("code");

  useEffect(() => {
    if (!K_REST_API_KEY) {
      console.warn("K_REST_API_KEY가 설정되지 않았습니다.");
      return;
    }
  }, []);

  const handleKakaoLogin = () => {
    if (!K_REST_API_KEY) {
      console.warn("K_REST_API_KEY가 설정되지 않았습니다.");
      return;
    }
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;
  };


  if (code) {
    return <TryLogin code={code} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">FootPrint</h1>
      <h2 className="text-xl font-medium text-gray-600 mb-2">
        당신의 발자국으로 그림을 그려보세요
      </h2>
      <h2 className="text-lg font-semibold text-gray-500 mb-6">
        카카오톡으로 로그인
      </h2>
      <div
        onClick={handleKakaoLogin}
        className="cursor-pointer transition-transform transform hover:scale-105"
      >
        <Image src={KakaoImage} alt="카카오톡 로그인" width={183} height={45} />
      </div>
    </div>
  );
};

export default Loginpage;
