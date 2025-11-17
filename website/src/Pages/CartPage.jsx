import { Button } from '@mui/material'
import React from 'react'
import { BsFillCartXFill } from 'react-icons/bs'
import { IoBagCheckOutline } from 'react-icons/io5'
import CartItem from '../Components/CartItem'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { calculateCartTotals } from '../utils/calculateCart'

const CartPage = () => {
    const { cart } = useSelector(state => state.cart);
    const { subTotal, tax, shipping, total, cartQty } = calculateCartTotals(cart);

    return (
        <>
            <div className='py-8'>
                <div className='xl:w-[90%] md:w-[95%] w-[98%] m-auto md:flex gap-[25px] items-start'>
                    <div className=' bg-white/70 md:flex-1 md:p-6 p-2 shadow-lg rounded-md w-[95%] m-auto mb-[25px] md:mb-0 text-gray-600 flex flex-col gap-2'>
                        <div className='border-b pb-2 border-gray-300'>
                            <h3 className='text-lg font-semibold'>
                                Your Cart
                            </h3>
                            {cartQty > 0 && <p>There are <span className='text-amber-600 font-bold'>{cartQty}</span> product in your cart.</p>}
                        </div>
                        <div className='md:flex-1'>
                            {
                                cart?.items?.length < 1 ?
                                    (
                                        <div className='flex-1 flex flex-col justify-center items-center gap-3 py-6'>
                                            <BsFillCartXFill size={65} className='!text-red-400' />
                                            <p className='text-xl font-semibold text-gray-600'>Your cart is empty.</p>
                                            <Link to="/products">
                                                <Button className='!bg-amber-600 !text-white hover:!bg-amber-700 !mt-2'>
                                                    Continue Shopping
                                                </Button>
                                            </Link>
                                        </div>
                                    ) :
                                    (
                                        <div className='p-2 flex flex-col gap-3 scrollbar-sidebar overflow-y-auto'>
                                            {cart?.items?.map(item =>
                                                <CartItem key={item._id} cartItem={item} />
                                            )}
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    <div className='bg-white/70 p-2 shadow-lg rounded-md w-[95%] mx-auto md:mx-0 md:w-[35%] lg:w-[30%] xl:w-[25%] text-gray-600 pb-8'>
                        <h3 className='border-b pb-2 border-gray-300 text-lg font-semibold'>Cart Total</h3>
                        <div className='flex justify-between items-center mt-2'>
                            <span>Subtotal</span>
                            <span>${subTotal.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <span>Tax (GST/PST)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <span>Shipping Fee</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <p className='text-sm italic'>(free shipping over $19.99)</p>
                        <div className='flex justify-between items-center mt-2 pt-2 border-t border-gray-300'>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Link to={cart?.items?.length ? "/checkout" : "#"}>
                            <Button
                                disabled={!cart?.items?.length}
                                className='!flex !gap-2 !justify-center !items-center !text-white !bg-amber-600 hover:!bg-amber-700 !mt-5 !w-full disabled:!bg-gray-400 disabled:!cursor-not-allowed'
                            >
                                <IoBagCheckOutline />
                                CheckOut
                            </Button>
                        </Link>

                    </div>

                </div>

            </div>
        </>
    )
}

export default CartPage