"use client";
import React, { useState, useEffect } from "react";

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

  const handleAccept = (id: number) => {
    setInvitations(
      invitations.map((invitation) =>
        invitation.id === id ? { ...invitation, isHidden: true } : invitation
      )
    );
  };

  const handleDecline = (id: number) => {
    setInvitations(
      invitations.map((invitation) =>
        invitation.id === id ? { ...invitation, isHidden: true } : invitation
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">마이페이지</h1>

      <div className="mb-6">
        <p className="text-lg font-semibold">이름: {userInfo.name}</p>
      </div>

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

      <div>
        <h2 className="text-2xl font-bold mb-4 p-4">초대 요청</h2>
        <div className="space-y-4 p-4">
          {invitations.map(
            (invitation) =>
              !invitation.isHidden && (
                <div
                  key={invitation.id}
                  className="w-full bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {invitation.senderName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        {invitation.senderName}
                      </p>
                      <p className="text-gray-500">
                        크루 이름: {invitation.crewName}
                      </p>
                      <p className="text-gray-500">
                        보낸 날짜: {invitation.sentDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <button
                      onClick={() => handleAccept(invitation.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      수락
                    </button>
                    <button
                      onClick={() => handleDecline(invitation.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      거절
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
