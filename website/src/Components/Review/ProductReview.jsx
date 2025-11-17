import React from 'react'
import ReviewItem from './ReviewItem'
import AddReview from './AddReview'
import { useSelector } from 'react-redux';

const ProductReview = ({ productId, reviews }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    return (
        <div className='w-full'>
            <h1 className='lg:text-2xl md:text-xl text-lg text-orange-600 font-semibold px-2'>
                Reviews ({reviews?.length || 0})
            </h1>

            <div className='mt-2 p-2'>
                {reviews?.length > 0 ? (
                    <div className='flex flex-col gap-3 my-2 pb-6'>
                        {reviews.map((rev) => (
                            <ReviewItem key={rev._id} review={rev} />
                        ))}
                    </div>
                ) : (
                    <p className='text-gray-500 mb-5'>No reviews yet. Be the first to review this product!</p>
                )}

                {isLoggedIn ? (
                    <AddReview productId={productId} />
                ) : (
                    <p className='text-gray-500 mt-3'>Log in to add a review.</p>
                )}
            </div>
        </div>
    );
};



export default ProductReview;