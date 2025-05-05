import { Button } from '@mui/material'
import React from 'react'
import { FaRegHeart, FaRegUser } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'
import { RiShoppingBag4Line } from "react-icons/ri";

const Footer = () => {
    return (
        <>
            <footer>

                {/* Mobile footer */}
                <div className="fixed bottom-0 left-0 w-full block md:hidden bg-white shadow-[0_-4px_8px_rgba(0,0,0,0.05)]">
                    <div className='w-[98%] justify-between items-center grid grid-cols-4'>
                        <Button className='!text-center !normal-case !flex !flex-col !text-gray-600 !pt-3'>
                            <IoHomeOutline />
                            <p>Home</p>
                        </Button>
                        <Button className='!text-center !normal-case !flex !flex-col !text-gray-600 !pt-3'>
                            <FaRegHeart />
                            <p>Wishlist</p>
                        </Button>
                        <Button className='!text-center !normal-case !flex !flex-col !text-gray-600 !pt-3'>
                            <RiShoppingBag4Line />
                            <p>Orders</p>
                        </Button>
                        <Button className='!text-center !normal-case !flex !flex-col !text-gray-600 !pt-3'>
                            <FaRegUser />
                            <p>Account</p>
                        </Button>

                    </div>


                </div>
            </footer>
        </>
    )
}

export default Footer