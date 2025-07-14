import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/website/',
  withCredentials: true, // for cookies/auth
  timeout: 10000,
});

// Interceptor to handle responses globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network/server errors
    if (!error.response) {
      return Promise.reject({
        message: 'No response from server. Please check your connection.',
        status: null,
      });
    }

    const { status, data } = error.response;
    // if no backend message
    let message = data?.message;
    if (!message) {
      if (status === 404) {
        message = 'Requested resource not found.';
      } else if (status === 401) {
        message = 'Unauthorized. Please log in again.';
      } else if (status >= 500) {
        message = 'Server error. Please try again later.';
      } else {
        message = 'Something went wrong.';
      }
    }
    return Promise.reject({
      message,
      status,
      errors: data?.errors || null,
    });
  }
);

export default instance;