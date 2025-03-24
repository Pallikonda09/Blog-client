import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password, userType }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/user-api/login', {
        username,
        password,
        userType,
      });
      console.log("User login response:", response.data);  // Log the response data
      return response.data;  // Ensure the response contains 'username' and 'token'
    } catch (error) {
      console.error("User login error:", error.response?.data || error);
      return rejectWithValue(error.response?.data || { message: 'An error occurred' });
    }
  }
);

// Thunk for author login
export const loginAuthor = createAsyncThunk(
  'auth/loginAuthor',
  async ({ username, password, userType }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/author-api/login', {
        username,
        password,
        userType,
      });
      console.log("Backend Response:", response.data);
      return response.data;  // Ensure the response includes 'username' and 'token'
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'An error occurred' });
    }
  }
);

