import { Button } from '@mui/material';
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='xl:w-[35%] lg:w-[50%] sm:w-[60%] w-[95%] border border-gray-200 my-[25px] p-[15px] py-[25px] shadow-lg rounded-lg items-center flex flex-col gap-[15px]'>
                <h3 className='text-lg font-[600] text-gray-600'>Register with new account</h3>
                <label htmlFor="fname" className='hidden'>Full Name</label>
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Full Name"
                    className="p-3 w-[80%] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-amber-500 focus:border-blue-500 transition-all"
                    required
                />
                <label htmlFor="email" className='hidden'>Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="p-3 w-[80%] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-amber-500 focus:border-blue-500 transition-all"
                    required
                />
                <label htmlFor="password" className='hidden'>Password</label>
                <div className='w-[80%] relative'>
                    <input
                        type={`${showPassword ? "text" : "password"}`}
                        id="password"
                        name="password"
                        placeholder="Password"
                        className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-amber-500 focus:border-blue-500 transition-all"
                        required
                    />
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                        {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </div>
                </div>
                <Button className='!text-white !bg-orange-400 !w-[80%] !p-2 !text-lg'>Register</Button>
                <p className='w-[80%] mt-2 text-center'>
                    <span>Not Registered ? </span>
                    <Link to="/login">
                        <span className='text-amber-600 font-[600] cursor-pointer hover:text-amber-700'> Login </span>
                    </Link>

                </p>
                <p className='w-[80%] text-center'>Or continue with social account</p>

                <Button className='!normal-case !w-[80%] !p-2 !text-md !flex gap-[10px] !bg-gray-300 hover:!bg-gray-400'>
                    <FcGoogle size={22} />
                    Sign Up with Google
                </Button>


            </div>

        </div>
    )
}

export default Register