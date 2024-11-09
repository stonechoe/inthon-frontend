import Link from "next/link";

export default function Nav() {
  return <nav className="sticky bg-white border-t border-t-neutral-300 bottom-0 z-50 flex items-center w-full justify-evenly p-4 bg-primary-500 text-black">
    <NavItem href="/">캔버스</NavItem>
    <NavItem href="/gallery">갤러리</NavItem>
    <NavItem href="/mypage">마이페이지</NavItem>
  </nav>;
};

interface NavItemProps {
  children: string;
  href: string;
}

function NavItem({ href, children } : NavItemProps) {
  return <Link href={href}><div className="font-bold">{children}</div></Link>;
};
