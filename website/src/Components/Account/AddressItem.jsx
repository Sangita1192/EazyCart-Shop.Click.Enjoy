import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const AddressItem = () => {
    return (
        <div className='p-2 flex gap-2 items-start'>
            <div className='flex-1'>
                <div className='flex gap-2 items-center'>
                    <p className='px-2 py-1 bg-gray-200 rounded-md text-gray-600'>Office</p>
                </div>
                <div className='mt-1 py-1'>
                    <div className='flex gap-3 lg:text-md text-sm'>
                        <p className='font-semibold'>Sangeeta</p>
                        <span>+1-643-413-9841</span>
                    </div>
                    <p>18451 85Ave Surrey, British Columbia, V8B-8Ml</p>
                </div>
            </div>
            <BsThreeDotsVertical />
        </div>
    )
}

export default AddressItem