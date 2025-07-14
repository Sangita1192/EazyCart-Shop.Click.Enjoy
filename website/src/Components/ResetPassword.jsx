import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { showError, showSuccess, showWarning } from '../services/toastService';
import { resetPassword } from '../Api/api';

const ResetPassword = () => {
    const [params] = useSearchParams();
    const nav = useNavigate();

    const token = params.get("token");

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCnfmPassword, setShowCnfmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (!token) {
            showError("Link invalid or expired");
            nav("/");
        }
    }, [token, nav]);


    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            return showWarning("Please fill in all fields");
        }

        if (password !== confirmPassword) {
            return showWarning("Passwords do not match");
        }
        try{
            setLoading(true);
            const res = await resetPassword(token, password, confirmPassword);
            if(res.data?.success){
                showSuccess(res.data.message || "Password reset successful");
                nav("/login");
            }else{
                console.log(res.data);
                showError(res.data.message || "Failed to reset password")
            }
        }
        catch(error){
            showError(error.message || "server error");
        }
        finally{
            setLoading(false);
        }
    }


    return (
        <>
            <div className='w-full flex justify-center items-center'>
                <div className='xl:w-[35%] lg:w-[50%] sm:w-[60%] w-[95%] border border-gray-200 my-[25px] p-[15px] py-[25px] shadow-lg rounded-lg items-center flex flex-col gap-[15px]'>
                    <h3 className='text-lg font-[600] text-gray-600'>Reset Password</h3>
                    <label htmlFor="password" className='hidden'>New Password</label>
                    <div className='w-[80%] relative'>
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
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
                    <label htmlFor="confirm_password" className='hidden'>New Password</label>
                    <div className='w-[80%] relative'>
                        <input
                            type={`${showCnfmPassword ? "text" : "password"}`}
                            id="confirm_password"
                            name="confirm_password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-amber-500 focus:border-blue-500 transition-all"
                            required
                        />
                        <div
                            onClick={() => setShowCnfmPassword(!showCnfmPassword)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        >
                            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </div>
                    </div>
                    <Button
                        onClick={handleResetPassword}
                        disabled={loading}
                        className='!text-white !bg-amber-600 !w-[80%] !p-2 !text-lg !cursor-pointer hover:!bg-amber-700'
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : 'Login'}
                    </Button>
                </div>

            </div>
        </>
    )
}

export default ResetPassword