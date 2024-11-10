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

const K_REST_API_KEY = process.env.NEXT_PUBLIC_K_REST_API_KEY || '';
const K_REDIRECT_URI = `${process.env.NEXT_PUBLIC_SELF}/login`;

/* KAKO auth로 로그인을 시도 -> 없는 경우 취소 */
export default function TryLogin({ code }: { code: string }) {
  const route = useRouter();

  useEffect(() => {

    instance.post('https://kauth.kakao.com/oauth/token', new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: K_REST_API_KEY,
      redirect_uri: K_REDIRECT_URI,
      code: code
    }), {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res: AxiosResponse<{access_token : string}>) => { 
      instance.post('/users/login', {
        kakao_auth_token: res.data.access_token
      }
    ).then((res: AxiosResponse<LoginResponse>) => {
      setAccessToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token || '', res.data.user_identifier);
      route.push('/');
    }).catch(() => {
      {
        // alert('로그인에 실패했습니다.');
        route.push(`/signup?code=${res.data.access_token}`);
      }
    });

    });


    // try login

    // if fails -> go to signup

    // if success -> add token and go to home
  }, [code, route]);

  return <div className="w-full h-full flex flex-col">
    <span className="items-center">
    로그인 중 ...
    </span>
  </div>;
}