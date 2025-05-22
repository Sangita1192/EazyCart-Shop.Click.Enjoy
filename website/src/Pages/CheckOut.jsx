import React from 'react'
import AddressItem from '../Components/Account/AddressItem'
import { Button } from '@mui/material'
import { MdPayment } from 'react-icons/md'
import { TbCash } from "react-icons/tb";

const CheckOut = () => {
    return (
        <>
            <div className='py-8 xl:w-[80%] lg:w-[85%] sm:w-[95%] w-[98%] m-auto md:flex gap-4 items-start '>
                <div className='shadow-md bg-white p-4 rounded-lg xl:w-[40%] flex-1'>
                    <div className='w-full flex lg:flex-row flex-col justify-between gap-2 mb-3'>
                        <h1 className='font-semibold'> Select Delivery Address</h1>
                        <Button className="!border-amber-600 !text-amber-600 !border hover:!bg-black/70 hover:!text-white hover:!border-none">Add Delivery Address</Button>
                    </div>
                    <div className='flex gap-1 bg-blue-100/50 p-2 rounded-md mb-2'>
                        <input type="radio" name="address" id="address1" />
                        <AddressItem />
                    </div>

                    <div className='flex gap-1 bg-blue-100/50 p-2 rounded-md mb-2'>
                        <input type="radio" name="address" id="address2" />
                        <AddressItem />
                    </div>

                </div>
                <div className='shadow-md rounded-md border-gray-800 p-6 bg-white xl:w-[40%] lg:w-[50%] my-4 md:my-0'>
                    <h3 className='py-3 border-b border-gray-300'>Your Order</h3>
                    <div className='py-3 border-b border-gray-300 flex justify-between items-center'>
                        <p>Product</p>
                        <p>SubTotal</p>
                    </div>
                    <div className='py-2 flex flex-col gap-3'>
                        <div className='overflow-y-auto scrollbar-sidebar max-h-[300px] pr-3'>
                            <div className='flex gap-2 items-start   my-3'>
                                <img src="/productImg1.webp" alt="product" className='w-[50px] h-[50px] rounded-md shadow-md' />
                                <div className='flex-1'>
                                    <h5 className='text-lg font-semibold'>{`Polo Collor Pure Cottom Shirt`.slice(0, 20)}...</h5>
                                    <p className='flex gap-1'>
                                        <span>Qty:</span>
                                        <span>1</span>
                                    </p>
                                </div>
                                <p>$299.00</p>
                            </div>
                            <div className='flex gap-2 items-start   my-3'>
                                <img src="/productImg1.webp" alt="product" className='w-[50px] h-[50px] rounded-md shadow-md' />
                                <div className='flex-1'>
                                    <h5 className='text-lg font-semibold'>{`Polo Collor Pure Cottom Shirt`.slice(0, 20)}...</h5>
                                    <p className='flex gap-1'>
                                        <span>Qty:</span>
                                        <span>1</span>
                                    </p>
                                </div>
                                <p>$299.00</p>
                            </div>
                            <div className='flex gap-2 items-start   my-3'>
                                <img src="/productImg1.webp" alt="product" className='w-[50px] h-[50px] rounded-md shadow-md' />
                                <div className='flex-1'>
                                    <h5 className='text-lg font-semibold'>{`Polo Collor Pure Cottom Shirt`.slice(0, 20)}...</h5>
                                    <p className='flex gap-1'>
                                        <span>Qty:</span>
                                        <span>1</span>
                                    </p>
                                </div>
                                <p>$299.00</p>
                            </div>
                            <div className='flex gap-2 items-start   my-3'>
                                <img src="/productImg1.webp" alt="product" className='w-[50px] h-[50px] rounded-md shadow-md' />
                                <div className='flex-1'>
                                    <h5 className='text-lg font-semibold'>{`Polo Collor Pure Cottom Shirt`.slice(0, 20)}...</h5>
                                    <p className='flex gap-1'>
                                        <span>Qty:</span>
                                        <span>1</span>
                                    </p>
                                </div>
                                <p>$299.00</p>
                            </div>
                            <div className='flex gap-2 items-start   my-3'>
                                <img src="/productImg1.webp" alt="product" className='w-[50px] h-[50px] rounded-md shadow-md' />
                                <div className='flex-1'>
                                    <h5 className='text-lg font-semibold'>{`Polo Collor Pure Cottom Shirt`.slice(0, 20)}...</h5>
                                    <p className='flex gap-1'>
                                        <span>Qty:</span>
                                        <span>1</span>
                                    </p>
                                </div>
                                <p>$299.00</p>
                            </div>
                            <div className='flex gap-2 items-start   my-3'>
                                <img src="/productImg1.webp" alt="product" className='w-[50px] h-[50px] rounded-md shadow-md' />
                                <div className='flex-1'>
                                    <h5 className='text-lg font-semibold'>{`Polo Collor Pure Cottom Shirt`.slice(0, 20)}...</h5>
                                    <p className='flex gap-1'>
                                        <span>Qty:</span>
                                        <span>1</span>
                                    </p>
                                </div>
                                <p>$299.00</p>
                            </div>
                        </div>

                        <Button className='!my-2 !text-white !bg-red-400 hover:!bg-red-500 !uppercase !flex !gap-1'>
                            <MdPayment size={22} />
                            <span>Continue to Payment</span>
                        </Button>
                        <Button className='!my-2 !py-3 !bg-yellow-500 hover:!bg-yellow-600'>
                            paypal
                        </Button>
                        <Button className='!my-2 !text-white !bg-black hover:!bg-black/80 !uppercase !flex !gap-1'>
                            <TbCash size={22} />
                            <span>Cash on Delivery</span>

                        </Button>

                    </div>


                </div>
            </div>
        </>
    )
}

export default CheckOut