import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../../../public/logo.png'
import Search from './Search';
import Badge from '@mui/material/Badge';
import { FaBars, FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import MenuBar from './MenuBar';

const Header = ({isSideBarOpen, setIsSidebarOpen}) => {
    const [login, setLogin] = useState(true)
    return (
        <>
            <header className='w-full bg-white'>
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
                            <FaBars className="block lg:hidden" onClick={()=>setIsSidebarOpen(true)}/>
                            <div className='w-[25%] '>
                                <img src={logo} alt="Logo" className='w-[220px] h-[60px]' />
                            </div>
                            <div className='w-[40%] hidden lg:block'>
                                <Search />
                            </div>
                            <div className='w-[35%] lg:flex gap-[20px] justify-center items-center hidden'>
                                {
                                    login ?
                                        <Button className="flex gap-[10px] items-center !text-black !text-[14px] !text-left !normal-case">
                                            <div className="!w-[35px] !h-[35px] !rounded-full flex items-center justify-center bg-gray-200">
                                                <FaRegUser size={24} className="text-black" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <p >Sangeeta</p>
                                                <p >sangita@gmail.com</p>
                                            </div>
                                        </Button>

                                        :
                                        <p>Login/Register</p>

                                }

                                <FaRegHeart className='text-[22px]' />
                                <Badge badgeContent={4} color="success">
                                    <IoCartOutline className='text-[24px]' />
                                </Badge>

                            </div>
                            <div className='block lg:hidden'>
                                <Badge badgeContent={4} color="success" >
                                    <IoCartOutline className='text-[24px]' />
                                </Badge>
                            </div>


                        </div>
                    </div>

                </div>
                <div className='w-full border-t border-b border-gray-100'>
                    <MenuBar setIsSidebarOpen={setIsSidebarOpen}/>
                </div>

            </header>


        </>
    )
}

export default Header