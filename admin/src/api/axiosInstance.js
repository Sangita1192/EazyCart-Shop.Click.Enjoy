import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/admin/', 
  withCredentials: true, // for cookies/auth
});

export default instance;