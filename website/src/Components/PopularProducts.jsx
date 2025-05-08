import React, { useState } from 'react'
import ProductItem from './ProductItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';     
         
 

const PopularProducts = () => {
    const [activeTab, setActiveTab] = useState("Fashion");

    const tabs = ["Fashion", "Electronics", "Bags", "Footwear", "Jewellery", "Beauty", "Wellness"];
    return (
        <>
            <div className='bg-[white] md:p-[15px] p-[10px] py-[25px]'>
                <div className='w-full lg:w-[95%] m-auto py-[10px]'>
                    <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-[20px]'>
                        <h3 className='font-bold text-xl !text-gray-600'>Popular Products</h3>
                        <ul className="flex md:gap-4 gap-2 items-center overflow-x-auto scrollbar-hide lg:ml-[5px] ml-[35px]">
                            {tabs.map((tab) => (
                                <li key={tab}>
                                    <button
                                        onClick={() => setActiveTab(tab)}
                                        className={`cursor-pointer pb-2 px-[15px] transition-all duration-200 font-semibold border-b-2 ${activeTab === tab
                                            ? "border-red-700 text-red-600"
                                            : "border-transparent text-gray-600 hover:text-red-500 hover:border-red-300"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
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
            </div>
        </>
    )
}

export default PopularProducts