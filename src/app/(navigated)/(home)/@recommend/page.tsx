"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Virtual, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Card from "@/components/Card";

export default function Overviews() {
  const swiper = useRef<SwiperRef>(null);
  const [tab, setTab] = useState(0);

  const handleNextSlide = () => {
    swiper.current?.swiper.slideNext();
  };

  const handlePrevSlide = () => {
    swiper.current?.swiper.slidePrev();
  };

  const handleCardClick = () => {
    window.location.href = "/TODO"; // 페이지 이동
  };

  return (
    <div className="relative">
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
      {tab < 4 && (
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
        className="mySwiper"
        onSlideChange={(sw) => setTab(sw.activeIndex)}
      >
        {Array.from(Array(5)).map((_, index) => (
          <SwiperSlide key={index}>
            <div
              className="px-16 pb-8 pt-8 flex items-center justify-center cursor-pointer"
              onClick={handleCardClick}
            >
              <Card
                imagePath="/dog.png"
                title="댕댕이 코스"
                description="강아지 모양 코스를 달려보세요"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
