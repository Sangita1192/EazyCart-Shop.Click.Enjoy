import axios from './axiosInstance';

export const addBanner = (formData)=> {
    return axios.post(`banners/new`, formData);
}
