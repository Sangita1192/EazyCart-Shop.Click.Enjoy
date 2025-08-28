
import axios from './axiosInstance';

// Product Sizes
export const getProductSizes = async()=> axios.get(`product-size`);

export const addSize = async (size) => axios.post(`product-size`, size);

export const getProductSize = async(id) =>axios.get(`product-size/${id}`);

export const updateProductSize = async(id, newSize)=> axios.put(`product-size/${id}`, newSize);

export const deleteSize = async(id) =>axios.delete(`product-size/${id}`);


// Product APIs

export const fetchAllProducts = async ({ page = 1, limit = 10, search = '', prodCategory }) => {
  return await axios.get(`products`, {
    params: { page, limit, search, prodCategory },
  });
};