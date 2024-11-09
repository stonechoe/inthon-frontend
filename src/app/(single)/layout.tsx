import type { PropsWithChildren } from "react";

export default function ForceMobileLayout({ children }: PropsWithChildren) {
  return <div className="relative flex flex-col mx-auto max-w-[648px] w-full h-full overflow-y-auto shadow-xl shadow-grey-200">
    {children}
  </div>;
};
