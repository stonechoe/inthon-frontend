'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import 'swiper/css';
import Card from '@/components/Card';

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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </>

  );
};
