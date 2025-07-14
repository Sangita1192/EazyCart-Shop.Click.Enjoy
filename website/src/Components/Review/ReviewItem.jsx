import React from 'react'
import { FaStar } from 'react-icons/fa6';

const ReviewItem = () => {
    return (
        <div className='flex justify-between items-start bg-gray-50 rounded-sm shadow-sm p-2'>
            <div className='flex flex-wrap gap-2'>
                <div className='!w-[70px] !h-[70px] bg-orange-700 flex items-center justify-center rounded-[50%] overflow-hidden'>
                    <img
                        src="/fallbackUser.webp"
                        alt="user image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className='flex-1'>
                    <h3 className='sm:text-lg font-semibold'>Sangeeta Panwar</h3>
                    <h5 className='mb-1 italic'>sangeeta@gmail.com</h5>
                    <div className='flex md:hidden items-center gap-2 !text-yellow-600'>
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                        ))}
                    </div>
                    <p className='text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum voluptates odit vel esse doloribus voluptatum eaque aliquid natus molestias. Dolor et laudantium maxime ullam repellat laborum nemo reprehenderit accusamus totam.</p>
                </div>
                <div className='hidden md:flex justify-center gap-2 !text-yellow-600'>
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                    ))}
                </div>
            </div>


        </div>
    )
}

export default ReviewItem