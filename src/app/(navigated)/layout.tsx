import type { PropsWithChildren, ReactNode } from "react";
import Nav from "@/components/Nav";



export default function ForceMobileLayout({ children, bar }: PropsWithChildren<{bar : ReactNode}>) {
  return <div className="relative flex flex-col mx-auto max-w-[648px] w-full h-full overflow-y-auto shadow-xl shadow-grey-200 bg-gradient-to-b from-primary-50 to-white">
    {bar}
    <main className="flex-grow">
      {children}
    </main>
    <Nav />
  </div>;
};
