import type { PropsWithChildren } from "react";

export default function Mobile({children }: PropsWithChildren) {
  return (<div className="flex flex-col mx-auto max-w-[512px] w-full h-full overflow-y-auto shadow-xl shadow-grey-200">{children}</div>);
}