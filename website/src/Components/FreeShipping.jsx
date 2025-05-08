import React from 'react'
import { FaTruckMoving } from 'react-icons/fa6'

const FreeShipping = () => {
    return (
        <>
            <div className='w-[60%] m-auto py-3 lg:px-8 md:px-7 sm:px-5 px-3 rounded-[8px] block lg:flex text-center justify-between items-center border border-2 border-amber-600'>
                <div className='flex gap-[10px] items-center justify-center'>
                    <FaTruckMoving className="!text-amber-500 !text-[50px]" />
                    <h1 className='text-2xl uppercase font-bold text-gray-600'>free shipping</h1>
                </div>
                <h3 className='text-lg'>Free delivery on your first Order </h3>
                <h1 className='text-2xl uppercase font-bold text-gray-600 line-through'>$49</h1>
            </div>
        </>
    )
}

export default FreeShipping