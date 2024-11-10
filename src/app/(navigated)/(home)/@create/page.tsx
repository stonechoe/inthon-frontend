"use client";

import Image from "next/image";
import MapBG from 'public/image/mapbg.png';


export default function CreateNew() {

  return (
    <>
      <div className="relative w-full px-4 mt-8 ">
        <div className='relative flex flex-row justify-between items-center z-10 rounded-xl bg-primary-main text-white p-4 border border-primary-200'>
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-extrabold z-20">주행 경로 그리기    ✍️</h1>
            <span> {'->'} </span>
          </div>
          <Image src={MapBG} alt="map" layout="fill" className="object-cover opacity-60 rounded-xl" loading="eager"  />
        </div>
    </div>
    </>
  );
  
}