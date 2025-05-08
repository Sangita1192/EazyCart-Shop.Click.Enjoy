import React from 'react';
import featuredImg from '/public/featuredImg1.jpg'

const FeaturedCategoryBanner = () => {
  return (
    <>
    <div className='w-[85%] lg:w-[92%] m-auto mt-10 py-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px] justify-center items-center'>
    <div className='shadow-lg rounded-[6px] bg-[#DBDCF1] relative h-[200px] lg:h-[250px] xl:h-[200px]'>
        <img src={featuredImg} alt="featured Category Image" className='absoulte top-0 left-0 w-[90%] h-full rounded-[6px] ' />
        <div className='absolute top-0 right-0 w-[55%] p-2 py-4'>
            <h1 className='text-xl font-[600] text-gray-700'>Buy women products with low price</h1>
            <p className='text-red-500 font-bold text-lg my-[10px]'>Upto 70% Off</p>
            <button className='font-[600] !uppercase underline  cursor-pointer hover:!text-amber-500'>
                Shop Now
            </button>

        </div>
    </div>
    <div className='shadow-lg rounded-[6px] bg-[#DBDCF1] relative h-[200px] lg:h-[250px] xl:h-[200px]'>
        <img src={featuredImg} alt="featured Category Image" className='absoulte top-0 left-0 w-[90%] h-full rounded-[6px] ' />
        <div className='absolute top-0 right-0 w-[55%] p-2 py-4'>
            <h1 className='text-xl font-[600] text-gray-700'>Buy women products with low price</h1>
            <p className='text-red-500 font-bold text-lg my-[10px]'>Upto 70% Off</p>
            <button className='font-[600] !uppercase underline  cursor-pointer hover:!text-amber-500'>
                Shop Now
            </button>

        </div>
    </div>
    <div className='shadow-lg rounded-[6px] bg-[#DBDCF1] relative h-[200px] lg:h-[250px] xl:h-[200px]'>
        <img src={featuredImg} alt="featured Category Image" className='absoulte top-0 left-0 w-[90%] h-full rounded-[6px] ' />
        <div className='absolute top-0 right-0 w-[55%] p-2 py-4'>
            <h1 className='text-xl font-[600] text-gray-700'>Buy women products with low price</h1>
            <p className='text-red-500 font-bold text-lg my-[10px]'>Upto 70% Off</p>
            <button className='font-[600] !uppercase underline  cursor-pointer hover:!text-amber-500'>
                Shop Now
            </button>

        </div>
    </div>
    <div className='shadow-lg rounded-[6px] bg-[#DBDCF1] relative h-[200px] lg:h-[250px] xl:h-[200px]'>
        <img src={featuredImg} alt="featured Category Image" className='absoulte top-0 left-0 w-[90%] h-full rounded-[6px] ' />
        <div className='absolute top-0 right-0 w-[55%] p-2 py-4'>
            <h1 className='text-xl font-[600] text-gray-700'>Buy women products with low price</h1>
            <p className='text-red-500 font-bold text-lg my-[10px]'>Upto 70% Off</p>
            <button className='font-[600] !uppercase underline  cursor-pointer hover:!text-amber-500'>
                Shop Now
            </button>

        </div>
    </div>
</div>

    </>
  )
}

export default FeaturedCategoryBanner