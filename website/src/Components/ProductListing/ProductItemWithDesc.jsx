import React, { useState } from 'react'
import { FaExpandArrowsAlt, FaShareAlt, FaShoppingCart } from 'react-icons/fa';
import { FaRegHeart, FaStar } from 'react-icons/fa6';
import product1 from '/productImg1.webp';
import product2 from '/productImg2.webp';

const ProductItemWithDesc = ({ product }) => {
    console.log('product', product);
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
            <div className='border-gray-200 p-2 rounded-md bg-[#f5f5f5] flex gap-2 mb-[15px]' key={product?._id}>
                <div className="h-[250px] w-[220px] bg-white rounded-md overflow-hidden relative group">
                    <img
                        src={product?.images[0] || product1}
                        alt={product?.name}
                        className="h-full w-full object-cover transition-opacity duration-300"
                    />
                    {/* Hover image */}
                    <img
                        src={product?.images[1] || product2}
                        alt={product?.name}
                        className="h-full w-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
                        {product?.discount} %
                    </span>
                </div>


                {/* Product Info */}
                <div className="flex flex-col flex-grow pl-2">
                    <h3 className="font-semibold text-gray-800 text-lg line-clamp-2">
                        {product?.name}
                    </h3>
                    <p className="sm:block hidden">{product?.description.slice(0, 120)}...</p>
                    <div className="flex items-center gap-1 text-yellow-500 mt-2 text-sm">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                        ))}
                    </div>
                    <div className="flex gap-4 items-center mt-3 text-sm">
                        <span className="line-through text-gray-400">${product?.price}</span>
                        <span className="text-red-600 font-semibold">${Math.floor((product?.price) * (100 - (product?.discount || 0)) / 100)}</span>
                    </div>
                    {/* Size Selection */}
                    <div className='mt-2'>
                        <div className="flex gap-2">
                            {product?.size.length > 0 &&
                                product?.size.map((s) => (
                                    <button
                                        key={s._id}
                                        onClick={() => handleSizeChange(s)}
                                        className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap ${selectedSize === s
                                            ? "bg-emerald-700 text-white"
                                            : "text-gray-700 border-gray-300"
                                            }`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                        </div>
                    </div>
                    {/* Color Selection */}
                    <div className="mt-2">
                        <div className="flex gap-2">
                            {product?.color.length > 0 &&
                                product?.color.map((c) => (
                                    <button
                                        key={c._id}
                                        onClick={() => handleColorChange(c)}
                                        className={`w-6 h-6 rounded-full border-2 cursor-pointer flex-shrink-0 ${selectedColor === c ? "border-black" : "border-gray-300"
                                            }`}
                                        style={{ backgroundColor: c.code }}
                                    >
                                    </button>
                                ))}
                        </div>
                    </div>
                    <div className="mt-auto pt-3">
                        {quantity === 0 ? (
                            <button
                                onClick={() => setQuantity(1)}
                                disabled={!selectedSize || !selectedColor}
                                className={`w-[70%] py-2 rounded-md font-semibold text-white bg-amber-500 hover:bg-amber-600 ${selectedSize && selectedColor
                                    ? " cursor-pointer"
                                    : "cursor-not-allowed"
                                    }`}
                            >
                                <FaShoppingCart className="inline-block mr-2" size={16} />
                                Add to Cart
                            </button>
                        ) : (
                            <div className="flex items-center justify-between border shadow-md border-gray-300 lg:w-[50%] w-[70%] rounded-[12px]">
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