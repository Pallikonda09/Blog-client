
// import { createSlice } from '@reduxjs/toolkit';
// import { loginUser, loginAuthor } from '../thunks/authThunk';

// // Safe JSON parse function that returns null if parsing fails
// const safeJsonParse = (item) => {
//   if (!item) return null;
//   try {
//     return JSON.parse(item);
//   } catch (e) {
//     console.error("Failed to parse JSON from localStorage:", e);
//     return null;
//   }
// };

// const initialState = {
//   user: safeJsonParse(localStorage.getItem('user')),
//   author: safeJsonParse(localStorage.getItem('author')),
//   token: localStorage.getItem('token') || null,
//   userType: localStorage.getItem('userType') || null,
//   isAuthenticated: !!localStorage.getItem('token'),
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.author = null;
//       state.token = null;
//       state.userType = null;
//       state.isAuthenticated = false;
//       state.error = null;
//       localStorage.clear();  // Clear localStorage on logout
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle user login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.userType = 'user';
//         localStorage.setItem('user', JSON.stringify(action.payload.user));
//         localStorage.setItem('token', action.payload.token);
//         localStorage.setItem('userType', 'user');
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Handle author login
//       .addCase(loginAuthor.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginAuthor.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.author = action.payload.author;
//         state.token = action.payload.token;
//         state.userType = 'author';
//         localStorage.setItem('author', JSON.stringify(action.payload.author));
//         localStorage.setItem('token', action.payload.token);
//         localStorage.setItem('userType', 'author');
//       })
//       .addCase(loginAuthor.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';
import { loginUser, loginAuthor } from '../thunks/authThunk';

// Safe JSON parse function that returns null if parsing fails
const safeJsonParse = (item) => {
  if (!item) return null;
  try {
    return JSON.parse(item);
  } catch (e) {
    console.error("Failed to parse JSON from localStorage:", e);
    return null;
  }
};

const initialState = {
  user: safeJsonParse(localStorage.getItem('user')),
  author: safeJsonParse(localStorage.getItem('author')),
  token: localStorage.getItem('token') || null,
  userType: localStorage.getItem('userType') || null,
  isAuthenticated: !!localStorage.getItem('token'),  // Check if token exists to determine authentication
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.author = null;
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.clear();  // Clear localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle user login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userType = 'user';
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userType', 'user');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle author login
      .addCase(loginAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.author = action.payload.author;
        state.token = action.payload.token;
        state.userType = 'author';
        localStorage.setItem('author', JSON.stringify(action.payload.author));
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userType', 'author');
      })
      .addCase(loginAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;












// import { createSlice } from '@reduxjs/toolkit';
// import { loginUser, loginAuthor } from '../thunks/authThunk';

// // Function to safely parse JSON from localStorage
// const safeParse = (key) => {
//   try {
//     const item = localStorage.getItem(key);
//     return item ? JSON.parse(item) : null;
//   } catch (error) {
//     console.error(`Error parsing localStorage key "${key}":`, error);
//     return null;
//   }
// };

// // Initial state
// const initialState = {
//   user: safeParse('user'),  // Load user from localStorage safely
//   author: safeParse('author'),  // Load author from localStorage safely
//   token: localStorage.getItem('token') || null,  // Load token from localStorage
//   isAuthenticated: !!localStorage.getItem('token'),  // Check if token exists
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.author = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.error = null;

//       // Clear only auth-related keys, not entire localStorage
//       localStorage.removeItem('user');
//       localStorage.removeItem('author');
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle user login
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;

//         localStorage.setItem('user', JSON.stringify(action.payload.user));
//         localStorage.setItem('token', action.payload.token);
//       })
//       // Handle author login
//       .addCase(loginAuthor.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.author = action.payload.author;
//         state.token = action.payload.token;

//         localStorage.setItem('author', JSON.stringify(action.payload.author));
//         localStorage.setItem('token', action.payload.token);
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
