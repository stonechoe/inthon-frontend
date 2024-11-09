"use client";
import React, { useEffect } from "react";
import KakaoImage from "public/kakao_login_medium_narrow.png";
import Image from "next/image";

const K_REST_API_KEY = process.env.NEXT_PUBLIC_K_REST_API_KEY;
const K_REDIRECT_URI = `http://localhost:3000/signup`;

const Loginpage = () => {
  useEffect(() => {
    if (!K_REST_API_KEY) {
      console.warn("K_REST_API_KEY가 설정되지 않았습니다.");
      return;
    }

    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code && K_REST_API_KEY) {
      fetch(`https://kauth.kakao.com/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: K_REST_API_KEY,
          redirect_uri: K_REDIRECT_URI,
          code: code,
        }).toString(), // URLSearchParams을 문자열로 변환
      })
        .then((response) => {
          if (!response.ok) throw new Error("Token fetch failed");
          return response.json();
        })
        .then((data) => {
          console.log("Access Token:", data.access_token);
          localStorage.setItem("kakao_access_token", data.access_token);
        })
        .catch((error) => console.error("Error fetching access token:", error));
    }
  }, []);

  const handleKakaoLogin = () => {
    if (!K_REST_API_KEY) {
      console.warn("K_REST_API_KEY가 설정되지 않았습니다.");
      return;
    }
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;
  };

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
