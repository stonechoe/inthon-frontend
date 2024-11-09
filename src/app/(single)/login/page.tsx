"use client";
import React, { useEffect } from "react";
import KakaoImage from "public/kakaoicon.png";
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
    <div className="relative flex flex-col items-center justify-between h-full text-center p-8 overflow-hidden">
      <div className="absolute text-[64px] rotate-45 -translate-x-1/2  -translate-y-1/2 w-96 left-1/2 top-1/2 -z-10 opacity-15">
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
        🦶🦶🏻🦶🦶🏼🦶🦶🏽🦶🦶🏾🦶🦶🏿🦶
      </div>
      <div />
      <div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">FootPrint</h1>
      <h2 className="text-2xl font-medium text-gray-600 mb-2">
        당신의 발자국으로 그림을 그려보세요
        </h2>
      </div>

      <div
        onClick={handleKakaoLogin}
        className="cursor-pointer transition-transform place-end transform hover:scale-105 w-full p-4"
      >
        
        <button className="p-4 w-full rounded-lg flex flex-row items-center justify-center gap-2" style={{ backgroundColor: 'rgb(254 229 2)' }}>
            <Image src={KakaoImage} alt="카카오톡 아이콘" width={32} height={32} /> 카카오톡 로그인
        </button>
      </div>
    </div>
  );
};

export default Loginpage;
