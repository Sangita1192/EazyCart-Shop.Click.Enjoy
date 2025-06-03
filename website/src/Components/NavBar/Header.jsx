import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from './../../../public/logo.png'
import Search from './Search';
import Badge from '@mui/material/Badge';
import { FaBars, FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoLogOut } from "react-icons/io5";
import Button from '@mui/material/Button';
import MenuBar from './MenuBar';
import Cart from '../Cart';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { logout, logoutUserThunk } from '../../redux/slices/authSlice';
import { showError, showSuccess } from '../../services/toastService';

const Header = ({ isSideBarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const { isLoggedIn, user, loading } = useSelector((state) => state.auth)
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showAccount, setShowAccount] = useState(false);

    const handleLogout = async () => {
        setShowAccount(false);
        try {
            const res = await dispatch(logoutUserThunk());
            if (res?.meta?.requestStatus === "fulfilled") {
                showSuccess("Logged out successfully");
                localStorage.removeItem("EazyCartUser");
                nav('/');
            } else {
                showError("Logout failed");
            }
        } catch (error) {
            showError("Something went wrong during logout");
        }
    };

    return (
        <>
            <header className='w-full bg-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)] z-[999]'>
                <div className='w-full border-b border-gray-100 py-[4px] hidden lg:block'>
                    <div className='w-[80%] m-auto text-[rgba(0,0,0,0.8)] '>
                        <div className='flex justify-between w-full'>
                            <p className="">Get up to 50% off new season styles, limited time only</p>
                            <ul className='flex justify-center items-center gap-[15px] list-unstyled'>
                                <li className='cursor-pointer hover:text-blue-300 list-none'>Help Center</li>
                                <li className='cursor-pointer hover:text-blue-300 list-none'>
                                    <Link to="/">
                                        Order tracking
                                    </Link>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full border-t border-b border-gray-100 py-[10px]">
                    <div className="w-[85%] m-auto">
                        <div className='flex justify-between gap-[10px] items-center'>
                            <FaBars className="block lg:hidden" onClick={() => setIsSidebarOpen(true)} />
                            <div className='w-[25%] '>
                                <img src={logo} alt="Logo" className='w-[220px] h-[60px]' />
                            </div>
                            <div className='w-[40%] hidden lg:block'>
                                <Search />
                            </div>
                            <div className='w-[35%] lg:flex gap-[20px] justify-center items-center hidden'>
                                {loading ? (
                                    <LoadingSpinner />
                                ) : isLoggedIn && user ? (
                                    <div className='relative'>
                                        <Button className="flex gap-[10px] items-center !text-black !text-[14px] !text-left !normal-case" onClick={() => setShowAccount(!showAccount)}>
                                            <div className="!w-[35px] !h-[35px] !rounded-full flex items-center justify-center bg-gray-200">
                                                <FaRegUser size={24} className="text-black" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <p>{user.name}</p>
                                                <p>{user.email}</p>
                                            </div>
                                        </Button>
                                        <ul
                                            className={`w-full z-[1000] rounded-md absolute top-full bg-gray-200 left-0 ${showAccount ? 'block' : 'hidden'
                                                }`}
                                        >
                                            <li onClick={() => setShowAccount(false)} className='cursor-pointer'>
                                                <NavLink
                                                    to="/my-account"
                                                    end
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-3 py-3 border-b border-gray-300 hover:text-amber-600 ${isActive ? 'border-l-4 border-l-amber-600 pl-2' : 'pl-4'
                                                        }`
                                                    }
                                                >
                                                    <MdOutlineManageAccounts size={22} />
                                                    <span>My Account</span>
                                                </NavLink>
                                            </li>
                                            <li onClick={() => setShowAccount(false)} className='cursor-pointer'>
                                                <NavLink
                                                    to="/my-account/wishlist"
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-3 py-3 border-b border-gray-300 hover:text-amber-600 ${isActive ? 'border-l-4 border-l-amber-600 pl-2' : 'pl-4'
                                                        }`
                                                    }
                                                >
                                                    <FaRegHeart size={22} />
                                                    My Wishlist
                                                </NavLink>
                                            </li>
                                            <li onClick={handleLogout} className={`pl-2 cursor-pointer flex items-center gap-3 py-3 border-b border-gray-300 hover:text-amber-600`}>
                                                <IoLogOut size={22} />
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="flex gap-2 text-sm font-semibold text-amber-600">
                                        <Link to="/login" className="hover:text-amber-700 cursor-pointer">Login</Link>
                                        <span>/</span>
                                        <Link to="/register" className="hover:text-amber-700 cursor-pointer">Register</Link>
                                    </div>
                                )}

                                <FaRegHeart className='text-[22px]' />
                                <Badge badgeContent={4} color="success">
                                    <IoCartOutline className='text-[24px]' onClick={() => setIsCartOpen(true)} />
                                </Badge>
                            </div>
                            <div className='flex sm:gap-4 gap-2 lg:hidden cursor-pointer'>
                                <Badge badgeContent={4} color="success" >
                                    <IoCartOutline className='text-[24px]' onClick={() => setIsCartOpen(true)} />
                                </Badge>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='w-full border-t border-b border-gray-100'>
                    <MenuBar setIsSidebarOpen={setIsSidebarOpen} />
                </div>
            </header>
            <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />


        </>
    )
}

export default Header