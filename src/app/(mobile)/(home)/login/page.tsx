"use client";

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function LoginPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("YOUR_KAKAO_JAVASCRIPT_KEY"); // JavaScript 키 입력
    }
    displayToken();
  }, []);

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "https://YOUR_REDIRECT_URI", // 리다이렉트 URI를 실제 환경에 맞게 설정
    });
  };

  const displayToken = () => {
    const token = getCookie("authorize-access-token");
    if (token) {
      window.Kakao.Auth.setAccessToken(token);
      window.Kakao.Auth.getStatusInfo()
        .then((res: any) => {
          if (res.status === "connected") {
            setToken(window.Kakao.Auth.getAccessToken());
          }
        })
        .catch(() => {
          window.Kakao.Auth.setAccessToken(null);
        });
    }
  };

  const getCookie = (name: string) => {
    const parts = document.cookie.split(name + "=");
    if (parts.length === 2) return parts[1].split(";")[0];
    return null;
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          카카오톡으로 로그인
        </h2>
        <a id="kakao-login-btn" onClick={loginWithKakao}>
          <img
            src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
            width="222"
            alt="카카오 로그인 버튼"
          />
        </a>
        <p id="token-result" className="mt-4">
          {token ? `Login success, token: ${token}` : "No token"}
        </p>
      </div>
    </div>
  );
}
