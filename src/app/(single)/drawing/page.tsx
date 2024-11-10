'use client';

import { Coord } from "@/app/types/common";
import MyMap from "@/components/MyMap";
import { useCallback, useEffect, useState } from "react";
import RequireGeo from "@/components/RequireGeo";
import { authInstance } from "@/util/instance";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
  path_identifier?: string;
  running_status :string;
  user_identifier :string;
  crew_identifer :string;
  running_user_identifiers: string;
}

export default function SubMenuPage() {

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [coord, setCoord] = useState<Coord | undefined>(undefined);
  const [coords, setCoords] = useState<Coord[]>([]);

  const [percent, setPercent] = useState<number | undefined>(undefined);
  const [runId, setRunId] = useState<string | undefined>(undefined);

  // const [watchCallback, setWatchCallback] = useState<NodeJS.Timeout | undefined>(undefined);

  const sp = useSearchParams();
  const pathId = sp.get('path');

  useEffect(() => {
    authInstance.post('/running', { title : 'asdf', running_user_identifiers: [], path_identifier : pathId}).then((res) => {
      // alert(JSON.stringify(res.data));
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
        console.log('GOT: ', JSON.stringify(res.data));
        setPercent(res.data.percent);
      });
      return newCoords;
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.watchPosition(appendCoords)
  }, [appendCoords]);

  return (<RequireGeo setCoord={setCoord}>
      <main className="flex-grow">

       <MyMap mapelementid="DRAW_ID" ps={[{coords, color: '#FF0000'}]} />

      </main>
      <div className="w-full bg-white">
        {percent !== undefined && <div className="p-4">
          <h1 className="text-4xl font-bold">목표 달성 {percent}%</h1>
        </div>}
        <div className="p-4">
        <button className="p-2 bg-primary-main text-white rounded-xl w-full" onClick={
          () => {
            authInstance.put(`/running/${runId}`, { run_identifier: runId, running_status: 'COMPLETED' }).then(() => { 
              alert('완료되었습니다.');
              router.push('/');
             });
          }
          }>그만하기</button>
        </div>
      </div>
    </RequireGeo> );
}