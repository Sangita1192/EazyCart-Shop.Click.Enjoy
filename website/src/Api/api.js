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
export const addAddress = (formData) => axios.post(`address`, formData);
export const getAllAddress = () => axios.get('address');
//delete particular address
export const deleteAddress = (addressId) => axios.delete(`address/${addressId}`)
//update address
export const updateAddrss = (addressId, payload) => axios.patch(`address/${addressId}`, payload);


// Cart APIs
export const getCart = async () => axios.get(`/cart`);
//add product to cart
export const addCartItem = async (product) => axios.post(`/cart`, { product });
//remove product 
export const removeCartItem = async (itemId) => axios.delete(`/cart/${itemId}`);
// update cart
export const updateCartItem = async () => axios.put(`/cart`);



// Categroies API
export const getActiveMainCategories = () => axios.get(`/categories`);
export const getSubcategories1 = (id) => axios.get(`/categories/subcategory/${id}`);


// products api
export const getAllProducts = (categoryId) => {
    let url = '/products';
    if (categoryId) {
        url += `?category=${categoryId}`;
    }
    return axios.get(url);
}
export const fetchPopularProducts = (id) => axios.get(`/products/popular/${id}`);
export const fetchLatestProducts = () => axios.get(`/products/latest`);
export const fetchAllProductSizes = () => axios.get(`/products/sizes`);
export const fetchAllProductColors = () => axios.get(`/products/colors`);
export const getProduct = (id) => axios.get(`/products/${id}`);
export const getRelatedProducts = (id) => axios.get(`/products/${id}/related`);

// banner api
export const fetchHomeSlider = () => axios.get(`/banners/home`);
export const fetchBottomCard = () => axios.get(`/banners/card`);
export const fetchMiddleBanners = () => axios.get(`/banners/middle`);

//wishlist api
export const getWishlists = ()=> axios.get(`/wishlist`);
export const addProductToWishlist = (id) => axios.post(`/wishlist/${id}`);
export const deleteProductFromWishlist = (id) => axios.delete(`/wishlist/${id}`);
export const clearWishlists = () => axios.delete(`/wishlist/clear`);



// review api
export const addReview = (formData, productId) => axios.post(`/reviews/${productId}`, formData);

