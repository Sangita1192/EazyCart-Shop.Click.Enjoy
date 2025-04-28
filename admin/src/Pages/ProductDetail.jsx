import React from 'react'
import { IoMdPricetags, IoMdSettings } from 'react-icons/io'
import { MdCategory, MdPublish, MdReviews } from 'react-icons/md'
import product from "/Images/profile.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ImageZoom from "react-image-zooom";

const ProductDetail = () => {
    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Product Detail</h1>
            </div>
            <div className="rounded-[8px] border border-gray-200 shadow-lg bg-white md:p-[40px] p-[30px]">
                <div className="grid grid-cols-5 gap-4">
                    <div className='col-span-2 p-2'>
                        <div className="w-full lg:h-[400px] h-[300px] overflow-hidden relative">
                            <ImageZoom
                                src={product}
                                alt="A image to apply the ImageZoom plugin"
                                className="!w-full !h-full object-contain"
                            />
                            <span className='bg-blue-600 text-white absolute top-[5px] left-[5px] p-[3px] rounded-lg'>10%</span>
                        </div>
                        <Swiper
                            rewind={true}
                            navigation={true}
                            modules={[Navigation]}
                            className='my-[10px] mt-[15px]'
                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 10 },
                                640: { slidesPerView: 2, spaceBetween: 10 },
                                1024: { slidesPerView: 3, spaceBetween: 10 },
                                1280: { slidesPerView: 4, spaceBetween: 10 },
                            }}
                        >
                            <SwiperSlide>
                                <img src={product} alt="" className='w-full' />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={product} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={product} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={product} alt="" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className='col-span-3 p-2'>
                        <h1 className='text-2xl font-bold'>Lay's American Style Cream & Onion Potato Chips 82 g vhjj</h1>
                        <p className='text-[#5E5D72] pt-[10px]'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam quam impedit corporis saepe perferendis eligendi provident rem et libero iusto! Odio, quibusdam. Voluptatum explicabo, adipisci odio inventore quaerat deserunt ipsam?
                        </p>
                        <div className='grid grid-cols-4 text-[#5E5D72] items-center mt-[15px]'>
                            <div className='flex justify-center items-center gap-2 my-[10px] text-lg'>
                                <MdCategory />
                                <p>Category</p>
                                <span className='ml-auto pr-[15px]'>:</span>
                            </div>
                            <div className='col-span-3'>
                                <p>Category</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 text-[#5E5D72] items-center'>
                            <div className='flex justify-center items-center gap-2 my-[10px] text-lg'>
                                <IoMdSettings />
                                <p>Size</p>
                                <span className='ml-auto pr-[15px]'>:</span>
                            </div>
                            <div className='col-span-3'>
                                <p>Category</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 text-[#5E5D72] items-center'>
                            <div className='flex justify-center items-center gap-2  my-[10px] text-lg'>
                                <IoMdPricetags />
                                <p>Price</p>
                                <span className='ml-auto pr-[15px]'>:</span>
                            </div>
                            <div className='col-span-3'>
                                <p>Category</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 text-[#5E5D72] items-center'>
                            <div className='flex justify-center items-center gap-2  my-[10px] text-lg'>
                                <MdReviews />
                                <p>Review</p>
                                <span className='ml-auto pr-[15px]'>:</span>
                            </div>
                            <div className='col-span-3'>
                                <p>Category</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 text-[#5E5D72] items-center'>
                            <div className='flex justify-center items-center gap-2 my-[10px] text-lg'>
                                <MdPublish />
                                <p>Publish</p>
                                <span className='ml-auto pr-[15px]'>:</span>
                            </div>
                            <div className='col-span-3'>
                                <p>Category</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail