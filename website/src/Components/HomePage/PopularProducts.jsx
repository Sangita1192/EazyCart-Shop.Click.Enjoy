import React, { useEffect, useState } from 'react'
import ProductItem from '../ProductItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useSelector } from 'react-redux';
import { fetchPopularProducts } from '../../Api/api';

const PopularProducts = () => {

    const [activeTab, setActiveTab] = useState(null);
    const { categories } = useSelector((state) => state.category);
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        if (categories.length > 0 && !activeTab) {
            setActiveTab(categories[0].name);
            getPopularProducts(categories[0]._id);
        }
    }, [categories, activeTab]);

    const getPopularProducts = async (id) => {
        try {
            const res = await fetchPopularProducts(id);
            setPopularProducts(res.data.products || []);
        }
        catch (error) {
            console.log("error in fetching popular products", error.message);
        }
    }

    return (
        <>
            <div className='bg-[white] md:p-[15px] p-[10px] py-[25px]'>
                <div className='w-full lg:w-[95%] m-auto py-[10px]'>
                    <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-[20px]'>
                        <h3 className='font-bold text-xl !text-gray-600'>Popular Products</h3>
                        <ul className="flex md:gap-4 gap-2 items-center overflow-x-auto scrollbar-hide lg:ml-[5px] ml-[35px]">
                            {categories.length > 0 && categories.map((cat) => (
                                <li key={cat._id}>
                                    <button
                                        onClick={() => {
                                            setActiveTab(cat.name)
                                            getPopularProducts(cat._id)
                                        }}
                                        className={`cursor-pointer pb-2 px-[15px] transition-all duration-200 font-semibold border-b-2 whitespace-nowrap ${activeTab == cat.name
                                            ? "border-red-700 text-red-600"
                                            : "border-transparent text-gray-600 hover:text-red-500 hover:border-red-300"
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='py-[10px] my-[15px]'>
                        {popularProducts.length > 0 && popularProducts.length > 1 && (
                            <Swiper
                                spaceBetween={15}
                                slidesPerView={1}
                                loop={popularProducts.length > 1} 
                                draggable={true}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 },
                                    1280: { slidesPerView: 6 },
                                }}
                                className="popular-products-slider"
                            >
                                {popularProducts.map(prod => (
                                    <SwiperSlide key={prod._id}>
                                        <ProductItem product={prod} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default PopularProducts