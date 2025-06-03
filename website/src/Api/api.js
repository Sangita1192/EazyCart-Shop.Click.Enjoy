import axios from './axiosInstance';

export const userRegister = (formData) => axios.post(`user/register`, formData);

export const getUser = () => axios.get(`user/me`);
export const logoutUser = () => axios.post(`user/logout`);

export const verfiyUser = ({otp, email}) => axios.post(`user/verify-email`, {otp,email});

export const resendOtpApi = ({email}) => axios.post(`user/resend-otp`, {email});

export const userLogin = (email, password) => axios.post(`user/login`, {email,password});
