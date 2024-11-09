"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Link from "next/link";

import Canvas from "public/icons/canvas.svg";
import Gallery from "public/icons/gallery.svg";
import Museum from "public/icons/museum.svg";
import Crew from "public/icons/crew.svg";
import Plus from "public/icons/plus.svg";

export default function Nav() {
  return (
    <nav className="sticky bg-white border-t border-t-neutral-300 bottom-0 z-50 flex items-center w-full justify-evenly p-4 bg-primary-500 text-black">
      <NavItem icon={<Canvas />} href="/">
        캔버스
      </NavItem>
      <NavItem icon={<Gallery />} href="/gallery">
        갤러리
      </NavItem>
      <NavItem icon={<Plus />} href="/map" circular></NavItem>
      <NavItem icon={<Museum />} href="/museum">
        박물관
      </NavItem>
      <NavItem icon={<Crew />} href="/crew">
        크루
      </NavItem>
    </nav>
  );
}

interface NavItemProps {
  icon: ReactNode;
  children?: ReactNode;
  href: string;
  circular?: boolean;
}

function NavItem({ href, children, icon, circular }: NavItemProps) {
  const pathname = usePathname();
  return (
    <Link href={href}>
      <div
        className={
          "flex flex-col font-bold items-center " +
          (pathname === href ? "text-primary-main" : "") +
          (circular ? " bg-black rounded-full p-4 text-white" : "")
        }
        style={
          circular
            ? { width: "80px", height: "80px", justifyContent: "center" }
            : {}
        }
      >
        {icon}
        {!circular && children}
      </div>
    </Link>
  );
}
