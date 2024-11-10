"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { authInstance } from "@/util/instance";
import { LongCoord } from "@/app/types/common";
import MyMap from "@/components/MyMap";
import Link from "next/link";

export interface PathData {
  identifier: string;
  title: string;
  description: string;
  name: string;
  total_distance: number;
  estimated_required_minute: number;
  creator_identifier: string;
  created_date: string;
  last_modified_date: string;
}

async function fetchAllPaths() {
  return await authInstance.get("/paths").then((res) => res.data) as PathData[];
}

interface Response{
  path_identifier: string;
  coordinates: LongCoord[];
}

export default function PathPage() {
  
  const params = useParams<{ id: string }>();
  const { data: allData } = useQuery({
    queryKey: ["allpath"],
    queryFn: fetchAllPaths
  });

  const { data } = useQuery({
    queryKey: ["path", params.id],
    queryFn: async () => {
      const response = await authInstance.get<Response>(`/paths/${params.id}`);
      return response.data;
    },
  });

  const thatData = allData?.find((path) => path.identifier === params.id); 

  if (!data || !allData || !thatData) {
    return <div>{params.id} 로딩 중...</div>;
  }


  return (
    <div className="w-full max-w-3xl mx-auto p-8 rounded-lg">
      <div className="w-full h-96 bg-gray-200 rounded-t-lg overflow-hidden relative">
        <MyMap mapelementid={params.id} useCenter ps={[{color: '#000000', coords: data.coordinates.map((v) => ({lat: v.latitude, lng: v.longitude}))}]} />
      </div>

      <div className="flex flex-col items-center py-16 gap-4">
        <div className="text-3xl font-semibold">{thatData.title}</div>
        <div className="">{thatData.description}</div>

        <Link href={`/drawing?path=${params.id}`}>
        <div
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          달리기 시작
          </div>
        </Link>
      </div>
    </div>
  );
}
