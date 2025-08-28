
import axios from './axiosInstance';

export const addSize = async (size) => axios.post(`product-size`, size);

export const deleteSize = async(id) =>axios.delete(`product-size/${id}`);

export const getProductSizes = async()=> axios.get(`product-size`);

export const fetchAllProducts = async ({ page = 1, limit = 10, search = '', prodCategory }) => {
  return await axios.get(`products`, {
    params: { page, limit, search, prodCategory },
  });
};