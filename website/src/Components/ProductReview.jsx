import React from 'react'
import ReviewItem from './Review/ReviewItem'
import AddReview from './Review/AddReview'

const ProductReview = () => {
    return (
        <div className='w-full'>
            <h1 className='lg:text-2xl md:text-1xl text-lg text-orange-600 font-semibold px-[10px]'>Review (12)</h1>
            <div className='mt-2 p-2'>
                <div className='flex flex-col gap-3 my-2 pb-6'>
                    <ReviewItem/>
                     <ReviewItem/>
                    <ReviewItem/>
                </div>
                <AddReview/>

            </div>
        </div>
    )
}

export default ProductReview