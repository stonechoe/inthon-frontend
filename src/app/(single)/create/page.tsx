'use client';

import { Coord } from "@/app/types/common";
import PathCreateMap from "./genmap";
import { useCallback, useState } from "react";
import RequireGeo from "@/components/RequireGeo";
import { meterDistance } from "@/util/util";
import { authInstance } from "@/util/instance";
import { AxiosResponse } from "axios";

interface CreateRequest {
  name: string;
  total_distance: number;
}


function SubPage({initialCoord} : {initialCoord: Coord}) {
  const [coords, setCoords] = useState<Coord[]>([]);

  const handleSubmit = useCallback(() => {
    const total_distance = coords.reduce((acc, cur, idx) => {
      if (idx === 0) {
        return 0;
      }
      return acc + meterDistance(coords[idx - 1], cur);
    }, 0);

    const req: CreateRequest = {
      name: "test",
      total_distance
    };
    authInstance.post("/paths", req).then((res: AxiosResponse<{ identifier: string; name: string }>) => {
      alert("생성 요청 성공");
      const sequenced = coords.map((coord, idx) => ({ latitude: coord.lat, longitude: coord.lng, sequence: idx }));

      for (let i = 0; i < sequenced.length; i += 900) {
        const chunk = sequenced.slice(i, i + 900);
        authInstance.post(`/paths/${res.data.identifier}/coordinates`, { coordinates: chunk }).then(() => {
          alert("좌표 생성 요청 성공");
        }).catch(() => {
          alert("좌표 생성 요청 실패");
        });
      }
    }).catch(() => {
      alert("생성 요청 실패");
    });
  }, [coords]);

  return <><main className="flex-grow">
  <PathCreateMap coords={coords} setCoords={setCoords} initialCoord={initialCoord as Coord} />
</main>
  <div className="w-full bg-white">
    <div className="p-4">
      <h1 className="text-4xl font-bold">목표 달성 80%</h1>
      <div className="p-2 border-b border-gray-200">목적지 설정</div>
      <div className="p-2 border-b border-gray-200">목적지 설정</div>
      <div className="p-2 border-b border-gray-200">목적지 설정</div>
      <div className="p-2 border-b border-gray-200">목적지 설정</div>
    </div>
    <div className="flex flex-col gap-4 p-4">
      <button className="p-2 bg-red-600 text-white rounded-xl w-full">다시 그리기</button>
      <button className="p-2 bg-primary-main text-white rounded-xl w-full" onClick={handleSubmit}>완료</button>
    </div>
  </div></>;

}

export default function SubMenuPage() {

  const [coord, setCoord] = useState<Coord | undefined>(undefined);

  return ( <RequireGeo setCoord={setCoord}>
      <SubPage initialCoord={coord as Coord} />
    </RequireGeo>);
}