import { Button } from "@mui/material";
import { useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import logo from "/Images/logo.png"
import { NavLink } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="min-h-screen bg-[#f1f1f1] flex flex-col items-center">
            {/* <header className="w-full shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)] z-90">
                <div className="py-[10px] md:flex justify-between items-center w-[80%] m-auto" >
                    
                    <div className="flex gap-3 my-[15px] md:my-[0px]">
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `rounded-xl text-white px-4 py-2 ${isActive ? 'bg-blue-800' : 'bg-blue-600'
                                } hover:bg-blue-800`
                            }
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                `rounded-lg text-white px-4 py-2 ${isActive ? 'bg-blue-800' : 'bg-blue-400'
                                } hover:bg-blue-800`
                            }
                        >
                            Sign up
                        </NavLink>
                    </div>
                </div>
            </header> */}
            <img src={logo} alt="" className="w-[230px] py-[15px]" />
            <div className="flex flex-col items-center">
                <div className="bg-gray-200 py-[20px] px-[50px] rounded-lg shadow-lg my-[10px]">
                    <h1 className="text-2xl font-bold text-center py-[15px]">Welcome Back!</h1>

                    <div className="md:flex gap-[15px]">
                        <div className="border border-1 hover:border-blue-800  my-[20px] p-[15px] rounded-md flex gap-[10px] items-center justify-center cursor-pointer">
                            <FcGoogle />
                            <span className="font-semibold font-[20px]">Sign In with Google</span>
                        </div>
                        <div className="hover:border-blue-800 border  my-[20px] p-[15px] rounded-md flex gap-[10px] items-center justify-center cursor-pointer">
                            <FaFacebookF className="text-blue-900" />
                            <span className="font-semibold font-[20px]">Sign In with Facebook</span>
                        </div>
                    </div>
                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-4 text-gray-500 font-semibold text-sm">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <p className="text-xl text-center font-bold mb-[25px]">Please enter your credentials to log in</p>

                    <div>
                        <div className="mb-3 flex flex-col gap-[5px] relative">
                            <label htmlFor="email" hidden>Email</label>
                            <input type="text" className="bg-[#f1f1f1] px-[35px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Enter your email" />
                            <MdEmail className="absolute top-1/2 left-[10px] transform -translate-y-1/2 text-gray-500" />
                        </div>
                        <div className="mb-1 flex flex-col gap-[5px]">
                            <label htmlFor="password" hidden>Password</label>

                            <div className="w-full relative">
                                <RiLockPasswordFill className="absolute top-1/2 left-[10px] transform -translate-y-1/2 text-gray-500" />
                                <input type={`${showPassword ? "text" : "password"}`} className="w-full bg-[#f1f1f1] px-[10px] ps-[35px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Enter your password" />
                                <div
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <PiEyeClosedBold /> : <PiEyeBold />}
                                </div>
                            </div>

                        </div>
                        <p className="underline cursor-pointer font-[14px] mb-3">forgot password</p>
                        <Button className="!w-full !bg-blue-600 !mt-[20px] !text-white hover:!bg-blue-700 !capitalize">
                            Login
                        </Button>

                    </div>

                    <div className="mt-[10px] mb-[20px] p-[15px] rounded-md flex gap-[10px] items-center justify-center cursor-pointer">
                        <p className="font-semibold font-[20px]">Don't have account ?
                            <span className="cursor-pointer hover:!text-blue-800"> Register</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;