'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { instance } from "@/util/instance";
import { setAccessToken, setRefreshToken } from "@/util/handleToken";
import { AxiosResponse } from "axios";

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
        kakao_auth_token: code
      }
    ).then((res: AxiosResponse<LoginResponse>) => {
      setAccessToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token || '', res.data.user_identifier);
    }).catch(() => {
      {
        alert('가짜 로그인합니다');
        setAccessToken(`API_RESPONSE (여길 고쳐)`);
        setRefreshToken('', '');

        route.push('/');
      }
      // route.push(`/signup?code=${code}`);
    });

    // try login

    // if fails -> go to signup

    // if success -> add token and go to home
  }, [code, route]);

  return <div>로그인 시도 중 ...</div>;
}