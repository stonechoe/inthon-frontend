'use client';

import type { PropsWithChildren } from "react";
import type { Coord } from "@/app/types/common";
import { useLayoutEffect, useState } from "react";

interface Props extends PropsWithChildren {
  setCoord: SetState<Coord>;
}

export default function RequireGeo({ setCoord, children }: Props) {
  const [hasPer, setHasPer] = useState<boolean | undefined>(undefined);
  // const [coord, setCoord] = useState<Coord | undefined>(undefined);

  useLayoutEffect(() => {
    navigator?.geolocation?.getCurrentPosition((pos: GeolocationPosition) => {
      setCoord({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setHasPer(true);
    }, () => {
      setHasPer(false);
    });
  }, [setCoord]);

  if (hasPer === undefined) {
    return <div className="flex flex-col w-full h-full font-bold text-xl text-center justify-center">
      🦶 코스를 준비 중입니다.
    </div>
  }

  if (!hasPer) {
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

  return children;
}