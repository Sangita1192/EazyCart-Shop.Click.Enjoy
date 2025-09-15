import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import banner from '/banner.jpg';

import { Navigation, Autoplay } from 'swiper/modules';
import { fetchHomeSlider } from '../../Api/api';

const HomeSlider = () => {

    const [banners, setBanners] = useState([]);

    useEffect(() => {
        fetchHomeBanners();
    }, []);

    const fetchHomeBanners = async () => {
        try {
            const res = await fetchHomeSlider();
            setBanners(res.data.banners);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='w-full !overflow-x-hidden'>
                <div className='w-[80%] m-auto'>
                    {banners.length > 0 &&
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            loop={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            modules={[Navigation, Autoplay]}
                            className="!w-auto lg:h-[400px] md:h-[300px] h-[250px] sliderHome"
                        >
                            {banners.map(banner => (
                                <SwiperSlide
                                    key={banner._id}
                                    className='border border-1 border-gray-300 rounded-[12px] relative'
                                >
                                    <img
                                        src={banner.image}
                                        alt={banner.name}
                                        className='rounded-[12px] w-full h-full object-fit-cover'
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4 rounded-[12px]">
                                        <h1 className="text-3xl font-bold drop-shadow-md !capitalize">{banner.title}</h1>
                                        <p className="mt-2 text-1xl">{banner.description}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    }
                </div>
            </div>

        </>
    )
}

export default HomeSlider