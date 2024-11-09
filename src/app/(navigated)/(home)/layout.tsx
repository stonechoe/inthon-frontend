import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  recommend: ReactNode;
  commerce: ReactNode;
  create: ReactNode;
}

export default function HomeLayout({create,  children, recommend, commerce }: Props) {
  return (
    <div className="w-full">
      {create}
      {children}
      {recommend}
      {commerce}
    </div>
  );
}
