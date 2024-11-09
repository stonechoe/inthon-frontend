'use client';

import { PropsWithChildren } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

const KEY: string = process.env.NEXT_PUBLIC_MAP_API_KEY!;

export default function MapProvider({ children }: PropsWithChildren) {
  return (
    <APIProvider apiKey={KEY}>{children}</APIProvider>);
};