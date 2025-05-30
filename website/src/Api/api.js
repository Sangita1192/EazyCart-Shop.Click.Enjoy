import axios from './axiosInstance';

export const userRegister = (formData) => axios.post(`user/register`, formData);

