"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Virtual, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Card from "@/components/Card";

const slideData = [
  {
    id: 1,
    imageUrl: "/dino.png",
    title: "공룡의 위엄",
    likes: 85,
    description:
      "초원의 한가운데에 서 있는 공룡의 장엄한 모습이 고대의 웅장함을 떠올리게 합니다.",
  },
  {
    id: 2,
    imageUrl: "/dog.png",
    title: "초원의 자유로운 친구",
    likes: 120,
    description:
      "푸른 초원 위를 자유롭게 달리는 강아지의 모습이 자연과 조화를 이룬 장면입니다.",
  },

  {
    id: 3,
    imageUrl: "/frog.png",
    title: "연못의 작은 철학자",
    likes: 200,
    description:
      "연못가에 앉아있는 개구리의 유쾌한 표정이 평화로운 자연의 한 순간을 포착하고 있습니다.",
  },
  {
    id: 4,
    imageUrl: "/dog.png",
    title: "햇살 아래의 행복",
    likes: 150,
    description:
      "잔디밭에서 기쁨을 만끽하는 강아지의 모습이 따스한 햇살과 어우러진 장면입니다.",
  },
];

export default function Overviews() {
  const swiper = useRef<SwiperRef>(null);
  const [tab, setTab] = useState(0);

  const handleNextSlide = () => {
    swiper.current?.swiper.slideNext();
  };

  const handlePrevSlide = () => {
    swiper.current?.swiper.slidePrev();
  };

  const handleCardClick = () => {};

  return (
    <div className="relative w-full px-4 pt-16">
      <h1 className="text-3xl font-extrabold">런닝 크루에서<br />완성 중</h1>
      {/* 왼쪽 화살표 버튼 */}
      {tab > 0 && (
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg"
        >
          &larr;
        </button>
      )}

      {/* 오른쪽 화살표 버튼 */}
      {tab < slideData.length - 1 && (
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg"
        >
          &rarr;
        </button>
      )}
      <Swiper
        ref={swiper}
        pagination={true}
        modules={[Virtual, Navigation]}
        virtual={{ enabled: true }}
        slidesPerView={1.8}
        className="swiper-wrapper mySwiper"
        onSlideChange={(sw) => setTab(sw.activeIndex)}
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="px-16 pb-8 pt-8 flex items-center justify-center cursor-pointer"
              onClick={() => handleCardClick()}
            >
              <Card
                imagePath={slide.imageUrl}
                title={slide.title}
                description={slide.description}
              />
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
    </div>
  );
}
