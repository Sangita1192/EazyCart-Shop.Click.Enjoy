import axios from './axiosInstance';

export const getAllUserOrders = async()=> axios.get(`orders`);