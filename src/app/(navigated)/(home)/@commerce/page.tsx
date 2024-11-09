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
    id: 10,
    imageUrl: "/image/nike.jpg",
    title: "나이키 에어맥스 270",
    likes: 85,
    description:
      "스포티한 디자인과 편안한 쿠셔닝이 돋보이는 나이키 에어맥스 270은 일상과 운동을 모두 아우르는 스타일을 제공합니다.",
    linkUrl: "https://www.nike.com/w/air-max-270-shoes-5ix6dzy7ok",
  },
  {
    id: 20,
    imageUrl: "/image/adidas.jpeg",
    title: "아디다스 울트라부스트",
    likes: 120,
    description:
      "최상의 반발력과 편안함을 제공하는 아디다스 울트라부스트는 러닝을 위한 최고의 선택지입니다. 장거리 러닝에서도 뛰어난 착화감을 자랑합니다.",
    linkUrl: "https://www.adidas.co.kr/울트라부스트-1.0-/HQ4201.html",
  },
  {
    id: 30,
    imageUrl: "/image/newbalance.jpeg",
    title: "뉴발란스 990",
    likes: 200,
    description:
      "클래식한 디자인과 편안한 착화감을 자랑하는 뉴발란스 990은 패션과 실용성을 겸비한 아이템으로 오랜 사랑을 받고 있습니다.",
    linkUrl: "https://www.newbalance.com",
  },
  {
    id: 40,
    imageUrl: "/image/reebok.jpeg",
    title: "리복 클럽 C 85",
    likes: 150,
    description:
      "심플하고 세련된 디자인의 리복 클럽 C 85는 캐주얼 룩에 잘 어울리는 스니커즈로, 다양한 스타일에 쉽게 매치할 수 있습니다.",
    linkUrl: "https://www.reebok.com",
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
    <div className="relative">
      <div className="w-full px-8 mt-8">
        <h1 className="text-3xl font-extrabold">핫 아이템</h1>
      </div>
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
        slidesPerView={1.4}
        className="mySwiper"
        onSlideChange={(sw) => setTab(sw.activeIndex)}
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="px-16 pb-8 pt-8 flex items-center justify-center cursor-pointer"
              onClick={() => handleCardClick()}
            >
              <Card
                isShare={false}
                imagePath={slide.imageUrl}
                title={slide.title}
                description={slide.description}
                linkUrl={slide.linkUrl}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
