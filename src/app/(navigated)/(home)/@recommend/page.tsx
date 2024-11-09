"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Virtual, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Card from "@/components/Card";

import { SwiperContainer } from "swiper/element";

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
        slidesPerView={1.8}
        className="swiper-wrapper mySwiper"
        onSlideChange={(sw) => setTab(sw.activeIndex)}
      >
        {Array.from(Array(5)).map((_, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div
              className="pr-2 pb-8 pt-8 flex items-center justify-center cursor-pointer"
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
