import { Button } from "@mui/material";
import { useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import googleIcon from "/Images/googleIcon.png"


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <div className="min-h-screen flex flex-col items-center bg-[#f1f1f1]">
                <header className="py-[15px]"> 
                    <img src="" alt="" /> 
                    <h1>SP MART</h1>
                </header>
                <div className="bg-gray-200 p-[40px] px-[50pxc] rounded-lg shadow-lg">
                    
                    <h1 className="text-2xl font-bold text-center py-[15px]">Welcome Back!</h1>
                    <p className="text-xl text-center font-bold mb-[25px]">please enter your credentials to log in</p>
                    <div>
                        <div className="mb-2 flex flex-col gap-[5px]">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="bg-[#f1f1f1] px-[5px] py-[10px] rounded-md focus:outline-blue-600" placeholder="enter your email" />
                        </div>
                        <div className="mb-2 flex flex-col gap-[5px]">
                            <label htmlFor="password">Password</label>
                            <div className="w-full relative">
                                <input type={`${showPassword ? "text": "password"}`} className="w-full bg-[#f1f1f1] px-[5px] py-[10px] rounded-md focus:outline-blue-600" placeholder="enter your password" />
                                <div
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <PiEyeClosedBold /> : <PiEyeBold />}
                                </div>
                            </div>

                        </div>
                        <p className="underline cursor-pointer">forgot password</p>
                        <Button className="!w-full !bg-blue-600 !mt-[20px] !text-white hover:!bg-blue-700 !capitalize">
                                Login
                        </Button>

                    </div>
                    <div className="border border-1 hover:border-blue-800  my-[20px] p-[15px] rounded-md flex gap-[10px] items-center justify-center cursor-pointer">
                        <img src={googleIcon} alt="GoogleIcon" className="w-[25px] h-[25px]" />
                        <span className="font-semibold font-[20px]">Sign In with Google</span>
                    </div>

                    <div className="my-[20px] p-[15px] rounded-md flex gap-[10px] items-center justify-center cursor-pointer">                      
                        <p className="font-semibold font-[20px]">Don't have account ? 
                            <span className="cursor-pointer hover:!text-blue-800"> Register</span>
                        </p>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Login;