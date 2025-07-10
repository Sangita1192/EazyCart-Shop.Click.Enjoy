import { Button } from '@mui/material'
import React, { useState } from 'react'
import { FaRegHeart, FaRegUser } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'
import { RiShoppingBag4Line } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../services/authServices';
import { useDispatch } from 'react-redux';

const MobileFooter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setMenu] = useState(false);

    const onLogoutClick = async () => {
        setMenu(false);
        handleLogout({ dispatch, navigate })
    };
    return (
        <div className="fixed bottom-0 left-0 w-full block md:hidden bg-white shadow-[0_-4px_8px_rgba(0,0,0,0.05)] z-[9999]">
            <div className='w-[98%] justify-between items-center grid grid-cols-4'>
                <NavLink to="/" className={({ isActive }) =>
                    `flex flex-col items-center ${isActive ? '!bg-orange-600/20' : 'text-gray-600'}`
                } onClick={() => setMenu(false)}>
                    <Button className='!text-center !normal-case !flex !flex-col !text-gray-600 !pt-3'>
                        <IoHomeOutline />
                        <p>Home</p>
                    </Button>
                </NavLink>
                <NavLink to="/my-account/wishlist" className={({ isActive }) =>
                    `flex flex-col items-center ${isActive ? '!bg-orange-600/20' : 'text-gray-600'}`} onClick={() => setMenu(false)}>
                    <Button className='!text-center !normal-case !flex !flex-col !text-gray-600 !pt-3'>
                        <FaRegHeart />
                        <p>Wishlist</p>
                    </Button>
                </NavLink>
                <NavLink to="/my-account/orders" className={({ isActive }) =>
                    `flex flex-col items-center ${isActive ? '!bg-orange-600/20' : 'text-gray-600'}`} onClick={() => setMenu(false)}>
                    <Button className='!text-center !normal-case !flex !flex-col !text-gray-600 !pt-3'>
                        <RiShoppingBag4Line />
                        <p>Orders</p>
                    </Button>
                </NavLink>
                <NavLink to="/my-account" end className={({ isActive }) =>
                    `flex flex-col items-center ${isActive ? '!bg-orange-600/20' : 'text-gray-600'}`}>
                    <Button className='!text-center !normal-case !flex !flex-col !text-gray-600 !pt-3' onClick={() => setMenu(!isMenuOpen)}>
                        <FaRegUser />
                        <p>Account</p>
                    </Button>

                </NavLink>
                {isMenuOpen && (
                    <div className="absolute bottom-14 right-2 flex flex-col w-[150px] bg-white rounded shadow z-50">
                        <NavLink
                            to="/my-account"
                            className="px-4 py-2 hover:bg-gray-100 text-left"
                            onClick={() => setMenu(false)}
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            to="/my-account/address"
                            className="px-4 py-2 hover:bg-gray-100 text-left"
                            onClick={() => setMenu(false)}
                        >
                            Address
                        </NavLink>
                        <button
                            onClick={onLogoutClick}
                            className="px-4 py-2 hover:bg-gray-100 text-left"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MobileFooter