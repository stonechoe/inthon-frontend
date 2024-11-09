'use client';

import { Coord } from "@/app/types/common";
import MyMap from "@/components/MyMap";
import { useCallback, useEffect, useState } from "react";
import RequireGeo from "@/components/RequireGeo";
import { authInstance } from "@/util/instance";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CreateRunRequest {
  crew_identifier ?: string;
  running_user_identifiers: string[];
  title?: string;
  description ? : string;
  path_identifier?: string;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface EditRunRequest {
  run_identifier :string;
  title :string;
  description :string;
  running_status :string;
  user_identifier :string;
  crew_identifer :string;
  running_user_identifiers :string;
}

export default function SubMenuPage() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [coord, setCoord] = useState<Coord | undefined>(undefined);
  const [coords, setCoords] = useState<Coord[]>([]);

  const [percent, setPercent] = useState<number | undefined>(undefined);
  const [runId, setRunId] = useState<string | undefined>(undefined);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [watchCallback, setWatchCallback] = useState<NodeJS.Timeout | undefined>(undefined);

  const sp = useSearchParams();
  const pathId = sp.get('path');

  useEffect(() => {
    authInstance.post('/running', { title : 'asdf', running_user_identifiers: [], path_identifier : pathId}).then((res) => {
      alert(JSON.stringify(res.data));
      setRunId(res.data.identifier);
    });
  }, []);

  const appendCoords = useCallback(function appendCoords(pos: GeolocationPosition) {
    if (!runId) return;
    setCoords((prev) => {
      const newCoords = [...prev];
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;
      newCoords.push({ lat: latitude, lng: longitude });
      authInstance.post(`/running/${runId}/running-states`, { latitude, longitude, time: (new Date()).toISOString() }).then((res) => {
        // ignore target coords for now?
        setPercent(res.data.percent);
      });
      return newCoords;
    });
  }, [runId]);

  useEffect(() => {
    const num = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(appendCoords)
    }, 1000);
    setWatchCallback(num);
  }, [appendCoords]);

  return (<Suspense><RequireGeo setCoord={setCoord}>
      <main className="flex-grow">

       <MyMap ps={[{coords, color: '#FF0000'}]} />

      </main>
      <div className="w-full bg-white">
        <div className="p-4">
          <h1 className="text-4xl font-bold">목표 달성 {percent}%</h1>
          <div className="p-2 border-b border-gray-200">목적지 설정</div>
          <div className="p-2 border-b border-gray-200">목적지 설정</div>
          <div className="p-2 border-b border-gray-200">목적지 설정</div>
          <div className="p-2 border-b border-gray-200">목적지 설정</div>
        </div>
        <div className="p-4">
          <button className="p-2 bg-primary-main text-white rounded-xl w-full">그만하기</button>
        </div>
      </div>
    </RequireGeo></Suspense> );
}