// src/components/Cart.jsx
import React, { useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { IoClose } from 'react-icons/io5';
import { Button } from '@mui/material';
import { BsFillCartXFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Cart = ({ isCartOpen, setIsCartOpen }) => {
    const [cart, setCart] = useState([]);


    if (!isCartOpen) return null; // Only render when open
    return (
        <>
            {/* Background overlay */}
            <div className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsCartOpen(false)}>
            </div>

            {/* Drawer wrapped with RemoveScroll to lock background scroll */}
            <RemoveScroll>
                <div className="fixed top-0 right-0 h-[100vh] w-[280px] sm:w-[50%] md:w-[40%] lg:w-[35%] xl:w-[30%] bg-white z-50 transition-transform duration-300 ease-in-out translate-x-0 flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-gray-300">
                        <h2 className="text-lg font-semibold">Shopping Cart <span>(10)</span></h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            aria-label="Close Cart"
                            className="text-2xl cursor-pointer "
                        >
                            <IoClose className='hover:text-amber-600' />
                        </button>
                    </div>

                    {/* Cart Content */}
                    {
                        cart.length < 1 ?
                            (
                                <>
                                    <div className="scrollbar-sidebar p-2 flex-1 overflow-y-auto mb-3 flex flex-col gap-2">
                                        <div className='px-1 py-3 border-b border-gray-300 flex gap-2'>
                                            <img src="/productImg1.webp" alt="" className='w-[60px] h-[80px] rounded-md shadow-md' />
                                            <div className='flex-1 flex gap-2 lg:gap-4 justify-bewteen '>
                                                <div className='text-sm lg:text-md xl:text-lg flex-1 px-1'>
                                                    <p className='font-semibold'>{`Women Saree kjafjeoijfaj`.slice(0, 20)}...</p>
                                                    <p className='italic'>
                                                        Qty:
                                                        <span className='ml-2'>6</span>
                                                    </p>
                                                    <p className='text-amber-600 font-semibold mt-2'>$160.00</p>
                                                </div>
                                                <MdDelete className="text-gray-600 hover:text-amber-600" />
                                            </div>
                                        </div>
                                        <div className='px-1 py-3 border-b border-gray-300 flex gap-2'>
                                            <img src="/productImg1.webp" alt="" className='w-[60px] h-[80px] rounded-md shadow-md' />
                                            <div className='flex-1 flex gap-2 lg:gap-4 justify-bewteen '>
                                                <div className='text-sm lg:text-md xl:text-lg flex-1 px-1'>
                                                    <p className='font-semibold'>{`Women Saree kjafjeoijfaj`.slice(0, 20)}...</p>
                                                    <p className='italic'>
                                                        Qty:
                                                        <span className='ml-2'>6</span>
                                                    </p>
                                                    <p className='text-amber-600 font-semibold mt-2'>$160.00</p>
                                                </div>
                                                <MdDelete className="text-gray-600 hover:text-amber-600" />
                                            </div>
                                        </div>
                                        <div className='px-1 py-3 border-b border-gray-300 flex gap-2'>
                                            <img src="/productImg1.webp" alt="" className='w-[60px] h-[80px] rounded-md shadow-md' />
                                            <div className='flex-1 flex gap-2 lg:gap-4 justify-bewteen '>
                                                <div className='text-sm lg:text-md xl:text-lg flex-1 px-1'>
                                                    <p className='font-semibold'>{`Women Saree kjafjeoijfaj`.slice(0, 20)}...</p>
                                                    <p className='italic'>
                                                        Qty:
                                                        <span className='ml-2'>6</span>
                                                    </p>
                                                    <p className='text-amber-600 font-semibold mt-2'>$160.00</p>
                                                </div>
                                                <MdDelete className="text-gray-600 hover:text-amber-600" />
                                            </div>
                                        </div>
                                        <div className='px-1 py-3 border-b border-gray-300 flex gap-2'>
                                            <img src="/productImg1.webp" alt="" className='w-[60px] h-[80px] rounded-md shadow-md' />
                                            <div className='flex-1 flex gap-2 lg:gap-4 justify-bewteen '>
                                                <div className='text-sm lg:text-md xl:text-lg flex-1 px-1'>
                                                    <p className='font-semibold'>{`Women Saree kjafjeoijfaj`.slice(0, 20)}...</p>
                                                    <p className='italic'>
                                                        Qty:
                                                        <span className='ml-2'>6</span>
                                                    </p>
                                                    <p className='text-amber-600 font-semibold mt-2'>$160.00</p>
                                                </div>
                                                <MdDelete className="text-gray-600 hover:text-amber-600" />
                                            </div>
                                        </div>


                                    </div>
                                    <div className='py-4 px-2'>
                                        <div className='flex justify-between items-center px-2 py-3 border-t border-gray-300'>
                                            <span className='font-bold'>Quantity</span>
                                            <span>16</span>
                                        </div>
                                        <div className='flex justify-between items-center px-2 py-3 border-t border-gray-300'>
                                            <span className='font-bold'>Total Amount</span>
                                            <span>$1200.00</span>
                                        </div>

                                        <div className='flex justify-center gap-2 items-center py-3 border-t border-gray-300'>
                                            <Button className="!bg-amber-600 !border-2 !border-amber-600 !text-white hover:!bg-black hover:!border-black !w-[45%]" onClick={()=>setIsCartOpen(false)}>
                                                <Link to="/cart">
                                                    View Cart
                                                </Link>
                                            </Button>
                                            <Button className="!w-[45%] !border-2 !border-amber-600 hover:!bg-black hover:!text-white !text-amber-600 hover:!border-black">Checkout</Button>
                                        </div>
                                    </div>
                                </>

                            )
                            :
                            (
                                <>
                                    <div className="p-4 flex-1 overflow-y-auto flex justify-center items-center">
                                        <div className='flex-1 flex flex-col justify-center items-center gap-3'>
                                            <BsFillCartXFill size={55} className='!text-red-500' />
                                            <p className='text-xl font-semibold text-gray-600'>Your cart is empty.</p>
                                            <Button className='!bg-amber-600 !text-white hover:!bg-amber-700 !mt-2'>
                                                Continue Shopping

                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )

                    }


                </div>
            </RemoveScroll>
        </>
    );
};

export default Cart;
