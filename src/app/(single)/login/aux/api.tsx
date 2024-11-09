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
        setAccessToken(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsidXNlcl9pZGVudGlmaWVyIjoiMWJmYjllOTItM2NmZS00OTMwLWIyOTctOTFhNWFmMGJhMDQ3In0sImV4cCI6MTczMTI1NDIwMX0.KZdKGMq1jslDkkIcnVwaCNPciXYvbROJ99CslzuQa54`);
        setRefreshToken('', '');

        route.push('/');
      }
    });

    // try login

    // if fails -> go to signup

    // if success -> add token and go to home
  }, [code, route]);

  return <div>로그인 시도 중 ...</div>;
}