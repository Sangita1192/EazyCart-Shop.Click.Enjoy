import { Button } from '@mui/material';
import React, { useState } from 'react'
import { RiHeartAddFill } from "react-icons/ri";
import ProductItem from '../ProductItem';

const Wishlist = () => {
      const [wishlist, setWishlist] = useState([]);
  return (
    <>

        <div className=' bg-white/70 md:flex-1 md:p-6 p-2 rounded-md w-full mb-[25px] md:mb-0 text-gray-600 flex flex-col gap-2'>
          <div className='border-b pb-2 border-gray-300'>
            <h3 className='text-lg font-semibold'>
              Your Wishlist
            </h3>
            <p>There are <span className='text-amber-600 font-bold'>0</span> product in your wishlist.</p>
          </div>
          <div className='md:flex-1'>
            {
              wishlist.length > 1 ?
                (
                  <div className='flex-1 flex flex-col justify-center items-center gap-3 py-6'>
                    <RiHeartAddFill size={65} className='!text-red-400' />
                    <p className='text-xl font-semibold text-gray-600'>Your wishlist is empty.</p>
                    <Button className='!bg-amber-600 !text-white hover:!bg-amber-700 !mt-2'>
                      Continue Shopping
                    </Button>
                  </div>
                ) :
                (
                  <div className='p-2 grid xl:grid-cols-3 xs:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2 '>
                    <ProductItem/>
                     <ProductItem/>
                     <ProductItem/>
                     <ProductItem/>            
                  </div>
                )
            }
          </div>
        </div>

    </>
  )
}

export default Wishlist