
import axios from './axiosInstance';

// Product Sizes
export const getProductSizes = async()=> axios.get(`product-size`);

export const addSize = async (size) => axios.post(`product-size`, size);

export const getProductSize = async(id) =>axios.get(`product-size/${id}`);

export const updateProductSize = async(id, newSize)=> axios.put(`product-size/${id}`, newSize);

export const deleteSize = async(id) =>axios.delete(`product-size/${id}`);


// Product Colors
export const getColors = async()=> axios.get(`colors`);

export const addColor = async (color) => axios.post(`colors/new`, color);

export const getColor = async(id) =>axios.get(`colors/${id}`);

export const updateColor = async(id, newSize)=> axios.put(`colors/${id}`, newSize);

export const deleteColor = async(id) =>axios.delete(`colors/${id}`);


// Product APIs

export const fetchAllProducts = async ({ page = 1, limit = 10, search = '', categoryId }) => {
  return await axios.get(`products`, {
    params: { page, limit, search, categoryId },
  });
};

export const addProduct = (formData) => axios.post('products', formData);
export const fetchProduct = (id) => axios.get(`products/${id}`);
export const deleteProduct = (id) =>axios.delete(`products/${id}`);
export const toggleFeaturedProduct = (id) => axios.put(`products/${id}/featured`);