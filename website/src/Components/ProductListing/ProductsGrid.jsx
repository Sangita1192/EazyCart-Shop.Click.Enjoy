import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa6'
import { RiLayoutGridFill } from "react-icons/ri";
import { useMediaQuery } from 'react-responsive';
import LoadingSpinner from './../LoadingSpinner';
import ProductItemBase from '../ProductitemBase';

const ProductsGrid = ({ products, loading, sortOption, setSortOption }) => {
    const [isGrid, setIsGrid] = useState(true);
    const isMobile = useMediaQuery({ maxWidth: 639 });

    const shouldShowGrid = isGrid || isMobile;
    return (
        <>
            <div className='w-full'>
                {
                    !loading ?
                        <>
                            <div className='border px-4 mb-3 bg-[#f5f5f5] shadow-lg border-gray-300 rounded-sm py-3 flex justify-between items-center'>
                                <div className='gap-4 sm:flex hidden '>
                                    <FaBars size={22} className={`cursor-pointer ${!isGrid ? "!text-amber-500" : "text-gray-800"}`} onClick={() => setIsGrid(false)} />
                                    <RiLayoutGridFill size={24} className={`cursor-pointer  ${isGrid ? "!text-amber-500" : "text-gray-800"}`} onClick={() => setIsGrid(true)} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-lg text-gray-800">Sort By:</span>
                                    <select
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        name="sort"
                                        id="sort"
                                        className="border border-gray-300 rounded-md px-3 py-1 bg-white text-gray-700 focus:outline-none focus:border-amber-400 transition-all"
                                    >
                                        <option value="recommended">Recommended</option>
                                        <option value="low_to_high">Price: Low to High</option>
                                        <option value="high_to_low">Price: High to Low</option>
                                        <option value="top_rated">Top Rated</option>
                                        <option value="popular">Most Popular</option>
                                        <option value="newest">Newest Arrivals</option>
                                    </select>
                                </div>

                            </div>
                            {products.length > 0 &&
                                <div className='py-2'>
                                    {
                                        shouldShowGrid
                                            ? 
                                            <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[10px]'>
                                                {products.map(p => <ProductItemBase key={p._id} product={p} layout="grid" />)}
                                            </div>
                                            : products.map(p => <ProductItemBase key={p._id} product={p} layout="list" />)
                                    }
                                </div>
                            }
                        </>
                        :
                        <LoadingSpinner />
                }
            </div>
        </>
    )
}

export default ProductsGrid