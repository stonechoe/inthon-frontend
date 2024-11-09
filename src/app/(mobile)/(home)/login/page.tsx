"use client";
import React, { useEffect } from "react";

const K_REST_API_KEY = "2d168541b75e35dd7cec879cee81982b";
const K_REDIRECT_URI = `http://localhost:3000`;

const Loginpage = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
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
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Access Token:", data.access_token);
          // 토큰을 저장하고 필요한 처리를 추가합니다.
        })
        .catch((error) => console.error("Error fetching access token:", error));
    }
  }, []);

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;
  };

  return (
    <div>
      <button onClick={handleKakaoLogin} className="KakaoButton">
        카카오 로그인
      </button>
    </div>
  );
};

export default Loginpage;
