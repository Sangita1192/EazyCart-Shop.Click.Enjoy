import React from 'react'
import { FaStar } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    return (
        <>
            <div className='flex gap-3 py-2 border-b border-gray-300'>
                <img src={cartItem?.product?.images?.[0]} alt={cartItem?.product?.name} className='w-[70px] h-[100px] md:w-[120px] md:h-[150px] rounded-md shadow-md' />
                <div className='flex-1 flex gap-1'>
                    <div className='flex-1'>
                        <Link to={`/product/${cartItem?.product?._id}`}>
                            <h3 className='font-semibold lg:text-xl text-lg hover:text-amber-600 cursor-pointer'>{cartItem?.product?.name}</h3>
                        </Link>
                        <p className='italic md:text-md uppercase text-sm'>{cartItem?.product?.category?.name}</p>
                        <p className='hidden sm:block'>{cartItem?.product?.description.slice(0, 100)}...</p>
                        <div className='text-yellow-600 mt-1 flex gap-1 items-center'>
                            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                            <span className='text-black'>
                                ({cartItem?.product?.ratings.length > 0 ? cartItem?.product?.ratings.length : 0})
                            </span>
                        </div>
                        <div className='mt-2'>
                            <span className="text-sm font-medium text-gray-700 mr-1">
                                Qty: {cartItem?.quantity}
                            </span>
                        </div>
                        {(cartItem?.size || cartItem?.color) && (
                            <div className="text-italic flex gap-1">
                                {cartItem?.size && <span>Size: {cartItem?.size}</span>}
                                {cartItem?.size && cartItem?.color && <span className="mx-2">|</span>}
                                {cartItem?.color && (
                                    <span className="flex items-center gap-1">
                                        Color:
                                        <span
                                            className="w-4 h-4 rounded-full border border-gray-300"
                                            style={{ backgroundColor: cartItem.color }}
                                        ></span>
                                    </span>
                                )}

                            </div>
                        )}
                        <div className='mt-3 flex md:gap-4 gap-2'>
                            <p>${(cartItem?.product.price * (100 + cartItem?.product.discount) / 100).toFixed(2)}</p>
                            <p className='text-gray-500 line-through'>${cartItem?.price}</p>
                            {cartItem?.discount > 0 && <span className='font-bold text-red-600 uppercase hidden sm:block'>{cartItem?.discount}% off</span>}
                        </div>
                    </div>

                    <MdCancel size={24} className='hover:text-amber-600 cursor-pointer' onClick={() => dispatch(removeFromCart(cartItem?._id))} />
                </div>
            </div>
        </>
    )
}

export default CartItem