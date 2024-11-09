import type { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  maps: ReactNode;
}

export default function ForceMobileLayout({ maps, children }: Props) {
  return <div className="relative flex flex-col mx-auto max-w-[648px] w-full h-full overflow-y-auto shadow-xl shadow-grey-200">
    <main className="flex-grow">
      {maps}
    </main>
    {children}
  </div>;
};
