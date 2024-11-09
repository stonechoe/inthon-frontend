import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  recommend: ReactNode;
  commerce: ReactNode;
}

export default function HomeLayout({ children, recommend, commerce }: Props) {
  return (
    <div className="w-full">
      {children}
      {recommend}
      {commerce}
    </div>
  );
}
