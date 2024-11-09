'use client';

import { Coord } from "@/app/types/common";
import CurrentPosPage from "./maps";
import { useEffect, useState } from "react";

export default function SubMenuPage() {
  const [hasPer, setHasPer] = useState<boolean | undefined>(undefined);
  const [coord, setCoord] = useState<Coord | undefined>(undefined);

  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition((pos: GeolocationPosition) => {
      setCoord({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setHasPer(true);
    }, () => {
      setCoord(undefined);
      setHasPer(false);
    });
  }, []);

  if (hasPer === undefined) {
    return <div className="flex flex-col w-full h-full font-bold text-xl text-center justify-center">
      🦶 코스를 준비 중입니다.
    </div>
  }

  if (!hasPer || !coord) {
    return <div className="flex flex-col w-full h-full text-center items-center justify-center gap-16">
      <p className="font-bold text-xl ">

      ⛔️ 달리려면 위치 정보를 허용해야 합니다.
      <br />
      <br />
      브라우저 설정에서 위치 정보를 허용해주세요.

      </p>

      <button className="p-2 bg-primary-main rounded-xl text-white ">그만 두고 돌아가기 TODO</button>
    </div>
  }

  return (
      <>
      <main className="flex-grow">
          <CurrentPosPage initialCoord={coord} />
      </main>
      <div className="w-full bg-white">
        <div className="p-4">
          <h1 className="text-4xl font-bold">목표 달성 80%</h1>
          <div className="p-2 border-b border-gray-200">목적지 설정</div>
          <div className="p-2 border-b border-gray-200">목적지 설정</div>
          <div className="p-2 border-b border-gray-200">목적지 설정</div>
          <div className="p-2 border-b border-gray-200">목적지 설정</div>
        </div>
        <div className="p-4">
          <button className="p-2 bg-primary-main text-white rounded-xl w-full">그만하기</button>
        </div>
      </div>
    </>);
}