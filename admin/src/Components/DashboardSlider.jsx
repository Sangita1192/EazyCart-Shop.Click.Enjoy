import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './../index.css'
import { TbUserSquareRounded } from 'react-icons/tb';
import { MdOutlineProductionQuantityLimits, MdReviews } from 'react-icons/md';
import { BiSolidCartAlt } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { getAllStats } from '../api/statiscticsApi';

const DashBoardSlider = () => {
    const [users, setUser] = useState(0);
    const [products, setProducts] = useState(0);
    const [reviews, setReviews] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        const getStatistics = async () => {
            try {
                const res = await getAllStats();
                setUser(res.data.totalUsers);
                setProducts(res.data.totalProducts);
                setRevenue(formatRevenue(res.data.revenue));
                setReviews(res.data.totalReviews);
            }
            catch (error) {
                console.log(error);
            }
        }
        getStatistics();
    }, [users, products, revenue, reviews]);

    const formatRevenue = (num) => {
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
        return num.toString();
    }
    return (
        <>
            <Swiper
                rewind={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 25 },
                    1280: { slidesPerView: 4, spaceBetween: 30 },
                }}
            >
                <SwiperSlide className='shadow-md rounded-[8px] p-2 border border-1 border-[#ccc] bg-[linear-gradient(to_right,_rgb(34,167,91),_rgb(72,212,131))]'>
                    <div className='grid grid-cols-4 items-center gap-[20px] p-[10px]'>
                        <div className='col-span-3 pl-[15px]'>
                            <h1 className='swipeSlideColor !text-xl'>Total Users</h1>
                            <p className='swipeSlideColor !text-2xl'>{users}</p>

                        </div>
                        <TbUserSquareRounded size={50} />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='shadow-md rounded-[8px] p-2 border border-1 border-[#ccc] bg-[linear-gradient(to_right,_rgb(192,18,226),_rgb(235,100,254))]'>
                    <div className='grid grid-cols-4 items-center gap-[20px] p-[10px]'>
                        <div className='col-span-3 pl-[15px]'>
                            <h1 className='swipeSlideColor !text-xl'>Total Revenue</h1>
                            <p className='swipeSlideColor !text-2xl'>$ {revenue}</p>

                        </div>
                        <BiSolidCartAlt size={50} />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='shadow-md rounded-[8px] p-2 border border-1 border-[#ccc] bg-[linear-gradient(to_right,_rgb(44,120,229),_rgb(96,175,245))]'>
                    <div className='grid grid-cols-4 items-center gap-[20px] p-[10px]'>
                        <div className='col-span-3 pl-[15px]'>
                            <h1 className='swipeSlideColor !text-xl'>Total Products</h1>
                            <p className='swipeSlideColor !text-2xl'>{products}</p>

                        </div>
                        <MdOutlineProductionQuantityLimits size={50} />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='shadow-md rounded-[8px] p-2 border border-1 border-[#ccc] bg-[linear-gradient(to_right,_rgb(225,149,14),_rgb(243,205,41))]'>
                    <div className='grid grid-cols-4 items-center gap-[20px] p-[10px]'>
                        <div className='col-span-3 pl-[15px]'>
                            <h1 className='swipeSlideColor !text-xl'>Total Reviews</h1>
                            <p className='swipeSlideColor !text-2xl'>{reviews}</p>

                        </div>
                        <MdReviews size={50} />
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default DashBoardSlider;