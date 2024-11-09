"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("닉네임:", nickname);
    console.log("성별:", gender);
    router.push("/");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
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
