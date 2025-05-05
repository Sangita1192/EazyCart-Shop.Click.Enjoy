import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import banner from './../../public/banner.jpg';

import { Navigation, Autoplay } from 'swiper/modules';

const HomeSlider = () => {
    return (
        <>
            <div className='w-full !overflow-x-hidden'>
                <div className='w-[80%] m-auto'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                        navigation={true}
                        modules={[Navigation,Autoplay]}
                        className="!w-auto lg:h-[400px] md:h-[300px] h-[250px] sliderHome"
                    >
                        <SwiperSlide className='border border-1 border-gray-300 rounded-[12px]'>
                            <img src={banner} alt="" className='rounded-[12px] w-full h-full object-fit-cover' />
                        </SwiperSlide>
                        <SwiperSlide className='border border-1 border-gray-300 rounded-[12px]'>
                            <img src={banner} alt="" className='rounded-[12px] w-full h-full object-fit-cover' />
                        </SwiperSlide>
                        <SwiperSlide className='border border-1 border-gray-300 rounded-[12px]'>
                            <img src={banner} alt="" className='rounded-[12px] w-full h-full object-fit-cover' />
                        </SwiperSlide>
                        <SwiperSlide className='border border-1 border-gray-300 rounded-[12px]'>
                            <img src={banner} alt="" className='rounded-[12px] w-full h-full object-fit-cover' />
                        </SwiperSlide>
                        <SwiperSlide className='border border-1 border-gray-300 rounded-[12px]'>
                            <img src={banner} alt="" className='rounded-[12px] w-full h-full object-fit-cover' />
                        </SwiperSlide>
                        <SwiperSlide className='border border-1 border-gray-300 rounded-[12px]'>
                            <img src={banner} alt="" className='rounded-[12px] w-full h-full object-fit-cover' />
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div>

        </>
    )
}

export default HomeSlider