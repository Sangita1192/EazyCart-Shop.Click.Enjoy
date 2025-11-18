import axios from './axiosInstance';

export const getAllUserOrders = async()=> axios.get(`orders`);
export const getOrderById = async(id) =>axios.get(`orders/${id}`);