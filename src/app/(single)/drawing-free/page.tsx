'use client';

import { Coord } from "@/app/types/common";
import CurrentPosPage from "./maps";
import { useState } from "react";
import RequireGeo from "@/components/RequireGeo";

export default function SubMenuPage() {

  const [coord, setCoord] = useState<Coord | undefined>(undefined);

  return ( <RequireGeo setCoord={setCoord}>
      <main className="flex-grow">
          <CurrentPosPage initialCoord={coord as Coord} />
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
    </RequireGeo>);
}