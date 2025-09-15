import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation, Autoplay } from 'swiper/modules';
import { fetchMiddleBanners } from '../../Api/api';

const OfferBanners = () => {

  const [middleBanners, setMiddleBanners] = useState([]);
  const [sideBanner, setSideBanner] = useState([])

  useEffect(() => {
    getMiddleBanners();
  }, []);

  const getMiddleBanners = async () => {
    try {
      const res = await fetchMiddleBanners();
      setMiddleBanners(res.data.banners);
      setSideBanner(res.data.banners.slice(0, 2));
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='w-full m-auto md:w-[95%] my-[15px] lg:my-[0px] lg:w-[90%] block lg:flex justify-center gap-[4%] lg:h-[420px] '>
        {middleBanners.length > 1 &&
          <>
            <div className='w-[95%] m-auto lg:w-[60%] rounded-lg h-[280px] lg:h-full p-0 overflow-hidden'>
              <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Navigation, Autoplay]}
                className='offer-banner-swiper group h-full'
              >
                {middleBanners.map((slide) => (
                  <SwiperSlide key={slide._id} className='h-full'>
                    <div className="flex flex-col lg:flex-row h-full rounded-lg overflow-hidden">

                      <div className="w-full lg:w-1/2 h-48 lg:h-full">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-full lg:w-1/2 h-full bg-black/20 flex flex-col justify-center items-center text-center p-6 space-y-4">
                        <h4 className="text-lg lg:text-2xl font-semibold text-[#f5f5f5]  drop-shadow-md !capitalize">
                          {slide.title}
                        </h4>
                        <h2 className="text-xl md:text-2xl font-bold text-[#f5f5f5]  drop-shadow-md">
                          {slide.description}
                        </h2>
                        <button
                          className="px-5 py-2 md:text-lg bg-orange-400 rounded-lg text-white hover:bg-orange-500 mt-5"
                          onClick={() => window.location.href = slide.link}>
                          Shop Now
                        </button>
                      </div>

                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className='w-[95%] m-auto lg:w-[40%] sm:flex lg:flex-col  justify-between gap-[10px] mt-[10px] lg:mt-0 lg:h-full'>
              {sideBanner.map(banner => (
                <div key={banner._id}
                  className="shadow-lg rounded-lg bg-[#DBDCF1] relative overflow-hidden h-[250px] cursor-pointer group"
                  onClick={() => window.location.href = banner.link}
                >
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4 !capitalize">
                    <h1 className="text-xl lg:text-3xl font-semibold text-white drop-shadow-md">
                      {banner.title}
                    </h1>
                    <p className="text-[silver] font-bold text-md my-2 drop-shadow">
                      {banner.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* <div className='h-full sm:h-[48%] w-full grid grid-cols-2 gap-[15px] bg-pink-50 items-center p-2 border border-amber-300 mt-[10px] rounded-[6px]'>
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
              </div> */}

            </div>
          </>

        }
      </div>
    </>
  )
}

export default OfferBanners