import React from 'react'
import { FaStar } from 'react-icons/fa6';

const ReviewItem = ({review}) => {
    return (
        <div className='flex gap-3 justify-between items-start bg-gray-50 rounded-sm shadow-sm p-2'>
                <div className='!w-[70px] !h-[70px] bg-orange-700 flex items-center justify-center rounded-[50%] overflow-hidden'>
                    <img
                        src="/fallbackUser.webp"
                        alt="user image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className='flex-1'>
                    <h3 className='sm:text-lg font-semibold'>{review?.user?.name}</h3>
                    <h5 className='mb-1 italic'>{review?.user?.email}</h5>
                    <div className='flex md:hidden items-center gap-2 !text-yellow-600'>
                        {[...Array(review?.rating)].map((_, i) => (
                            <FaStar key={i} />
                        ))}
                    </div>
                    <p className='text-justify'>{review?.comment}.</p>
                </div>
                <div className='hidden md:flex justify-center gap-2 !text-yellow-600'>
                    {[...Array(review?.rating)].map((_, i) => (
                        <FaStar key={i} />
                    ))}
                </div>
        </div>
    )
}

export default ReviewItem