import { Button } from '@mui/material';
import React, { useState } from 'react';
import logo from "/Images/logo.png";
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';
import { BiUser } from 'react-icons/bi';
import { IoShieldCheckmark } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { adminUserRegister } from '../api/adminUser';
import { showError, showSuccess } from '../services/toastService';

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.confirm_password) newErrors.confirm_password = "Confirm Password is required";
        if (formData.password && formData.confirm_password && formData.password !== formData.confirm_password) {
            newErrors.confirm_password = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setLoading(true);
            const payload = new FormData();
            payload.append("name", formData.name.trim());
            payload.append("email", formData.email.trim());
            payload.append("password", formData.password);
            payload.append("confirm_password", formData.confirm_password);

            await adminUserRegister(payload);
            showSuccess("Registered successfully!");
            navigate("/login");
        } catch (error) {
            navigate("/register");
            showError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f1f1f1] flex flex-col items-center px-2">
            <img src={logo} alt="" className="w-56 sm:w-64 py-4" />
            <div className="flex flex-col items-center w-full max-w-md">
                <div className="bg-gray-200 py-5 px-6 rounded-lg shadow-lg my-4 w-full">
                    <h1 className="text-xl font-semibold my-4 text-center mb-5">Create Your Admin Account</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 relative">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={`w-full bg-[#f1f1f1] pl-10 pr-3 py-2 rounded-md focus:outline-amber-600 ${errors.name ? 'border border-red-500' : ''}`}
                            />
                            <BiUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
                        <div className="mb-3 relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={`w-full bg-[#f1f1f1] pl-10 pr-3 py-2 rounded-md focus:outline-amber-600 ${errors.email ? 'border border-red-500' : ''}`}
                            />
                            <MdEmail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
                        <div className="mb-3 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className={`w-full bg-[#f1f1f1] pl-10 pr-10 py-2 rounded-md focus:outline-amber-600 ${errors.password ? 'border border-red-500' : ''}`}
                            />
                            <RiLockPasswordFill className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                            <div
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <PiEyeClosedBold /> : <PiEyeBold />}
                            </div>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
                        <div className="mb-3 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className={`w-full bg-[#f1f1f1] pl-10 pr-10 py-2 rounded-md focus:outline-amber-600 ${errors.confirm_password ? 'border border-red-500' : ''}`}
                            />
                            <IoShieldCheckmark className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                            <div
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <PiEyeClosedBold /> : <PiEyeBold />}
                            </div>
                        </div>
                        {errors.confirm_password && <p className="text-red-500 text-sm mb-2">{errors.confirm_password}</p>}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="!w-full !bg-[#F66C2B] hover:!bg-[#E55B1C] !mt-5 !text-white !capitalize disabled:!bg-gray-400"
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </form>

                    <div className="mt-4 mb-4 p-4 rounded-md flex gap-2 items-center justify-center cursor-pointer">
                        <p className="font-semibold text-sm">
                            Already have account?{" "}
                            <Link to="/login">
                                <span className="cursor-pointer hover:!text-amber-600">Login</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
