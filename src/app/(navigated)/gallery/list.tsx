'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import 'swiper/css';
import Card from '@/components/Card';
import Frame from '@/components/Frame';

export default function Overviews() {
  const swiper = useRef<SwiperRef>(null);
  const [tab, setTab] = useState(0);

  // const handleTabChange = (index: number) => {
  //   setTab(index);
  //   swiper?.current?.swiper.slideTo(index);
  // };


  return (
    <>
    
      {tab}

      <Swiper
        ref={swiper}
        pagination={true}
        modules={[Virtual]}
        virtual={{ enabled: true }}
        className="mySwiper"
        onSlideChange={(sw) => setTab(sw.activeIndex)}
      >
        {Array.from(Array(5)).map((_, index) => (
          <SwiperSlide key={index}>
            <div className="px-16 pb-8 pt-8">
              <Link href={"/TODO"}>
                <Card />
              </Link>
              작품명 : 공룡
              작가: 김지수, 김지원, 김지훈
                <p className="text-gray-600 mt-2">
                이 작품은 공룡을 주제로 한 창작물로, 김지수, 김지원, 김지훈 작가의 협업을 통해 탄생했습니다. 
                공룡의 생동감 넘치는 모습을 통해 자연의 경이로움을 표현하고자 했습니다.
              </p>
              <div>
                <Frame />
                <Link href="/gallery/detail">자세히 보기</Link>
                <button className="ml-4">
                  공유하기
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </>

  );
};
