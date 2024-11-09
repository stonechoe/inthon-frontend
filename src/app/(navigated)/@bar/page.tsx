'use client';

import MyPageIcon from 'public/icons/mypage.svg'
import Link from 'next/link';


export default function BarPage() {
  return (<header className="w-full flex flex-row justify-between px-4 py-6 items-center">
    <Link href="/"><div className='text-3xl font-black'>🦶FootPrint</div></Link>
    <Link href='/mypage'><div><MyPageIcon /></div></Link>
  </header>);
}