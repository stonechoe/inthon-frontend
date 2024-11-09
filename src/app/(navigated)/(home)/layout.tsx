import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  recommend: ReactNode;
}

export default function HomeLayout({ children, recommend }: Props) {
  return (<div className="w-full">
    {children}
    {recommend}
  </div>);
}