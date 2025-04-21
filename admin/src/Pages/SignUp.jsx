import { Button } from '@mui/material';
import React, { useState } from 'react'
import logo from "/Images/logo.png"
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';
import { BiPhone, BiUser } from 'react-icons/bi';
import { IoShieldCheckmark } from "react-icons/io5";
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="min-h-screen bg-[#f1f1f1] flex flex-col items-center">
            <img src={logo} alt="" className="w-[230px] py-[15px]" />
            <div className="flex flex-col items-center">
                <div className="bg-gray-200 py-[20px] px-[50px] rounded-lg shadow-lg my-[10px]">
                    <div>
                        <div className="mb-3 flex flex-col gap-[5px] relative">
                            <label htmlFor="name" hidden>name</label>
                            <input type="text" className="bg-[#f1f1f1] px-[35px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Enter your name" />
                            <BiUser className="absolute top-1/2 left-[10px] transform -translate-y-1/2 text-gray-500" />
                        </div>
                        <div className="mb-3 flex flex-col gap-[5px] relative">
                            <label htmlFor="phone" hidden>Phone</label>
                            <input type="text" className="bg-[#f1f1f1] px-[35px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Enter phone number" />
                            <BiPhone className="absolute top-1/2 left-[10px] transform -translate-y-1/2 text-gray-500" />
                        </div>
                        <div className="mb-3 flex flex-col gap-[5px] relative">
                            <label htmlFor="email" hidden>Email</label>
                            <input type="text" className="bg-[#f1f1f1] px-[35px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Enter your email" />
                            <MdEmail className="absolute top-1/2 left-[10px] transform -translate-y-1/2 text-gray-500" />
                        </div>
                        <div className="mb-3 flex flex-col gap-[5px]">
                            <label htmlFor="password" hidden>Password</label>
                            <div className="w-full relative">
                                <RiLockPasswordFill className="absolute top-1/2 left-[10px] transform -translate-y-1/2 text-gray-500" />
                                <input type={`${showPassword ? "text" : "password"}`} className="w-full bg-[#f1f1f1] px-[10px] ps-[35px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Enter Password" />
                                <div
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <PiEyeClosedBold /> : <PiEyeBold />}
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 flex flex-col gap-[5px]">
                            <label htmlFor="confirm_password" hidden>Confirm Password</label>
                            <div className="w-full relative">
                                <IoShieldCheckmark className="absolute top-1/2 left-[10px] transform -translate-y-1/2 text-gray-500" />
                                <input type={`${showPassword ? "text" : "password"}`} className="w-full bg-[#f1f1f1] px-[10px] ps-[35px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Confirm password" />
                                <div
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <PiEyeClosedBold /> : <PiEyeBold />}
                                </div>
                            </div>
                        </div>
                        <Button className="!w-full !bg-blue-600 !mt-[20px] !text-white hover:!bg-blue-700 !capitalize">
                            Register
                        </Button>

                    </div>

                    <div className="mt-[10px] mb-[20px] p-[15px] rounded-md flex gap-[10px] items-center justify-center cursor-pointer">
                        <p className="font-semibold font-[20px]">Already have account ?
                            <Link to="/login">
                                <span className="cursor-pointer hover:!text-blue-800"> Login</span>
                            </Link>

                        </p>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default SignUp