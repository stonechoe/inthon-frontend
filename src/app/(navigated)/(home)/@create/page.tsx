"use client";

import CreateMapButton from "./createbutton";

export default function CreateNew() {

  return (
    <>
    
    
    <div className="relative w-full px-4 mt-8 ">
      <div className='relative flex flex-row justify-between items-center rounded-xl bg-primary-main bg-opacity-35 text-white p-4 border border-primary-200'>
        <h1 className="text-3xl font-extrabold">주행 경로 그리기 ✍️</h1>
        </div>
        <div className="fixed w-full h-full">
          <CreateMapButton />
        </div>
    </div>
    </>
  );
  
}