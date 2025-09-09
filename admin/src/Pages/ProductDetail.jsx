import React, { useEffect, useState } from 'react'
import { IoMdPricetags, IoMdSettings } from 'react-icons/io'
import { MdCategory, MdPublish, MdReviews } from 'react-icons/md'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ImageZoom from "react-image-zooom";
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../api/productApi';

const ProductDetail = () => {
    const { id } = useParams();

    const [selectedImg, setSelectedImg] = useState();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState();

    useEffect(() => { if (id) getProductDetail(id) }, [id])

    const getProductDetail = async (id) => {
        setLoading(true);
        setError(null);
        setProduct(null);
        try {
            const res = await fetchProduct(id);
            if (!res?.data?.product) {
                throw new Error('Product not found');
            }
            setProduct(res?.data?.product);

        } catch (error) {
            setError(error.message || 'Failed to load product.');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p className="text-center p-10 text-blue-500">Loading product details...</p>;
    }

    if (error) {
        return <p className="text-center p-10 text-red-500">{error}</p>;
    }

    if (!product) {
        return <p className="text-center p-10 text-gray-500">No product found.</p>;
    }

    return (
        <>
            <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5 flex justify-between">
                <h1 className='text-2xl font-bold'>Product Detail</h1>
            </div>
            <div className="rounded-[8px] border border-gray-200 shadow-lg bg-white md:p-[40px] p-[30px]">
                <div className="grid grid-cols-5 gap-4">
                    <div className='col-span-2 p-2'>
                        <div className="w-full aspect-[4/3] overflow-hidden relative">
                            <ImageZoom
                                src={selectedImg || product.images?.[0]}
                                alt="Product"
                                className="w-full h-full object-cover"
                            />
                              <span className='bg-blue-600 text-white absolute top-[5px] left-[5px] p-[3px] rounded-lg'>{product?.discount}%</span>
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
                        {product.images?.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <img src={img} alt={product?.img - idx} className='w-[90px] h-[70px]' onClick={(e)=>setSelectedImg(img)} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className='col-span-3 p-2'>
                    <h1 className='text-2xl font-bold capitalize'>{product?.name}</h1>
                    <p className='text-[#5E5D72] pt-[10px]'>
                        {product.description}
                    </p>
                    <div className='grid grid-cols-4 text-[#5E5D72] items-center mt-[15px]'>
                        <div className='flex justify-center items-center gap-2 my-[10px] text-lg'>
                            <MdCategory />
                            <p>Category</p>
                            <span className='ml-auto pr-[15px]'>:</span>
                        </div>
                        <div className='col-span-3'>
                            <p>{product?.category?.name}</p>
                        </div>
                    </div>
                    {product.size.length > 0 &&
                        <div className='grid grid-cols-4 text-[#5E5D72] items-center'>
                            <div className='flex justify-center items-center gap-2 my-[10px] text-lg'>
                                <IoMdSettings />
                                <p>Size</p>
                                <span className='ml-auto pr-[15px]'>:</span>
                            </div>
                            <div className="col-span-3 flex gap-2 flex-wrap">
                                {product?.size?.map((size) => (
                                    <span key={size._id} className="px-2 py-1 bg-gray-200 rounded">
                                        {size.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    }
                    {product.color.length > 0 &&

                        <div className='grid grid-cols-4 text-[#5E5D72] items-center'>
                            <div className='flex justify-center items-center gap-2 my-[10px] text-lg'>
                                <IoMdSettings />
                                <p>Color</p>
                                <span className='ml-auto pr-[15px]'>:</span>
                            </div>
                            <div className="col-span-3 flex gap-2 flex-wrap">
                                {product?.color?.map((color) => (
                                    <span key={color._id} className="px-2 py-1 bg-gray-200 rounded">
                                        {color.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    }
                    <div className='grid grid-cols-4 text-[#5E5D72] items-center'>
                        <div className='flex justify-center items-center gap-2  my-[10px] text-lg'>
                            <IoMdPricetags />
                            <p>Price</p>
                            <span className='ml-auto pr-[15px]'>:</span>
                        </div>
                        <div className='col-span-3'>
                            <p>$ {product?.price}</p>
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
                </div>
            </div>
        </div >
        </>
    )
}

export default ProductDetail