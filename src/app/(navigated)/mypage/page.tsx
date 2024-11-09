// pages/mypage.js
import React from "react";

export default function MyPage() {
  // 예시 데이터, 실제로는 API 또는 데이터베이스에서 가져올 수 있습니다.
  const userInfo = {
    name: "홍길동",
    runningRecords: [
      { date: "2024-01-10", distance: "5km", time: "25:34" },
      { date: "2024-02-14", distance: "10km", time: "53:12" },
      { date: "2024-03-02", distance: "3km", time: "15:50" },
    ],
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
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
    </div>
  );
}
