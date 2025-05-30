import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom';
import { showError, showSuccess } from '../services/toastService';
import { userRegister } from '../Api/api';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setErrors({});
            const payload = new FormData();
            payload.append("name", formData.name.trim());
            payload.append("email", formData.email.trim());
            payload.append("password", formData.password);
            payload.append("confirm_password", formData.confirm_password);

            await userRegister(payload);

            setFormData({
                name: "",
                email: "",
                password: "",
                confirm_password: ""
            });
            showSuccess("Registration Successful, Please verfiy your email");
        } catch (error) {
            const { message, errors, status } = error;
            console.log(message, errors, status);
            if (status === 404) {
                // Navigate('/not-found');
                console.log("notfound");
                return;
            }
            if (errors) {
                setErrors(errors);
                return;
            }
            showError(message || "Something went wrong.");

        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='xl:w-[35%] lg:w-[50%] sm:w-[60%] w-[95%] border border-gray-200 my-[25px] p-[15px] py-[25px] shadow-lg rounded-lg text-center'>
                <h3 className='text-lg font-[600] text-gray-600 my-3'>Register with new account</h3>
                <form className='flex flex-col gap-[15px] items-center' onSubmit={handleSubmit}>
                    <label htmlFor="name" className='hidden'>Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="p-3 w-[80%] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-amber-500 focus:border-blue-500 transition-all"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                    <label htmlFor="email" className='hidden'>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 w-[80%] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-amber-500 focus:border-blue-500 transition-all"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                    <label htmlFor="password" className='hidden'>Password</label>
                    <div className='w-[80%] relative'>
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-amber-500 focus:border-blue-500 transition-all"
                        />
                        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        >
                            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </div>
                    </div>
                    <div className='w-[80%] relative'>
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            id="confirm_password"
                            name="confirm_password"
                            onChange={handleChange}
                            value={formData.confirm_password}
                            placeholder="confirm_password"
                            className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-amber-500 focus:border-blue-500 transition-all"
                        />
                        {errors.confirm_password && <p className="text-red-600 text-sm mt-1">{errors.confirm_password}</p>}
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        >
                            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </div>
                    </div>
                    <Button
                        className='!text-white !bg-orange-400 !w-[80%] !p-2 !text-lg'
                        disabled={loading}
                        type='submit'
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : 'Register'}
                    </Button>
                </form>

                <p className='w-[80%] mt-2 m-auto'>
                    <span>Not Registered ? </span>
                    <Link to="/login">
                        <span className='text-amber-600 font-[600] cursor-pointer hover:text-amber-700'> Login </span>
                    </Link>

                </p>
                <p className='w-[80%] mt-3 mb-1 m-auto'>Or continue with social account</p>

                <Button className='!normal-case !w-[80%] !p-2 !text-md !flex gap-[10px] !bg-gray-300 hover:!bg-gray-400 !m-auto'>
                    <FcGoogle size={22} />
                    Sign Up with Google
                </Button>


            </div>

        </div>
    )
}

export default Register