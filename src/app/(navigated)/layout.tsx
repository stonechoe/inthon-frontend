'use client'

import type { PropsWithChildren } from "react";
import Nav from "@/components/Nav";
import Link from "next/link";
import MyPageIcon from "public/icons/mypage.svg";
import { useIslogin } from "@/util/handleToken";

export default function ForceMobileLayout({ children }: PropsWithChildren) {

  const isLogin = useIslogin();

  return <div className="relative flex flex-col mx-auto max-w-[648px] w-full h-full overflow-y-auto shadow-xl shadow-grey-200 bg-gradient-to-b from-primary-50 to-white">
    <header className="w-full flex flex-row justify-between px-4 py-6 items-center">
    <Link href="/"><div className='text-3xl font-black'>🦶FootPrint</div></Link>
    {(isLogin === undefined ? <></> : (isLogin ? <Link href='/mypage'><div><MyPageIcon /></div></Link> : <Link href='/login'><div>로그인</div></Link>))}
    </header>
    <main className="flex-grow">
      {children}
    </main>
    <Nav />
  </div>;
};
