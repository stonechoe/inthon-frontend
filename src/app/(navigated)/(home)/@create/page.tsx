"use client";

import Image from "next/image";
import MapBG from 'public/image/mapbg.png';
import Rarrow from 'public/icons/rarrow.svg';


export default function CreateNew() {

  return (
    <>
      <div className="relative w-full px-8 mt-8 ">
        <div className="absolute w-[90%] h-full">
          <Image src={MapBG} alt="map" fill className="object-cover rounded-xl" loading="eager"  />
          </div>
        <div className='relative flex flex-row justify-between items-center z-10 rounded-xl p-4 bg-opacity-40 bg-primary-main text-white py-4 border border-primary-200'>
          

          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="text-3xl font-extrabold z-20">주행 경로 그리기 ✍️</h1>
            <div><Rarrow /></div>
          </div>
        </div>
    </div>
    </>
  );
  
}