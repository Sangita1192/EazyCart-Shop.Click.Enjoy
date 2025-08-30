import axios from './axiosInstance';

export const addBanner = (formData)=> axios.post(`banners/new`, formData)
