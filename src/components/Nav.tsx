import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center w-full justify-between p-4 bg-primary-500 text-black">
      <div className="font-bold">Logo</div>
      <div className="font-bold">갤러리</div>
      <Link href="/mypage" className="font-bold">
        마이페이지
      </Link>
      <div className="font-bold">Logo</div>
    </nav>
  );
}
