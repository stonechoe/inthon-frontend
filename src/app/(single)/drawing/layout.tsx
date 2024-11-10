'use client';

import MapProvider from "@/components/MapProvider";
import RequireLogin from "@/components/RequireLogin";

export default function ChildrenLayout({children}: React.PropsWithChildren) {
  return (
    <MapProvider>
      <RequireLogin>{children}</RequireLogin>
    </MapProvider>
  );
}