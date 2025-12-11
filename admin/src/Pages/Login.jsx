import { Button } from "@mui/material";
import { useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "/Images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { showError, showSuccess, showWarning } from "../services/toastService";
import { adminLogin } from "../api/adminUser";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const nav = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    useEffect(() => {
        if (isLoggedIn) {
            nav("/", { replace: true });
        }
    }, [isLoggedIn, nav])

    const handleAdminLogin = async () => {
        if (!formData.email || !formData.password) {
            showWarning("Email or password is required");
            return;
        }
        setLoading(true);
        try {
            const res = await adminLogin(formData.email, formData.password);

            showSuccess("Login successful!");
            setIsLoggedIn(true);
            nav("/");
            console.log("Logged in user:", res.data.user);
        } catch (error) {
            showError(error.response?.data?.message || error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#f1f1f1] flex flex-col items-center px-2">
            <img src={logo} alt="eazyCartLogo" className="w-56 sm:w-64 py-4" />
            <div className="w-full max-w-md bg-gray-200 py-5 px-6 rounded-lg shadow-lg my-2">
                <h1 className="text-2xl font-bold text-center py-[15px]">Welcome Back!</h1>
                <div className="my-[25px]">
                    <div className="mb-3 flex flex-col gap-[5px] relative">
                        <label htmlFor="email" hidden>Email</label>
                        <input
                            className="w-full bg-[#f1f1f1] pl-10 pr-3 py-2 rounded-md focus:outline-blue-600"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    email: e.target.value
                                }))
                            }
                        />
                        <MdEmail className="absolute top-1/2 left-[10px] transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <div className="mb-1 flex flex-col gap-[5px]">
                        <label htmlFor="password" hidden>Password</label>
                        <div className="w-full relative">
                            <RiLockPasswordFill className="absolute top-1/2 left-[10px] transform -translate-y-1/2 text-gray-500" />
                            <input
                                type={`${showPassword ? "text" : "password"}`}
                                className="w-full bg-[#f1f1f1] px-[10px] ps-[35px] py-[10px] rounded-md focus:outline-blue-600"
                                placeholder="Enter your password"
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        password: e.target.value
                                    }))
                                }

                            />
                            <div
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <PiEyeClosedBold /> : <PiEyeBold />}
                            </div>
                        </div>

                    </div>
                    <p className="underline cursor-pointer text-black/80 font-[14px] mb-3 hover:text-black mt-2">forgot password</p>
                    <Button className="!w-full !bg-blue-600 !mt-[20px] !text-white hover:!bg-blue-700 !capitalize" onClick={handleAdminLogin}>
                        {loading ? "Logging In..." : "Login"}
                    </Button>
                </div>

                <div className="mt-[10px] mb-[20px] p-[15px] rounded-md flex gap-[10px] items-center justify-center cursor-pointer">
                    <p className="font-semibold font-[20px]">Don't have account ?
                        <Link to="/register" className="cursor-pointer hover:!text-amber-700"> Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;