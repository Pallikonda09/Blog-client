import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password, userType }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/user-api/login', {
        username,
        password,
        userType,
      });
      return response.data; // Success response
    } catch (error) {
      return rejectWithValue(error.response.data); // Error response
    }
  }
);

 
// Thunk to handle author login
export const loginAuthor = createAsyncThunk(
  'auth/loginAuthor',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/author-api/login', {
        username,
        password,
      });
      return response.data; // Returns the successful login response
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);