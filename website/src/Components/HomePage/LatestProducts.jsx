import React, { useEffect, useState } from 'react'
import ProductItem from '../ProductItem';
import LoadingSpinner from '../LoadingSpinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { fetchLatestProducts } from '../../Api/api';
import { useNavigate } from 'react-router-dom';

const LatestProducts = () => {
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        latestProducts();
    }, [])

    const latestProducts = async () => {
        try {
            setLoading(true);
            const res = await fetchLatestProducts();
            setProduct(res.data.products);
        }
        catch (e) {
            console.log(e.message);
            nav('/');  
        }
        finally{
            setLoading(false);
        }
    }

        return (
            <>
                <div className='w-full md:w-[95%] lg:w-[95%] px-[15px] m-auto'>
                    <h3 className='font-bold text-2xl !text-gray-600'>Latest Products</h3>
                    {loading ?
                        <LoadingSpinner />
                        :
                        product.length > 0 && (
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
                                    {product.map(prod => (
                                        <SwiperSlide key={prod._id}> <ProductItem product={prod}/></SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>)
                    }
                </div>

            </>
        )
    }

export default LatestProducts