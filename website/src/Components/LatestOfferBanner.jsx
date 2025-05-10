import React, { useState } from 'react'
import iphone from '/iphone16.png'
import womenSummer from '/fashion.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation, Autoplay } from 'swiper/modules';

const OfferBanners = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    {
      id: 1,
      image: iphone,
      title: 'Big saving deal sale',
      heading: "Buy New Trend Women Top | Summer Women's Tops on Sale",
      price: 'Starting at Only $29'
    },
    {
      id: 2,
      image: womenSummer,
      title: 'Big saving deal sale',
      heading: "Buy Iphone 16 (256 GB) | Iphone16 Pro Max",
      price: 'Starting at Only $1099'
    }
  ];
  return (
    <>
      <div className='w-full m-auto md:w-[95%] lg:w-[90%] block lg:flex justify-center items-center gap-[7%] border '>
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className=' offer-banner-swiper group w-[95%] m-auto lg:w-[50%] border'
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="grid grid-cols-2 gap-[15px] bg-emerald-50 items-center p-2">
                <div>
                  <img src={slide.image} alt="" className="w-full lg:p-3 md:p-2 p-1" />
                </div>
                <div
                  className={`
          text-gray-700 transition-all duration-700 ease-in-out transform
          ${activeIndex === index ? 'translate-x-0 opacity-100' : 'translate-x-70 opacity-0'}
        `}
                >
                  <h4 className="px-[5px] py-[10px] lg:px-[10px] lg:py-[15px] text-lg md:text-xl font-[600] text-gray-600 hidden md:block">
                    {slide.title}
                  </h4>
                  <h2 className="px-[5px] py-[10px] lg:px-[10px] lg:py-[15px] text-xl md:text-3xl font-[600]">
                    {slide.heading}
                  </h2>
                  <p className="px-[5px] py-[10px] lg:px-[10px] lg:py-[15px] text-lg md:text-2xl font-[500] text-red-400">
                    {slide.price}
                  </p>
                  <button className="px-[15px] py-[10px] md:text-lg bg-orange-400 rounded-[6px] text-white hover:bg-orange-500 cursor-pointer">
                    Shop Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
        <div className='w-[95%] m-auto lg:w-[30%] border'>

        </div>
      </div>
    </>
  )
}

export default OfferBanners