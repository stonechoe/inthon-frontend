'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { instance } from "@/util/instance";
import { setAccessToken, setRefreshToken } from "@/util/handleToken";

type UUID = string;

interface LoginResponse{
  user_identifier: UUID;
  access_token: string;
  refresh_token? : string;
}

/* KAKO auth로 로그인을 시도 -> 없는 경우 취소 */
export default function TryLogin({ code }: { code: string }) {
  const route = useRouter();

  useEffect(() => {

    instance.post('/users/login', {
      body: {
        kakao_auth_token: code
      }
    }).then((res) => {
      setAccessToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token, res.data.user_identifier);
    }).catch(() => {

      { // login mock
        alert('(지금은 백엔드가 없어서 당연히 로그인에 실패했지만) 테스트 중이니 로그인했다고 치겠습니다')
        setAccessToken('any');
        setRefreshToken('any', 'anyuuid');
      }

      route.push(`/signup?code=${code}`);
    });

    // try login

    // if fails -> go to signup

    // if success -> add token and go to home
  }, [code, route]);

  return <div>로그인 시도 중 ...</div>;
}