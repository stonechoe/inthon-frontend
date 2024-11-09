export default function Card() {
  return <div className="rounded-lg shadow-lg w-full">
    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
    <div className="p-4">
      <div className="font-bold">코스 이름</div>
      <div className="text-sm text-gray-500">코스 설명</div>
    </div>
  </div>
}