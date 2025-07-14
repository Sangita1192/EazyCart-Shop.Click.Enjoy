
import axios from './axiosInstance';

export const fetchAllProducts = async ({ page = 1, limit = 10, search = '', prodCategory }) => {
  return await axios.get(`products`, {
    params: { page, limit, search, prodCategory },
  });
};