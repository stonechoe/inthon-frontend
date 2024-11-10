'use client';

import { LongCoord } from "@/app/types/common";
import { authInstance } from "@/util/instance";
import { useQuery } from "@tanstack/react-query";
import MapCard from "@/components/MapCard";


interface PathDetailResponse {
  coordinates: LongCoord[];
}

interface Props {
  identifier: string;
  title: string;
  description: string;
  mapelementidprefix?: string;
}

export default function PathView({ identifier, title, description, mapelementidprefix = '' }: Props) { 
  const { data, isLoading } = useQuery<PathDetailResponse>({
    queryKey: ["path", identifier],
    queryFn: async () => {
      return await authInstance.get(`/paths/${identifier}`).then((res) => res.data);
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Not Found</div>;
  }

  return (
    <MapCard identifier={identifier} mapelementid={mapelementidprefix + identifier} title={title} description={description} pathsets={[{ color: '#000000', coords: data?.coordinates.map((c) => ({lat: c.latitude, lng: c.longitude}))}]} />
  );
}