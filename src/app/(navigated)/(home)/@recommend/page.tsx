"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Virtual, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Card from "@/components/Card";
import { authInstance } from "@/util/instance";
import { useQuery } from "@tanstack/react-query";

interface CardProps {
  identifier: string;
  name: string;
  total_distance: number;
  estimated_required_minute: number;
  creator_identifier: string;
  created_date: string;
  last_modified_date: string;
}

async function fetchAllPaths() {
  return await authInstance.get("/paths").then((res) => res.data) as CardProps[];
}

// const handleGalleryClick = (card: CardProps) => {
//   const { id, imageUrl, title, likes, description } = card;

//   window.location.href = `/abstract?id=${id}&imageUrl=${imageUrl}&title=${encodeURIComponent(
//     title
//   )}&likes=${likes}&description=${encodeURIComponent(description)}`;
// };


export default function Overviews() {
  const swiper = useRef<SwiperRef>(null);
  const [tab, setTab] = useState(0);
  const { data } = useQuery({
    queryKey: ["allpath"],
    queryFn: fetchAllPaths
  });

  const handleNextSlide = () => {
    swiper.current?.swiper.slideNext();
  };

  const handlePrevSlide = () => {
    swiper.current?.swiper.slidePrev();
  };

  const handleCardClick = () => { };
  
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative px-8 mt-4">
      <h1 className="text-3xl font-extrabold">주간 인기 코스</h1>
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
      {tab < data.length - 1 && (
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
        {data.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="px-8 pb-8 pt-8 flex items-center justify-center cursor-pointer"
              onClick={() => handleCardClick()}
            >
              <Card
                imagePath='/images/adidas.jpeg'
                title='title'
                description='description'
                // onClick={() => handleGalleryClick(slide)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
