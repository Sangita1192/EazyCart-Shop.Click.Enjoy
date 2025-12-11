import axios from './axiosInstance';

export const checkAuthLogin = () => axios.get(`check-auth`);
export const adminUserRegister = (formData) => axios.post(`register`, formData);
export const adminLogin = (email, password) => axios.post(`login`, {email, password});
export const adminLogout = () => axios.post(`logout`);