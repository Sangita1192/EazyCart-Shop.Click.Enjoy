import React from 'react'
import MobileFooter from './MobileFooter';
import { FiTruck } from "react-icons/fi";
import { MdPayment } from 'react-icons/md';
import { IoGiftSharp } from 'react-icons/io5';
import { FaCcAmex, FaCcMastercard, FaCcPaypal, FaCcVisa, FaFacebook, FaGoogle, FaHeadphones, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa6';
import { Button } from '@mui/material';


const Footer = () => {
    return (
        <>
            <footer className='md:pb-0 pb-[50px]'>
                <MobileFooter />
                <div className='w-full border pt-8 bg-white'>
                    <div className='lg:w-[80%] md:w-[90%] w-[95%] m-auto'>
                        <div className='w-full grid sm:grid-cols-4 grid-cols-2 gap-[15px] border-b border-gray-200 py-6 '>
                            <div className='flex flex-col items-center text-center gap-[6px]'>
                                <FiTruck size={30} />
                                <h2 className='sm:text-xl font-[600] text-lg'>Free Shipping</h2>
                                <p>For all orders above $39</p>
                            </div>
                            <div className='flex flex-col items-center text-center gap-[6px]'>
                                <MdPayment size={30} />
                                <h2 className='sm:text-xl font-[600] text-lg'> Secure Payment</h2>
                                <p>Payment card accepted</p>
                            </div>
                            <div className='flex flex-col items-center text-center gap-[6px]'>
                                <FaHeadphones size={30} />
                                <h2 className='sm:text-xl font-[600] text-lg'>24/7 Support</h2>
                                <p>Contact Us anytime</p>
                            </div>
                            <div className='flex flex-col items-center text-center gap-[6px]'>
                                <IoGiftSharp size={30} />
                                <h2 className='sm:text-xl font-[600] text-lg'>Special Gifts</h2>
                                <p>On your first order</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[95%] lg:w-[90%] m-auto'>
                        <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 justify-between mt-3'>
                            <div className='sm:pr-[15px] py-[10px] border-b border-gray-200 sm:border-none'>
                                <h3 className='text-lg font-[600]'>Contact Us</h3>
                                <p className='text-sm mt-2 text-gray-600'>Eazy Cart- King George, Surrey, British Columbia, Canada</p>
                                <p className='mt-2 text-gray-600'>sales@eazycart.com</p>
                                <p className='text-red-600 text-xl font-[600] mt-2'>+1-(779-123-0589)</p>
                            </div>

                            <div className='sm:pl-[15px] grid grid-cols-2 justify-between py-[10px] border-b border-gray-200 sm:border-none'>
                                <div>
                                    <h3 className='text-lg font-[600]'>Our Company</h3>
                                    <ul className='list-unstyled text-gray-600 text-sm'>
                                        <li className='mt-2'>Secure Payment</li>
                                        <li className='mt-1'>Terms & Conditions</li>
                                        <li className='mt-1'>Legal Notice</li>
                                        <li className='mt-1'>About Us</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className='text-lg font-[600]'>Products</h3>
                                    <ul className='list-unstyled text-gray-600 text-sm'>
                                        <li className='mt-2'>New Products</li>
                                        <li className='mt-1'>Best Sales</li>
                                        <li className='mt-1'>Sitemap</li>
                                        <li className='mt-1'>Stores</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='pr-[15px] sm:col-span-2 lg:col-span-1 py-[10px]'>
                                <h3 className='text-lg font-[600]'>Subscribe to Newsletter</h3>
                                <p className='text-sm mt-2 text-gray-600'>Subscribe to our newsletter to get news about special discounts</p>
                                <input type="text" placeholder='Enter your email' className='w-full px-[15px] py-[10px] border mt-2 rounded-md focus:border-amber-600' />
                                <div className="mt-1 flex items-start">
                                    <input
                                        type="checkbox"
                                        className="mr-2 mt-1 accent-red-400 text-white"
                                    />
                                    <label className="text-sm">
                                        I agree to the terms and conditions and the privacy policy.
                                    </label>
                                </div>
                                <Button className='!bg-red-400 !text-white !mt-[10px] !w-full hover:!bg-red-500'> Subscribe</Button>
                            </div>

                        </div>
                    </div>
                    <div className='g:w-[80%] md:w-[90%] w-[95%] m-auto py-[20px] border-t border-gray-200 mt-[15px] flex sm:flex-row flex-col gap-[15px] justify-between items-center'>
                        <div className='flex gap-2 text-2xl'>
                            <FaInstagram className="text-pink-500" />
                            <FaFacebook className="text-blue-600" />
                            <FaYoutube className="text-red-600" />
                            <FaPinterest className="text-red-500" />
                        </div>
                        <div className='text-gray-500 text-center'>
                            <p>© 2025 - Eazy Cart</p>
                            <p>Shop.Click.Go</p>
                        </div>
                        <div className="flex gap-2 text-3xl">
                            <FaCcVisa className="text-blue-700" />
                            <FaCcMastercard className="text-red-600" />
                            <FaCcPaypal className="text-blue-500" />
                            <FaCcAmex className="text-indigo-700" />
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer