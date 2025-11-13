import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

import { Navigation } from 'swiper/modules';
import { useNavigate, useParams } from 'react-router-dom';
import { getRelatedProducts } from '../Api/api';
import { showError } from '../services/toastService';
import ProductItemBase from './ProductitemBase';

const RelatedProducts = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (id) handleRelatedProducts();
    }, [id])

    const handleRelatedProducts = async () => {
        try {
            const res = await getRelatedProducts(id);
            setRelatedProducts(res.data.relatedProducts);
        }
        catch (error) {
            showError(error.message || "something went wrong");
            nav('/');
        }
    }
    return (
        <>
            <div className='w-full'>
                <div className='flex justify-between items-center'>
                    <h1 className='xl:text-2xl md:text-xl text-lg'>Related Products</h1>
                    <div className="swiper-navigation-related-products flex items-center gap-2 mt-[10px] justify-center">
                        <button className="swiper-prev">
                            <MdOutlineKeyboardArrowLeft size={35} />
                        </button>
                        <button className="swiper-next">
                            <MdOutlineKeyboardArrowRight size={35} />
                        </button>
                    </div>
                </div>
                {relatedProducts.length > 0 &&
                    <div className='py-[10px] my-[15px]'>
                        <Swiper
                            spaceBetween={15}
                            slidesPerView={1}
                            loop={true}
                            breakpoints={{
                                500: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                                1280: {
                                    slidesPerView: 5,
                                },
                                1440: {
                                    slidesPerView: 6,
                                },
                            }}
                            navigation={{
                                nextEl: '.swiper-next',
                                prevEl: '.swiper-prev',
                            }}
                            modules={[Navigation]}
                        >
                            {relatedProducts.map(prod => (
                                <SwiperSlide key={prod._id}><ProductItemBase key={prod._id} product={prod}/></SwiperSlide>
                            ))}

                        </Swiper>
                    </div>
                }
            </div>

        </>
    )
}

export default RelatedProducts