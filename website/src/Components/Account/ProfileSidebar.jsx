import React from 'react'
import { FaRegHeart, FaUser } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { FiLogOut } from 'react-icons/fi'
import { IoBagAdd } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { handleLogout } from '../../services/authServices'

const ProfileSidebar = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    const activeLink = ({ isActive }) =>
        `flex gap-2 items-center px-4 py-3 cursor-pointer border-l-4 ${isActive ? 'border-amber-600' : 'border-none'
        }`;

    // const onLogoutClick = () => {
    //     handleLogout({ dispatch, navigate });
    // };

return (
    <>
        <div className='rounded-lg w-[80%] w-[200px] lg:w-[280px]'>
            <div className='flex flex-col gap-2 justify-center items-center py-4 bg-white px-6'>
                <img src="/fallbackUser.webp" alt="profile picture" className='w-[100px] h-[100px] rounded-full' />
                <div className='text-center'>
                    <h6 className='font-semibold'>Sangeeta Panwar</h6>
                    <p>sangita@gmail.com</p>
                </div>
            </div>
            <div className='bg-gray-200/70'>
                <NavLink to="/my-account" end className={activeLink}>
                    <FaUser />
                    <span>My Profile</span>
                </NavLink>
                <NavLink to="/my-account/address" className={activeLink}>
                    <FaLocationDot />
                    <span>Address</span>
                </NavLink>
                <NavLink to="/my-account/wishlist" className={activeLink}>
                    <FaRegHeart />
                    <span>My Wishlist</span>
                </NavLink>
                <NavLink to="/my-account/orders" className={activeLink}>
                    <IoBagAdd />
                    <span>My Orders</span>
                </NavLink>
                {/* <div className='flex gap-2 items-center px-4 py-3 cursor-pointer' onClick={onLogoutClick}>
                    <FiLogOut />
                    <span>Logout</span>
                </div> */}

            </div>

        </div>
    </>
)
}

export default ProfileSidebar