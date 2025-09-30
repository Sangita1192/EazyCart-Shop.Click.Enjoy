import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa6';
import { showError, showSuccess } from '../../services/toastService';
import { useNavigate } from 'react-router-dom';
import { addReview } from '../../Api/api';

const AddReview = ({ productId }) => {
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [review, setReview] = useState({
        rating: 3,
        comment: ""
    });
    const [hover, setHover] = useState(null);

    const handleSubmitReview = async () => {
        try {
            setLoading(true);
            setSubmitting(true);
            await addReview(review, productId);
            showSuccess("Review added successfully!");
            nav(`/product/${productId}`);
        } catch (error) {
            console.log(error);
            showError("erorr in adding review");
            nav(`/product/${productId}`);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    }

    return (
        <>
            <div className='bg-gray-50 lg:p-6 p-4'>
                <h1 className='xl:text-xl md:text-lg mb-2 font-semibold'>Add a Review</h1>
                <textarea
                    className="w-full h-24 resize-none border border-gray-500 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 overflow-y-auto"
                    placeholder="Write your review..."
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                />
                <div className="flex items-center gap-1 my-4">
                    {[...Array(5)].map((_, i) => {
                        const value = i + 1;
                        return (
                            <button
                                type="button"
                                key={value}
                                onClick={() => setReview({ ...review, rating: value })}
                                onMouseEnter={() => setHover(value)}
                                onMouseLeave={() => setHover(null)}
                                className="focus:outline-none"
                            >
                                <FaStar
                                    size={22}
                                    className={`cursor-pointer transition-colors ${value <= (hover || review.rating) ? 'text-yellow-500' : 'text-gray-300'
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>
                <Button
                    onClick={handleSubmitReview}
                    disabled={submitting}
                    className={`xl:!w-[150px] !lg:w-[120px] !w-[100px] !bg-amber-600 !px-[15px] !mt-3 !text-white hover:!bg-amber-700`}
                >
                    {submitting ? (
                        <CircularProgress size={20} color="inherit" />
                    ) : (
                        <>
                            Submit
                        </>
                    )}
                </Button>
            </div>
        </>
    )
}

export default AddReview