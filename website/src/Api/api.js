import axios from './axiosInstance';

export const userRegister = (formData) => axios.post(`user/register`, formData);

export const getUser = () => axios.get(`user/me`);
export const logoutUser = () => axios.post(`user/logout`);
export const verfiyUser = ({ otp, email }) => axios.post(`user/verify-email`, { otp, email });
export const resendOtpApi = ({ email }) => axios.post(`user/resend-otp`, { email });
export const userLogin = (email, password) => axios.post(`user/login`, { email, password });
export const forgotPassword = (email) => axios.post(`user/forgot-password`, { email });
export const resetPassword = (token, password, confirm_password) => axios.post(`user/reset-password`, { token, password, confirm_password });

//update user profile
export const updateUserProfile = (formData, id) => axios.put(`user/update/${id}`, formData);
//add new address
export const addAddress = (formData) => axios.post(`address`,formData);
export const getAllAddress = ()=> axios.get('address');
//delete particular address
export const deleteAddress = (addressId) => axios.delete(`address/${addressId}`)
//update address
export const updateAddrss = (addressId, payload) => axios.patch(`address/${addressId}`, payload);


// Cart APIs
export const getCart = async()=> axios.get(`/cart`);
//add product to cart
export const addCartItem = async(product)=> axios.post(`/cart`, {product});
//remove product 
export const removeCartItem = async(itemId)=>axios.delete(`/cart/${itemId}`);
// update cart
export const updateCartItem = async()=>axios.put(`/cart`); 
