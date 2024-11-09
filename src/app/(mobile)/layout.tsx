import type { PropsWithChildren } from "react";
import Nav from "@/components/Nav";

export default function ForceMobileLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col mx-auto max-w-[648px] w-full h-full overflow-y-auto shadow-xl shadow-grey-200">
    <main className="flex-grow">
      {children}
    </main>
    <Nav />
  </div>;
};
