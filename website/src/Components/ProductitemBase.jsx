import React from 'react';
import { FaRegHeart, FaStar } from 'react-icons/fa6';
import { FaShoppingCart } from "react-icons/fa";
import product1 from '/productImg1.webp';
import product2 from '/productImg2.webp';
import { Link } from 'react-router-dom';
import { useProductActions } from '../hooks/useProductActions';

const ProductItemBase = ({ product, layout = "grid" }) => {
    const {
        selectedSize,
        setSelectedSize,
        selectedColor,
        setSelectedColor,
        localQty,
        hasSizes,
        hasColors,
        variantItem,
        toggleWishlist,
        addToCart,
        updateQuantity,
        isInWishlist,
    } = useProductActions(product);

    // calculate average ratings
    const avgRating = product?.ratings?.length
        ? product.ratings.reduce((sum, r) => sum + r.rating, 0) / product.ratings.length
        : 0;

    const Price = (
        <div className={`${layout === 'grid' ? "flex justify-between items-center" : ""} mt-2`}>
            <div className="flex items-center gap-1 text-sm">
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={i < Math.round(avgRating || 0) ? "text-yellow-500" : "text-gray-300"}
                    />
                ))}
                {product?.ratings?.length > 0 && (
                    <span className='text-black font-semibold'>({product.ratings.length})</span>
                )}
            </div>

            <div className={`text-red-600 font-semibold ${layout === 'grid' ? "mt-0" : "mt-2"}`}>
                ${Math.floor((product?.price || 0) * (100 - (product?.discount || 0)) / 100)}
            </div>
        </div>

    );

    const SizeSelector = hasSizes && (
        <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar size-color-scroller">
            {product.size.map(s => (
                <button
                    key={s._id}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1 rounded-full text-sm border cursor-pointer whitespace-nowrap ${selectedSize === s ? "bg-emerald-700 text-white" : "text-gray-700 border-gray-300"}`}
                >
                    {s.label}
                </button>
            ))}
        </div>
    );

    const ColorSelector = hasColors && (
        <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar size-color-scroller">
            {product.color.map(c => (
                <button
                    key={c._id}
                    onClick={() => setSelectedColor(c)}
                    className={`w-6 h-6 rounded-full border-2 cursor-pointer flex-shrink-0 ${selectedColor === c ? "border-black" : "border-gray-300"}`}
                    style={{ backgroundColor: c.code }}
                />
            ))}
        </div>
    );

    const CartButton = variantItem ? (
        <div className={`flex items-center justify-center gap-4 border border-gray-200 rounded mt-3 ${layout === "grid" ? "w-full" : "w-[230px]"}`}>
            <button onClick={() => updateQuantity(localQty - 1)} className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-xl rounded">-</button>
            <span className="font-medium text-lg flex-grow-1 text-center">{localQty}</span>
            <button onClick={() => updateQuantity(localQty + 1)} className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-xl rounded">+</button>
        </div>
    ) : (
        <button
            onClick={addToCart}
            disabled={(hasSizes && !selectedSize) || (hasColors && !selectedColor)}
            className={`py-2 mt-3 rounded-md font-semibold text-white bg-amber-500 hover:bg-amber-600 ${(hasSizes && !selectedSize) || (hasColors && !selectedColor)
                ? "cursor-not-allowed opacity-50" : ""} ${layout === "grid" ? "w-full" : "w-[230px]"}`}
        >
            <FaShoppingCart className="inline-block mr-2" size={16} /> Add to Cart
        </button>
    );

    // Layout Switch
    return layout === "grid" ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-200">
            <div className="relative h-[240px] overflow-hidden group">
                <img src={product?.images[0] || product2} className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
                <img src={product?.images[1] || product1} className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                {product?.discount && <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded text-sm">{product.discount}%</span>}
                <div
                    onClick={toggleWishlist}
                    className={`absolute top-3 right-3 p-2 rounded-full text-white cursor-pointer ${isInWishlist ? "bg-red-500" : "bg-gray-600 hover:bg-red-600"}`}
                >
                    <FaRegHeart size={20} />
                </div>
            </div>
            <div className="px-4 py-3">
                <Link to={`/product/${product._id}`}>
                    <p className="font-semibold text-gray-800 line-clamp-2 hover:text-amber-700">{product.name}</p>
                </Link>
                {Price}
                <div className="min-h-[62px]">
                    {hasSizes &&
                        <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar size-color-scroller">
                            {product.size.map(s => (
                                <button
                                    key={s._id}
                                    onClick={() => setSelectedSize(s)}
                                    className={`px-3 py-1 rounded-full text-sm border cursor-pointer whitespace-nowrap ${selectedSize === s ? "bg-emerald-700 text-white" : "text-gray-700 border-gray-300"}`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    }
                    {hasColors &&
                        <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar size-color-scroller">
                            {product.color.map(c => (
                                <button
                                    key={c._id}
                                    onClick={() => setSelectedColor(c)}
                                    className={`w-6 h-6 rounded-full border-2 cursor-pointer flex-shrink-0 ${selectedColor === c ? "border-black" : "border-gray-300"}`}
                                    style={{ backgroundColor: c.code }}
                                />
                            ))}
                        </div>}

                </div>
                {CartButton}
            </div>
        </div>
    ) : (
        <div className="border-gray-300 rounded-md bg-[#f5f5f5] flex gap-4 p-3 mb-3">
            <div className="h-[220px] w-[200px] relative overflow-hidden rounded-md group">
                <img src={product?.images[0] || product1} className="h-full w-full object-cover absolute top-0 left-0" />
                <img src={product?.images[1] || product2} className="h-full w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {product?.discount && <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded text-sm">{product.discount}%</span>}
            </div>
            <div className="flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{product?.description?.slice(0, 300)}</p>
                {Price}
                {SizeSelector}
                {ColorSelector}
                <div className="mt-auto">{CartButton}</div>
            </div>
        </div>
    );
};

export default ProductItemBase;
