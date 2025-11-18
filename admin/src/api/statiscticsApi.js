import axios from './axiosInstance';

export const getAllStats = async() => axios.get(`dashboard`);