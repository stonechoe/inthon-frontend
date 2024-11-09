"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface CrewMember {
  identifier: string,
  nickname: string,
  gender: string;
}

// 샘플 데이터 (실제 데이터는 API 호출로 대체)
const sampleData : CrewMember[] = [
  {
    identifier: '1',
    nickname: "노태윤",
    gender: "male",
    // phone: "010-1234-5678",
  },
  {
    identifier: '2',
    nickname: "김민지",
    gender: "female",
    // phone: "010-9876-5432",
  },
  {
    identifier: '3',
    nickname: "도민준",
    gender: "male",
    // phone: "010-9876-5432",
  },
  {
    identifier: '4',
    nickname: "정진욱",
    gender: "male",
    // phone: "010-9876-5432",
  },
];

async function fetchCrewMembers() : Promise<CrewMember[]> {
  return sampleData;
}


export default function CrewPage() {
  const [members, setMembers] = useState(sampleData);
  const [isadd, setIsAdd] = useState(false);
  const [newMember, setNewMember] = useState({
    nickname: "",
    gender: "",
    phone: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAddMember = () => {
    if (newMember.phone) {
      setMembers([
        ...members,
        {
          identifier: members.length + 1,
          nickname: newMember.nickname,
          gender: newMember.gender,
          phone: newMember.phone,
        },
      ]);
      setNewMember({ nickname: "", gender: "", phone: "" }); // 입력 후 초기화
    } else {
      alert("정보를 입력해주세요!");
    }
  };

  if (!data) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="w-full p-4">
      <h1 className="font-extrabold text-3xl text-center mb-6">크루원 정보</h1>

      {/* 크루원 추가 섹션 */}
      {isadd ? (
        <div className="m-10 p-12 border rounded-lg bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">크루원 추가하기</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="phone"
              placeholder="전화번호"
              value={newMember.phone}
              onChange={handleInputChange}
              className="p-2 border rounded-lg"
            />
            <button
              onClick={handleAddMember}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              추가하기
            </button>
          </div>
        </div>
      ) : (
        <div className="m-10 p-12 flex justify-center items-center">
          <button
            onClick={() => setIsAdd(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            크루 추가하기
          </button>
        </div>
      )}

      {/* 크루원 목록 */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {data.map((member) => (
          <div
            key={member.identifier}
            className="w-96 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
          >
            <p className="text-xl font-semibold mb-2">
              닉네임: {member.nickname}
            </p>
            <p className="text-gray-700">
              성별: {member.gender === "male" ? "남성" : "여성"}
            </p>
            <p className="text-gray-500">전화번호: {member.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
