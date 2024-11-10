import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  recommend: ReactNode;
  create: ReactNode;
}

export default function HomeLayout({create,  children, recommend }: Props) {
  return (
    <div className="w-full">
      {create}
      {children}
      {recommend}
    </div>
  );
}
