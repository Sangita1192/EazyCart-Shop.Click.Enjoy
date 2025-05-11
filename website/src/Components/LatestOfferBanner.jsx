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
      heading: "Buy New Trending Women's Top",
      price: 'Starting at Only $29'
    },
    {
      id: 2,
      image: womenSummer,
      title: 'Big saving deal sale',
      heading: "Buy Iphone 16 (256 GB | 512 GB)",
      price: 'Starting at Only $1099'
    }
  ];
  return (
    <>
      <div className='w-full m-auto md:w-[95%] my-[15px] lg:my-[0px] lg:w-[90%] block lg:flex justify-center gap-[4%] lg:h-[420px] '>
        <div className='w-[95%] m-auto lg:w-[60%] rounded-[6px] border border-amber-300 h-[280px] lg:h-full'>
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
            className=' offer-banner-swiper group h-full'
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id} className='h-full'>
                <div className="grid grid-cols-2 gap-[20px] bg-emerald-50 items-center p-2 rounded-[6px] h-full">
                  <div>
                    <img src={slide.image} alt="" className="w-full lg:p-3 md:p-2 p-1 object-contain" />
                  </div>
                  <div
                    className={`
          text-gray-700 h-full transition-all duration-700 ease-in-out transform
          ${activeIndex === index ? 'translate-x-0 opacity-100' : 'translate-x-70 opacity-0'}
        `}
                  >
                    <h4 className="px-[5px] py-[10px] lg:px-[10px] lg:py-[15px] text-lg lg:text-xl font-[600] text-gray-600 hidden md:block">
                      {slide.title}
                    </h4>
                    <h2 className="px-[5px] py-[10px] lg:px-[10px] lg:py-[15px] text-xl md:text-3xl font-[600]">
                      {(slide.heading).slice(0, 45)}
                    </h2>
                    <p className="px-[5px] py-[10px] lg:px-[10px] lg:py-[15px] text-lg md:text-2xl font-[500] text-red-400">
                      {slide.price}
                    </p>
                    <button className="px-[15px] py-[10px]  md:text-lg bg-orange-400 rounded-[6px] text-white hover:bg-orange-500 cursor-pointer">
                      Shop Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='w-[95%] m-auto lg:w-[40%] sm:flex lg:flex-col  justify-between gap-[10px] mt-[10px] lg:mt-0 lg:h-full'>          
          <div className='h-full sm:h-[48%] w-full grid grid-cols-2 gap-[15px] bg-pink-50 items-center p-2 border border-amber-300 rounded-[6px]'>
            <div className='h-[155px] sm:h-full w-full '>
              <img src={womenSummer} alt="offer" className='object-contain w-full xl:w-auto h-full rounded-[6px] m-auto' />
            </div>
            <div className='h-full'>
              <h1 className='text-xl font-[600] text-gray-700'>Buy women products with low price</h1>
              <p className='text-red-500 font-bold text-lg my-[10px]'>Upto 70% Off</p>
              <button className='font-[600] !uppercase underline  cursor-pointer hover:!text-amber-500'>
                Shop Now
              </button>
            </div>
          </div>
          <div className='h-full sm:h-[48%] w-full grid grid-cols-2 gap-[15px] bg-pink-50 items-center p-2 border border-amber-300 mt-[10px] rounded-[6px]'>
            <div className='h-[155px] sm:h-full'>
              <img src={womenSummer} alt="offer" className='object-contain h-full w-full xl:w-auto m-auto rounded-[6px]' />
            </div>
            <div className='h-full'>
              <h1 className='text-xl font-[600] text-gray-700'>Buy women products with low price</h1>
              <p className='text-red-500 font-bold text-lg my-[10px]'>Upto 70% Off</p>
              <button className='font-[600] !uppercase underline  cursor-pointer hover:!text-amber-500'>
                Shop Now
              </button>
            </div>
          </div>
         
        </div>
      </div>
    </>
  )
}

export default OfferBanners