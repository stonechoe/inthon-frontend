'use client';

// pages/mypage.js
import React, {useState} from "react";
import Link from "next/link";

export default function MyPage() {
  const userInfo = {
    name: "홍길동",
    runningRecords: [
      { date: "2024-01-10", distance: "5km", time: "25:34" },
      { date: "2024-02-14", distance: "10km", time: "53:12" },
      { date: "2024-03-02", distance: "3km", time: "15:50" },
    ],
  };

  const [invitations, setInvitations] = useState([
    {
      id: 1,
      senderName: "김민지",
      crewName: "러닝크루",
      sentDate: "2024-01-12",
      isHidden: false,
    },
    {
      id: 2,
      senderName: "정진욱",
      crewName: "하이킹크루",
      sentDate: "2024-02-20",
      isHidden: false,
    },
  ]);

  
  const handleAccept = (id : number) => {
    setInvitations(
      invitations.map((invitation) =>
        invitation.id === id ? { ...invitation, isHidden: true } : invitation
      )
    );
  };

  const handleDecline = (id : number) => {
    setInvitations(
      invitations.map((invitation) =>
        invitation.id === id ? { ...invitation, isHidden: true } : invitation
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Link href="/logout">로그아웃</Link>
      <h1 className="text-3xl font-bold mb-4">마이페이지</h1>
      {/* 사용자 정보 */}
      <div className="mb-6">
        <p className="text-lg font-semibold">이름: {userInfo.name}</p>
      </div>
      {/* 달리기 기록 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">달리기 기록</h2>
        <ul className="space-y-3">
          {userInfo.runningRecords.map((record, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-lg">
              <p className="text-md font-semibold">날짜: {record.date}</p>
              <p className="text-md">거리: {record.distance}</p>
              <p className="text-md">시간: {record.time}</p>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/anotherpage">
        <p className=" font-bold mb-4 mt-4 cursor-pointer">초대 수락하기</p>
      </Link>{" "}
    </div>
  );
}
