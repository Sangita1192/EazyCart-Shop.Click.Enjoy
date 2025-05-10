import React from 'react'
import ProductItem from './ProductItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const LatestProducts = () => {
    return (
        <>
            <div className='w-full md:w-[95%] lg:w-[95%] px-[15px] m-auto'>
                <h3 className='font-bold text-2xl !text-gray-600'>Latest Products</h3>
                <div className='py-[10px] my-[15px]'>
                    <Swiper
                        spaceBetween={15}
                        slidesPerView={1}
                        loop={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                            1280: {
                                slidesPerView: 6,
                            },
                        }}
                        className="popular-products-slider"
                    >
                        <SwiperSlide><ProductItem /></SwiperSlide>
                        <SwiperSlide><ProductItem /></SwiperSlide>
                        <SwiperSlide><ProductItem /></SwiperSlide>
                        <SwiperSlide><ProductItem /></SwiperSlide>
                        <SwiperSlide><ProductItem /></SwiperSlide>
                        <SwiperSlide><ProductItem /></SwiperSlide>
                        <SwiperSlide><ProductItem /></SwiperSlide>
                        <SwiperSlide><ProductItem /></SwiperSlide>
                        <SwiperSlide><ProductItem /></SwiperSlide>
                    </Swiper>
                </div>
            </div>

        </>
    )
}

export default LatestProducts