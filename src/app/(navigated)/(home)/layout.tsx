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
      <div className="w-full px-4 mt-4">
        <h1 className="text-3xl font-extrabold">핫 아이템</h1>
      </div>
      {commerce}
    </div>
  );
}
