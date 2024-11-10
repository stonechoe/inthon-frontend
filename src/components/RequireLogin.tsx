'use client';

import Link from "next/link";
import { useIslogin } from "@/util/handleToken";
import { PropsWithChildren } from "react";

export default function RequireLogin({ children }: PropsWithChildren) {
  const isLogin = useIslogin();

  if (isLogin === undefined) {
    return <div />;
  }

  if (!isLogin) {
    return (<div className="flex flex-col w-full h-full text-center items-center justify-center gap-16">
      <p className="font-bold text-xl ">
        ⛔️ 로그인이 필요합니다.
        <br />
        <br />
        <Link className="text-primary-main underline" href="/login">로그인</Link> 후 이용해주세요.
      </p>
    </div>);
  } 

  return children;
}