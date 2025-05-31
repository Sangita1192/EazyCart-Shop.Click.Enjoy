import React, { useEffect, useRef, useState } from 'react'
import { MdVerifiedUser } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { verfiyUser, resendOtpApi } from '../Api/api';
import { showError, showSuccess } from '../services/toastService';
import { CircularProgress } from '@mui/material';

const VerifyUserAccount = () => {
    const { state } = useLocation();
    const email = state?.email || '';
    const inputsRef = useRef([]);
    const nav = useNavigate();

    const [otp, setOtp] = useState(Array(6).fill(''));
    const [timer, setTimer] = useState(120); // countdown in seconds
    const [loading, setLoading] = useState(false);
    const [resendOtp, setResendOtp] = useState(false);

    // Count down timer
    useEffect(() => {
        if (timer <= 0) {
            setResendOtp(true);
            return;
        }
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
            setResendOtp(false)
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        try {
            setLoading(true);
            const otpCode = otp.join('');
            const res = await verfiyUser({ email, otp: otpCode });
            showSuccess(res?.data?.message);
            nav("/login")
        } catch (err) {
            if (err.message) {
                if (err.message === "OTP Expired") {
                    setResendOtp(true);
                }
                showError(err.message)
            } else {
                showError("Verification failed");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            setLoading(true);
            const res = await resendOtpApi({ email });
            setOtp(Array(6).fill('')); // reset input
            setTimer(0); // restart timer
            showSuccess(res.message);
        } catch (err) {
            showError(err.message || "Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full flex justify-center items-center py-10">
                <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] p-6 border border-gray-200 rounded-lg shadow-md">
                    <MdVerifiedUser size={50} className='text-emerald-600 m-auto mb-3' />
                    <p className="mb-6 text-center text-gray-600">An OTP has been sent to <span className="font-semibold text-amber-600">{email}</span></p>

                    <div className="flex justify-between gap-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputsRef.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                className="w-12 h-12 border text-center text-xl rounded"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleVerify}
                        disabled={loading || resendOtp}
                        className={`w-full p-2 rounded my-2 transition-all 
        ${loading || resendOtp
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-amber-600 !text-white hover:bg-amber-700 cursor-pointer'}`}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
                    </button>
                    <div className="text-center mt-4">
                        {timer > 0 ? (
                            <p className="text-sm text-gray-500">Resend OTP in {timer}s</p>
                        ) : (
                            <button
                                onClick={handleResendOtp}
                                disabled={loading || !resendOtp}
                                className={`w-full p-2 rounded mb-2 
      ${resendOtp ? 'bg-amber-600 !text-white hover:bg-amber-700 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            >
                                Resend OTP
                            </button>

                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyUserAccount
