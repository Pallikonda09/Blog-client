// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Thunk for user login
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ username, password, userType }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('https://blog-backend-5.onrender.com/user-api/login', {
//         username,
//         password,
//         userType,
//       });
//       console.log("User login response:", response.data);  // Log the response data
//       return response.data;  // Ensure the response contains 'username' and 'token'
//     } catch (error) {
//       console.error("User login error:", error.response?.data || error);
//       return rejectWithValue(error.response?.data || { message: 'An error occurred' });
//     }
//   }
// );

// // Thunk for author login
// export const loginAuthor = createAsyncThunk(
//   'auth/loginAuthor',
//   async ({ username, password, userType }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('https://blog-backend-5.onrender.com/author-api/login', {
//         username,
//         password,
//         userType,
//       });
//       console.log("Backend Response:", response.data);
//       return response.data;  // Ensure the response includes 'username' and 'token'
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: 'An error occurred' });
//     }
//   }
// );



import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use environment variable OR fallback to Render backend
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://blog-backend-5.onrender.com";

// ✅ Thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user-api/login`, {
        username,
        password
      });
      console.log("User login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("User login error:", error.response?.data || error);
      return rejectWithValue(error.response?.data || { message: 'An error occurred' });
    }
  }
);

// ✅ Thunk for author login
export const loginAuthor = createAsyncThunk(
  'auth/loginAuthor',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/author-api/login`, {
        username,
        password
      });
      console.log("Backend Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Author login error:", error.response?.data || error);
      return rejectWithValue(error.response?.data || { message: 'An error occurred' });
    }
  }
);

























































// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Thunk for user login
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ username, password, userType }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:4000/user-api/login', {
//         username,
//         password,
//         userType,
//       });
      
//       console.log("User login response:", response.data);
      
//       // Validate response data
//       if (!response.data.token) {
//         throw new Error('Token not provided by the server');
//       }
      
//       // Extract user data, handling different response structures
//       const userData = response.data.user || {
//         username: response.data.username,
//         userId: response.data.userId || response.data._id
//       };
      
//       if (!userData.username) {
//         throw new Error('User data not provided correctly by the server');
//       }
      
//       // Store authentication data in localStorage
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(userData));
      
//       return response.data;
//     } catch (error) {
//       console.error("User login error:", error.response?.data || error.message || error);
//       return rejectWithValue(error.response?.data || { message: error.message || 'An error occurred' });
//     }
//   }
// );

// // Thunk for author login
// export const loginAuthor = createAsyncThunk(
//   'auth/loginAuthor',
//   async ({ username, password, userType }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:4000/author-api/login', {
//         username,
//         password,
//         userType,
//       });
      
//       console.log("Author login response:", response.data);
      
//       // Validate response data
//       if (!response.data.token) {
//         throw new Error('Token not provided by the server');
//       }
      
//       // Extract user data, handling different response structures
//       const userData = response.data.user || {
//         username: response.data.username,
//         userId: response.data.userId || response.data._id
//       };
      
//       if (!userData.username) {
//         throw new Error('User data not provided correctly by the server');
//       }
      
//       // Store authentication data in localStorage
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(userData));
      
//       return response.data;
//     } catch (error) {
//       console.error("Author login error:", error.response?.data || error.message || error);
//       return rejectWithValue(error.response?.data || { message: error.message || 'An error occurred' });
//     }
//   }
// );