import React from 'react'
import { useSelector } from 'react-redux';

const ProductCategory = () => {
    const { categories, loading, error } = useSelector((state) => state.category);
    return (
        <>
            <div className='w-full my-[20px] '>
                <div className='w-[90%] lg:w-[85%] m-auto p-[10px] overflow-x-auto scrollbar-hide'>
                    {loading && <span className="px-2">Loading...</span>}
                    {error && <span className="text-red-500 px-2">{error}</span>}
                    {!loading && !error && categories.length > 0 &&
                        <div className='min-w-max px-[10px] flex gap-[40px] justify-center items-center'>
                            {categories.map(cat => (
                                <div className='flex flex-col gap-[10px] items-center justify-center group cursor-pointer' key={cat._id}>
                                    <div className='w-[100px] h-[100px] rounded-full shadow-sm bg-[#FFF3FF] transition-transform duration-300 ease-in-out group-hover:scale-107 cursor-pointer'>
                                        <img src={cat.images[0]} alt={`category-img-${cat.slug}`} className='w-full h-full object-fit-contain !rounded-full !border !border-[darkgray]' />
                                    </div>
                                    <p className='!font-bold !text-gray-700 transition-transform duration-300 ease-in-out group-hover:!text-red-500'>{cat.name}</p>
                                </div>
                            ))}
                        </div>
                    }

                </div>

            </div>
        </>
    )
}

export default ProductCategory