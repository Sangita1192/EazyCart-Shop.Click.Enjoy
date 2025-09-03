import axios from './axiosInstance';

export const addBanner = (formData)=> {
    return axios.post(`banners/new`, formData);
}
export const getAllBanners = async ({ page = 1, limit = 10, search = '', bannerType }) => {
  return await axios.get(`banners`, {
    params: { page, limit, search, bannerType },
  });
};

export const getBanner = async(id) => axios.get(`banners/${id}`);

export const updateBanner = async(id, updateBanner) => axios.put(`banners/${id}`, updateBanner);