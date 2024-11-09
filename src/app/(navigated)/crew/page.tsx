"use client";
import { useState, useEffect } from "react";

// 샘플 데이터 (실제 데이터는 API 호출로 대체)
const sampleData = [
  {
    identifier: 1,
    nickname: "노태윤",
    gender: "male",
    phone: "010-1234-5678",
  },
  {
    identifier: 2,
    nickname: "김민지",
    gender: "female",
    phone: "010-9876-5432",
  },
  {
    identifier: 3,
    nickname: "도민준",
    gender: "male",
    phone: "010-9876-5432",
  },
  {
    identifier: 4,
    nickname: "정진욱",
    gender: "male",
    phone: "010-9876-5432",
  },
];

export default function CrewPage() {
  const [members, setMembers] = useState<
    {
      identifier: number;
      nickname: string;
      gender: string;
      phone: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = sampleData; // 예시 데이터를 사용
      setMembers(data);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full p-4">
      <h1 className="font-extrabold text-3xl text-center mb-6">크루원 정보</h1>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {members.map((member) => (
          <div
            key={member.identifier}
            className="w-96 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
          >
            <p className="text-xl font-semibold mb-2">
              닉네임: {member.nickname}
            </p>
            <p className="text-gray-700">
              성별: {member.gender == "male" ? "남성" : "여성"}
            </p>
            <p className="text-gray-500">전화번호: {member.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
