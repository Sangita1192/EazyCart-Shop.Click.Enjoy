import { Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { showError, showSuccess, showWarning } from '../services/toastService';
import { userLogin } from '../Api/api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';

const Login = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            showWarning("Please enter both email and password");
            return;
        }
        try {
            setLoading(true);
            const res = await userLogin(email, password);
            dispatch(loginSuccess(res.data.user));
            showSuccess(res.data.message || "Login successful");
            localStorage.setItem("EazyCartUser", true);
            nav('/');
        } catch (error) {
            showError(error?.message || "Invalid email or password");
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='xl:w-[35%] lg:w-[50%] sm:w-[60%] w-[95%] border border-gray-200 my-[25px] p-[15px] py-[25px] shadow-lg rounded-lg items-center flex flex-col gap-[15px]'>
                <h3 className='text-lg font-[600] text-gray-600'>Login to your account</h3>
                <label htmlFor="email" className='hidden'>Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                <p className='w-[80%] hover:text-red-400 cursor-pointer'>Forgot password ?</p>
                <Button
                    onClick={handleLogin}
                    disabled={loading}
                    className='!text-white !bg-amber-600 !w-[80%] !p-2 !text-lg !cursor-pointer hover:!bg-amber-700'
                >
                    {loading ? <CircularProgress size={20} color="inherit" /> : 'Login'}
                </Button>
                <p className='w-[80%] mt-2 text-center'>
                    <span>Not Registered ? </span>
                    <Link to="/register">
                        <span className='text-amber-600 font-[600] cursor-pointer hover:text-amber-700'> Sign Up </span>
                    </Link>

                </p>
                <p className='w-[80%] text-center'>Or continue with social account</p>

                <Button className='!normal !w-[80%] !p-2 !text-md !flex gap-[10px] !bg-gray-300 hover:!bg-gray-400'>
                    <FcGoogle size={22} />
                    Login with Google
                </Button>


            </div>

        </div>
    )
}

export default Login