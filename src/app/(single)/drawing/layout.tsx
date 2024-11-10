'use client';

import MapProvider from "@/components/MapProvider";
import RequireLogin from "@/components/RequireLogin";

export default function (children: React.ReactNode) {
  return (
    <MapProvider>
      <RequireLogin>{children}</RequireLogin>
    </MapProvider>
  );
}