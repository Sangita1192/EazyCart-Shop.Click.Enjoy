import { Button } from '@mui/material';
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa6';

const AddReview = () => {
    const [rating, setRating] = useState(0); 
    const [hover, setHover] = useState(null); 

    return (
        <>
            <div className='bg-gray-50 lg:p-6 p-4'>
                <h1 className='xl:text-xl md:text-lg mb-2 font-semibold'>Add a Review</h1>
                <textarea
                    className="w-full h-24 resize-none border border-gray-500 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 overflow-y-auto"
                    placeholder="Write your review..."
                // value={review}
                // onChange={(e) => setReview(e.target.value)}
                />
                <div className="flex items-center gap-1 my-4">
                    {[...Array(5)].map((_, i) => {
                        const value = i + 1;
                        return (
                            <button
                                type="button"
                                key={value}
                                onClick={() => setRating(value)}
                                onMouseEnter={() => setHover(value)}
                                onMouseLeave={() => setHover(null)}
                                className="focus:outline-none"
                            >
                                <FaStar
                                    size={22}
                                    className={`cursor-pointer transition-colors ${value <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>
                <Button className="xl:!w-[150px] !lg:w-[120px] !w-[100px] !bg-amber-600 !px-[15px] !mt-3 !text-white hover:!bg-amber-700">
                    Submit
                </Button>

            </div>
        </>
    )
}

export default AddReview