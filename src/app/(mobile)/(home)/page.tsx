function Card() {
  return <div className="rounded-lg shadow-lg w-full">
    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
    <div className="p-4">
      <div className="font-bold">코스 이름</div>
      <div className="text-sm text-gray-500">코스 설명</div>
    </div>
  </div>
}

export default function HomePage() {
  return (<div className="w-full h-full">

    오늘의 추천 코스
    <Card />

  </div>);
};
