import React, { useState } from 'react'
import { FaExpandArrowsAlt, FaShareAlt, FaShoppingCart } from 'react-icons/fa';
import { FaRegHeart, FaStar } from 'react-icons/fa6';
import product1 from '/productImg1.webp';
import product2 from '/productImg2.webp';

const ProductItemWithDesc = () => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        setQuantity(0);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setQuantity(0);
    };
    return (
        <>
            <div className='border-gray-200 p-2 rounded-md bg-[#f5f5f5] flex gap-2 mb-[15px]'>
                <div className="flex-shrink-0 h-[200px] sm:h-[300px] bg-white cursor-pointer rounded-md overflow-hidden relative group">
                    <img
                        src={product1}
                        alt="Product"
                        className="h-full w-auto object-contain"
                    />
                

                {/* Hover Image */}
                <img
                        src={product2}
                        alt="Product Hover"
                        className="w-auto h-full absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />

                {/* Discount Tag */}
                <span className='absolute top-[3%] left-[3%] bg-red-500 text-white px-3 py-1 rounded-lg text-sm'>
                        10 %
                    </span>

                {/* Floating Icons */}
                <div className='absolute top-[8%] right-[2%] flex flex-col gap-2 opacity-0 -translate-y-4 
                  group-hover:opacity-100 group-hover:translate-y-0
                  transition-all duration-300 ease-in-out'>
                        <div className='p-[6px] w-[40px] h-[40px] rounded-full flex items-center justify-center bg-emerald-500 text-white hover:bg-emerald-700 transition duration-300'>
                            <FaExpandArrowsAlt size={22} />
                        </div>
                        <div className='p-[6px] w-[40px] h-[40px] rounded-full flex items-center justify-center bg-pink-500 text-white hover:bg-pink-700 transition duration-300'>
                            <FaRegHeart size={22} />
                        </div>
                        <div className='p-[6px] w-[40px] h-[40px] rounded-full flex items-center justify-center bg-sky-500 text-white hover:bg-sky-700 transition duration-300'>
                            <FaShareAlt size={22} />
                        </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="flex-grow pl-2">
                    <h3 className="font-semibold text-gray-800 text-lg line-clamp-2">
                        Embroidered Satin Saree for Women
                    </h3>
                    <p className='sm:block hidden'>{`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut corporis consequuntur, et omnis ipsum nihil voluptates at quam labore natus sed sequi iure, soluta officiis totam accusantium architecto incidunt maiores?`.slice(0.180)}...</p>
                    <div className="flex items-center gap-1 text-yellow-500 mt-2 text-sm">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                        ))}
                    </div>
                    <div className="flex gap-4 items-center mt-3 text-sm">
                        <span className="line-through text-gray-400">$259.00</span>
                        <span className="text-red-600 font-semibold">$159.99</span>
                    </div>
                {/* Size Selection */}
                <div className='mt-2'>
                        <div className="flex gap-2">
                            {["S", "M", "L", "XL"].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleSizeChange(size)}
                                    className={`px-3 py-1 rounded-full text-sm border ${selectedSize === size
                                        ? "bg-emerald-700 text-white"
                                        : "text-gray-700 border-gray-300"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                {/* Color Selection */}
                <div className="mt-2">
                        <div className="flex gap-2">
                            {["red", "green", "blue"].map((color) => (
                                <button
                                    key={color}
                                    aria-label={`Select color ${color}`}
                                    onClick={() => handleColorChange(color)}
                                    className={`w-6 h-6 rounded-full border-2 cursor-pointer ${selectedColor === color ? "border-black" : "border-gray-300"}`}
                                    style={{ backgroundColor: color }}
                                ></button>
                            ))}
                        </div>
                    </div>
                {/* Add to Cart or Quantity */}
                <div className="mt-4">
                        {quantity === 0 ? (
                            <button
                                onClick={() => setQuantity(1)}
                                disabled={!selectedSize || !selectedColor}
                                className={`w-[70%] py-2 rounded-md font-semibold text-white ${selectedSize && selectedColor
                                    ? "bg-amber-500 hover:bg-amber-600 cursor-pointer "
                                    : "bg-gray-300 cursor-not-allowed"
                                    }`}
                            >
                                <FaShoppingCart className="inline-block mr-2" size={16} />
                                Add to Cart
                            </button>
                        ) : (
                            <div className="flex items-center justify-between mt-2 border shadow-md border-gray-300 lg:w-[50%] w-[70%] rounded-[12px]">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                                    className="w-10 h-10 bg-amber-300 hover:bg-amber-400 cursor-pointer text-xl font-bold rounded-tl-[12px] rounded-bl-[12px]"
                                >
                                    -
                                </button>
                                <span className="font-medium text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 bg-amber-300 hover:bg-amber-400 cursor-pointer text-xl font-bold rounded-tr-[12px] rounded-br-[12px]"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
            </div>
        </div >
        </>
    )
}

export default ProductItemWithDesc