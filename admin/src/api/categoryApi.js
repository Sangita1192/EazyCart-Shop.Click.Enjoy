
import axios from './axiosInstance';

export const getAllCategories = async ({ page = 1, limit = 10, search = '', categoryName }) => {
  return await axios.get(`categories`, {
    params: { page, limit, search, categoryName },
  });
};
export const getCategoryList = () => axios.get(`categories/category/list`);

export const getCategoryById = (id) => axios.get(`categories/category/${id}`);

export const addCategory = (formData) => axios.post('categories/category', formData);

export const updateCategory = (id, formData) => axios.put(`categories/category/${id}`, formData);

export const deleteCategory = (id) => axios.delete(`categories/category/${id}`);

export const toggleStatus = (id) => axios.patch(`categories/status/${id}`);

export const toggleFeaturedCategory = (id) => axios.patch(`categories/featured/${id}`);
