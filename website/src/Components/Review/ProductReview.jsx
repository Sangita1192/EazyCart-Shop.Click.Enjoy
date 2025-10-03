import React from 'react'
import ReviewItem from './ReviewItem'
import AddReview from './AddReview'
import { useSelector } from 'react-redux';

const ProductReview = ({ productId, reviews }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (!reviews?.length && !isLoggedIn) {
        return null; 
    }

    return (
        <div className='w-full'>
            <h1 className='lg:text-2xl md:text-1xl text-lg text-orange-600 font-semibold px-[10px]'>Review ({reviews?.length})</h1>
            <div className='mt-2 p-2'>
                <div className='flex flex-col gap-3 my-2 pb-6'>
                    {reviews?.length > 0 &&
                        reviews.map(rev => (
                            <ReviewItem key={rev._id} review={rev} />
                        ))
                    }
                </div>
                {isLoggedIn && <AddReview productId={productId} />}
            </div>
        </div>
    )
}


export default ProductReview;