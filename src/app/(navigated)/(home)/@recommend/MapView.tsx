'use client';

import { Coord } from "@/app/types/common";
import { authInstance } from "@/util/instance";
import { useQuery } from "@tanstack/react-query";
import MapCard from "@/components/MapCard";

interface LongCoord {
  latitude: number;
  longitude: number;
}

interface PathDetailResponse {
  coordinates: LongCoord[];
}

interface Props {
  identifier: string;
  title: string;
  description: string;
}

export default function MapView({ identifier, title, description }: Props) { 
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
    <MapCard title={title} description={description} pathsets={[{ color: '#000000', coords: data?.coordinates.map((c) => ({lat: c.latitude, lng: c.longitude}))}]} />
  );
}