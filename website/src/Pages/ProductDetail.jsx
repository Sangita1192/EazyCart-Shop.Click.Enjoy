import React, { useState } from 'react'
import product1 from '/productImg1.webp';
import product2 from '/productImg2.webp';
import { FaChevronDown, FaChevronUp, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa6';
import { Button } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'
import ProductReview from '../Components/ProductReview';


const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    return (
        <>
            <div className='w-full py-6 pt-8 px-2'>
                <div className='xl:w-[80%] lg:w-[85%] sm:w-[95%] w-full m-auto sm:flex gap-[15px] xl:gap-[25px]'>
                    <div className="sm:w-[40%] flex flex-col-reverse sm:flex-row gap-2 justify-between ">
                        <div className='flex sm:flex-col gap-2 w-[15%] justify-start items-start my-2 sm:my-0'>
                            <img src={product1} alt="" className='shadow-lg rounded-md' />
                            <img src={product2} alt="" className='shadow-lg rounded-md' />
                            <img src={product1} alt="" className='shadow-lg rounded-md' />
                            <img src={product2} alt="" className='shadow-lg rounded-md' />
                        </div>
                        <div className='sm:w-[80%] w-full rounded-md shadow-lg h-[300px] md:h-auto relative'>
                            <InnerImageZoom
                                zoomSrc={product1}
                                src={product1}
                                alt="product Image"
                                zoomType="hover"
                                showZoom={false}
                                zoomPreload={true}
                                className='zoom-full-img w-full h-[100%] rounded-md shadow-lg' />
                        </div>
                    </div>
                    <div className='w-full sm:w-[56%] px-2 text-gray-600'>
                        <h1 className='text-2xl xl:text-4xl font-semibold '>Women in pure cotton saree</h1>
                        <div className='flex justify-start items-center gap-8 xl:mt-2'>
                            <div className='text-sm flex gap-1 xl:text-md'>
                                <span className='text-gray-500 text-sm xl:text-md'>Category:</span>
                                <span className='text-sm xl:text-md'>Fashion</span>
                            </div>
                            <div className='flex gap-2 justify-center text-sm items-center '>
                                <div className="flex gap-1 text-yellow-500 text-sm xl:text-md">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>
                                <span className='text-sm xl:text-md'>(10)</span>
                            </div>

                        </div>
                        <div className='mt-2 text-lg xl:text-2xl flex gap-4 font-semibold xl:mt-4'>
                            <span>$29.99</span>
                            <span className='text-red-600 line-through'>$45.59</span>
                        </div>
                        <p className='mt-2 text-justify xl:text-lg'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente nulla minima architecto sit, ut illo voluptas, saepe delectus magnam fugiat alias. Sequi velit adipisci debitis dolores rem dolorum ex ad.
                        </p>
                        <div className='mt-2 flex gap-4 xl:mt-3'>
                            <span className='uppercase text-lg'>SIZE</span>
                            <div className="flex gap-2">
                                {["S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        // onClick={() => handleSizeChange(size)}
                                        className={`px-3 py-1 rounded-lg text-sm border ${"size" === size
                                            ? "bg-emerald-700 text-white"
                                            : "text-gray-700 border-gray-300"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2 mt-2 xl:mt-3">
                            {["red", "green", "blue"].map((color) => (
                                <button
                                    key={color}
                                    aria-label={`Select color ${color}`}
                                    // onClick={() => handleColorChange(color)}
                                    className={`w-6 h-6 rounded-full border-2 cursor-pointer ${"selectedColor" === color ? "border-black" : "border-gray-300"}`}
                                    style={{ backgroundColor: color }}
                                ></button>
                            ))}
                        </div>
                        <p className='mt-2 mb-3 xl:mt-3'> Free Shipping over $39.99 (Est Delivery in 2-3 days)</p>
                        <div className='flex gap-4 mb-3'>
                            <div className="relative w-20">
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={quantity}
                                    readOnly
                                    className="w-full text-center border border-gray-300 rounded-md py-2 pr-6 focus:outline-none"
                                />
                                <div className="absolute inset-y-0 right-1 flex flex-col justify-center gap-[2px]">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="text-gray-600 hover:text-black"
                                    >
                                        <FaChevronUp size={12} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(quantity - 1)}
                                        className="text-gray-600 hover:text-black"
                                    >
                                        <FaChevronDown size={12} />
                                    </button>
                                </div>
                            </div>

                            <Button className='!flex !gap-2 !justify-center !items-center !bg-amber-500 !cursor-pointer !hover:bg-amber-600 !px-[15px]'>
                                <FaShoppingCart className="inline-block mr-2" size={16} />
                                Add to Cart
                            </Button>
                        </div>
                        <Button className='!mt-2 !flex !gap-2 !curosr-pointer xl:!mt-3'>
                            <FaRegHeart />
                            Add to wishlist
                        </Button>
                    </div>
                </div>
                <div className='xl:w-[80%] lg:w-[85%] sm:w-[95%] w-full m-auto shadow-lg p-2 bg-gray-200/50 mt-4'>
                    <ProductReview/>
                </div>
            </div>
        </>
    )
}

export default ProductDetail