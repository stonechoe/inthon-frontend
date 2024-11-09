'use client';

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Link from "next/link";

import Canvas from "public/icons/canvas.svg";
import Gallery from "public/icons/gallery.svg";
import Museum from "public/icons/museum.svg";
import Crew from "public/icons/crew.svg";

export default function Nav() {
  return <nav className="sticky bg-white border-t border-t-neutral-300 bottom-0 z-50 flex items-center w-full justify-evenly p-4 bg-primary-500 text-black">
    <NavItem icon={<Canvas />} href="/"> 캔버스</NavItem>
    <NavItem icon={<Gallery />} href="/gallery">갤러리</NavItem>
    <NavItem icon={<Museum />} href="/museum">박물관</NavItem>
    <NavItem icon={<Crew />} href="/crew">크루</NavItem>
  </nav>;
};

interface NavItemProps {
  icon: ReactNode;
  children: ReactNode;
  href: string;
}

function NavItem({ href, children, icon }: NavItemProps) {
  const pathname = usePathname();
  return <Link href={href}><div className={"flex flex-col font-bold items-center " + (pathname === href ? 'text-primary-main' : '')}>{icon}{children}</div></Link>;
};
