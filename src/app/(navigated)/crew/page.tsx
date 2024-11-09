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
  const { data } = useQuery({
    queryKey: ["crewMembers"],
    queryFn: fetchCrewMembers,
  });

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
    if (newMember.nickname && newMember.gender && newMember.phone) {
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
      alert("모든 정보를 입력해주세요!");
    }
  };

  if (!data) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="w-full p-4">
      <h1 className="font-extrabold text-3xl text-center mb-6">크루원 정보</h1>
      <div className="m-10">
        <button
          onClick={(e) => {
            e.stopPropagation(); // 카드 전체의 클릭 이벤트와 분리
          }}
          className="bg-blue-500 text-white px-8 py-4 rounded-lg w-full font-semibold hover:bg-blue-600 transition"
        >
          <Link href="add">
          크루원 추가
          </Link>
        </button>
      </div>
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
              성별: {member.gender == "male" ? "남성" : "여성"}
            </p>
            <p className="text-gray-500">전화번호: {member.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
