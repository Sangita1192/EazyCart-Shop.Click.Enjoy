import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { RiHeartAddFill } from "react-icons/ri";
import ProductItem from '../ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { showError, showSuccess } from '../../services/toastService';
import { clearWishlists } from '../../Api/api';
import { fetchWishlist } from '../../redux/slices/wishlistSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlists } = useSelector((state) => state.wishlist);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(wishlists.map(wishlist => wishlist.product));
  }, [wishlists]);

  const handleClearWishlist = async () => {
    try {
      await clearWishlists();
      showSuccess("clear wishlists successfully");
      dispatch(fetchWishlist());
    }
    catch (error) {
      showError(error.message || "something went wrong");
    }
  }
  return (
    <>

      <div className=' bg-white/70 md:flex-1 md:p-6 p-2 rounded-md w-full mb-[25px] md:mb-0 text-gray-600 flex flex-col gap-2'>
        <div className='border-b pb-2 border-gray-300 md:flex justify-between'>
          <div>
            <h3 className='text-lg font-semibold'>
              Your Wishlist
            </h3>
            <p>There are <span className='text-amber-600 font-bold'>{wishlist?.length || 0}</span> product in your wishlist.</p>
          </div>
          {wishlist?.length > 0 &&
            <Button className='!bg-red-500 !text-white hover:!bg-red-700/80 !mt-2 !px-3' onClick={handleClearWishlist}>
              Clear Wishlist
            </Button>
          }
        </div>
        <div className='md:flex-1'>
          {
            wishlist?.length > 0 ?
              (
                <>
                  <div className='p-2 grid xl:grid-cols-3 xs:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2 '>
                    {wishlist?.map(prod => (
                      <ProductItem product={prod} key={prod._id} />
                    ))}
                  </div>

                </>

              ) :
              (
                <div className='flex-1 flex flex-col justify-center items-center gap-3 py-6'>
                  <RiHeartAddFill size={65} className='!text-red-400' />
                  <p className='text-xl font-semibold text-gray-600'>Your wishlist is empty.</p>
                  <Link to="/products">
                    <Button className='!bg-amber-600 !text-white hover:!bg-amber-700 !mt-2'>
                      Continue Shopping
                    </Button>
                  </Link>

                </div>
              )
          }
        </div>
      </div>

    </>
  )
}

export default Wishlist