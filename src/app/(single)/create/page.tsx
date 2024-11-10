"use client";

import { Coord } from "@/app/types/common";
import PathCreateMap from "./genmap";
import { useCallback, useState } from "react";
import RequireGeo from "@/components/RequireGeo";
import { meterDistance } from "@/util/util";
import { authInstance } from "@/util/instance";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

interface CreateRequest {
  title: string;
  description: string;
  total_distance: number;
}

interface Props {
  initialCoord: Coord
  title: string;
  description: string;
}

function SubPage({ initialCoord, title, description }: Props) {
  const route = useRouter();
  const [coords, setCoords] = useState<Coord[]>([]);

  const handleSubmit = useCallback(() => {
    const total_distance = coords.reduce((acc, cur, idx) => {
      if (idx === 0) {
        return 0;
      }
      return acc + meterDistance(coords[idx - 1], cur);
    }, 0);

    const req: CreateRequest = {
      title: title || '무제',
      description : description || '설명 없음',
      total_distance,
    };
    authInstance
      .post("/paths", req)
      .then((res: AxiosResponse<{ identifier: string; name: string }>) => {
        console.log("생성 요청 성공");
        const sequenced = coords.map((coord, idx) => ({
          latitude: coord.lat,
          longitude: coord.lng,
          sequence: idx,
        }));


        const chunkList = [];
        for (let i = 0; i < sequenced.length; i += 900) {
          const chunk = sequenced.slice(i, i + 900);
          chunkList.push(chunk);
        }

        axios.all(chunkList.map((chunk) => authInstance
          .post(`/paths/${res.data.identifier}/coordinates`, {
            coordinates: chunk,
          })
          .then(() => {
            console.log("좌표 생성 요청 성공");
          
          })
          .catch(() => {
            console.error("좌표 생성 요청 실패");
          }))).then(() => {
            console.log("모든 좌표 생성 요청 성공");
            alert("경로 생성이 완료되었습니다.");
            route.push(`/`);
          });
      })
      .catch(() => {
        console.error("생성 요청 실패");
      });
  }, [coords]);

  return (
    <>
      <main className="flex-grow">
        <PathCreateMap
          coords={coords}
          setCoords={setCoords}
          initialCoord={initialCoord as Coord}
        />
      </main>
      <div className="w-full bg-white">
        <div className="p-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <h6 className="font-bold">{description}</h6>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <button className="p-2 bg-red-600 text-white rounded-xl w-full" onClick={() => { setCoords([]); }}>
            다시 그리기
          </button>
          <button
            className="p-2 bg-primary-main text-white rounded-xl w-full"
            onClick={handleSubmit}
          >
            완료
          </button>
        </div>
      </div>
    </>
  );
}

export default function SubMenuPage() {
  const [coord, setCoord] = useState<Coord | undefined>(undefined);

  const [complete, setComplete] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  if (!complete) {
    return <form
    className="w-full h-full flex flex-col items-center justify-center gap-4"
      onSubmit={(e) => {
      e.preventDefault();
      setComplete(true);
      }}>
    <div className="w-full h-full bg-neutral-50 flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-center font-bold">경로 만들기</h1>
        <input className="p-4 rounded-xl" onChange={(e) => setTitle(e.target.value)} placeholder="경로 제목" value={title} />
        <input className="p-4 rounded-xl" onChange={(e) => setDescription(e.target.value)} placeholder="경로 설명" value={description} />
      </div>
      <button className="p-4 bg-primary-main text-white rounded-2xl" type="submit">완료</button>
      </div>
    </form>
  }

  return (
    <RequireGeo setCoord={setCoord}>
      <SubPage title={title} description={description} initialCoord={coord as Coord} />
    </RequireGeo>
  );
}
