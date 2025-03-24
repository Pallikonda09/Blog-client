

import axios from 'axios';

const axiosWithToken = axios.create({
  baseURL: 'http://localhost:4000', // Add this line to point to your backend server
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add an interceptor to include the token in every request
axiosWithToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosWithToken;