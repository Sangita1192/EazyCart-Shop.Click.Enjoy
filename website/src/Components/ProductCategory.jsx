import React from 'react'
import grocery from "./../../public/grocery.png"
import fashion from './../../public/fashion.png'

const ProductCategory = () => {
  return (
    <>
    <div className='w-full my-[20px] '>
        <div className='w-[90%] lg:w-[85%] m-auto p-[10px] overflow-x-auto scrollbar-hide'>
            <div className='min-w-max px-[10px] flex gap-[40px] justify-center items-center'>
                <div className='flex flex-col gap-[10px] items-center justify-center group cursor-pointer'>
                    <div className='w-[100px] h-[100px] rounded-full p-[20px] border border-1 border-gray-300 shadow-sm bg-[#FFF3FF] transition-transform duration-300 ease-in-out group-hover:scale-107 cursor-pointer'>
                        <img src={fashion} alt="" className='w-full h-full object-fit-contain' />
                    </div>              
                    <p className='!font-bold !text-gray-700 transition-transform duration-300 ease-in-out group-hover:!text-red-500'>Fashion</p>
                </div>
                <div className='flex flex-col gap-[10px] items-center justify-center group cursor-pointer'>
                    <div className='w-[100px] h-[100px] rounded-full p-[15px] border border-1 border-gray-300 shadow-sm bg-[#FFF3FF] transition-transform duration-300 ease-in-out group-hover:scale-107 cursor-pointer'>
                        <img src={grocery} alt="" className='w-full h-full' />
                    </div>              
                    <p className='!font-bold !text-gray-700 transition-transform duration-300 ease-in-out group-hover:!text-red-500'>Grocery</p>
                </div>
                <div className='flex flex-col gap-[10px] items-center justify-center group cursor-pointer'>
                    <div className='w-[100px] h-[100px] rounded-full p-[15px] border border-1 border-gray-300 shadow-sm bg-[#FFF3FF] transition-transform duration-300 ease-in-out group-hover:scale-107 cursor-pointer'>
                        <img src={grocery} alt="" className='w-full h-full' />
                    </div>              
                    <p className='!font-bold !text-gray-700 transition-transform duration-300 ease-in-out group-hover:!text-red-500'>Electronics</p>
                </div>
                <div className='flex flex-col gap-[10px] items-center justify-center group cursor-pointer'>
                    <div className='w-[100px] h-[100px] rounded-full p-[15px] border border-1 border-gray-300 shadow-sm bg-[#FFF3FF] transition-transform duration-300 ease-in-out group-hover:scale-107 cursor-pointer'>
                        <img src={fashion} alt="" className='w-full h-full rounded-full ' />
                    </div>              
                    <p className='!font-bold !text-gray-700 transition-transform duration-300 ease-in-out group-hover:!text-red-500'>Bags</p>
                </div>
                <div className='flex flex-col gap-[10px] items-center justify-center group cursor-pointer'>
                    <div className='w-[100px] h-[100px] rounded-full p-[15px] border border-1 border-gray-300 shadow-sm bg-[#FFF3FF] transition-transform duration-300 ease-in-out group-hover:scale-107 cursor-pointer'>
                        <img src={grocery} alt="" className='w-full h-full rounded-full ' />
                    </div>              
                    <p className='!font-bold !text-gray-700'>Footwear</p>
                </div>
                <div className='flex flex-col gap-[10px] items-center justify-center group cursor-pointer'>
                    <div className='w-[100px] h-[100px] rounded-full p-[15px] border border-1 border-gray-300 shadow-sm bg-[#FFF3FF] transition-transform duration-300 ease-in-out group-hover:scale-107 cursor-pointer'>
                        <img src={grocery} alt="" className='w-full h-full rounded-full ' />
                    </div>              
                    <p className='!font-bold !text-gray-700 transition-transform duration-300 ease-in-out group-hover:!text-red-500'>Footwear</p>
                </div>
                <div className='flex flex-col gap-[10px] items-center justify-center group cursor-pointer'>
                    <div className='w-[100px] h-[100px] rounded-full p-[15px] border border-1 border-gray-300 shadow-sm bg-[#FFF3FF] transition-transform duration-300 ease-in-out group-hover:scale-107 cursor-pointer'>
                        <img src={grocery} alt="" className='w-full h-full rounded-full ' />
                    </div>              
                    <p className='!font-bold !text-gray-700 transition-transform duration-300 ease-in-out group-hover:!text-red-500'>Footwear</p>
                </div>
                <div className='flex flex-col gap-[10px] items-center justify-center group cursor-pointer'>
                    <div className='w-[100px] h-[100px] rounded-full p-[15px] border border-1 border-gray-300 shadow-sm bg-[#FFF3FF] transition-transform duration-300 ease-in-out group-hover:scale-107 cursor-pointer'>
                        <img src={grocery} alt="" className='w-full h-full rounded-full ' />
                    </div>              
                    <p className='!font-bold !text-gray-700 transition-transform duration-300 ease-in-out group-hover:!text-red-500'>Footwear</p>
                </div>
                <div className='flex flex-col gap-[10px] items-center justify-center group cursor-pointer'>
                    <div className='w-[100px] h-[100px] rounded-full p-[15px] border border-1 border-gray-300 shadow-sm bg-[#FFF3FF] transition-transform duration-300 ease-in-out group-hover:scale-107 cursor-pointer'>
                        <img src={grocery} alt="" className='w-full h-full rounded-full ' />
                    </div>              
                    <p className='!font-bold !text-gray-700 transition-transform duration-300 ease-in-out group-hover:!text-red-500'>Footwear</p>
                </div>

            </div>

        </div>

    </div>
    </>
  )
}

export default ProductCategory