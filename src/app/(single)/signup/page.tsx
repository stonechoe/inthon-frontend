"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { instance } from "@/util/instance";
import { AxiosResponse } from "axios";

interface SignupRes {
  identifier: string;
  gender: string;
  nickname: string;
  phone: string;
}

export default function SignupForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const code = sp.get("code");

  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");



  if (!code) {
    return <div>로그인 실패 - 카카오 로그인으로 시도하세요</div>;
  }
  
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    instance.post('/users/signup', {
        kakao_auth_token: code,
        nickname,
        gender,
        phone,
    }).then((res: AxiosResponse<SignupRes>) => {
      alert('회원가입에 성공했습니다.');
      router.push("/");
    }).catch((err) => {
      alert('회원가입에 실패했습니다. ' + err.status);

     })
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">가짜 회원가입</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 닉네임 입력 */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="nickname"
          >
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="닉네임을 입력하세요"
            required
          />
        </div>

        {/* 성별 선택 */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">성별</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                className="mr-2"
                required
              />
              남성
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                className="mr-2"
                required
              />
              여성
            </label>
          </div>
        </div>

        {/* 전화번호 입력 */}
        {/* 닉네임 입력 */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="phone"
          >
            전화번호
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="전화번호를 입력하세요"
            required
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
