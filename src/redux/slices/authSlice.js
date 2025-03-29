// import { createSlice } from '@reduxjs/toolkit';
// import { loginUser,loginAuthor } from '../thunks/authThunk';

// const initialState = {
//   user: null,
//   author: null, 
//   token: null,
//   isAuthenticated: false,
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
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       });

        

//             // Author login
//     builder
//     .addCase(loginAuthor.pending, (state) => {
//       state.loading = true;
//     })
//     .addCase(loginAuthor.fulfilled, (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.author = action.payload.author; // Set author state
//       state.token = action.payload.token;
//       state.error = null;
//     })
//     .addCase(loginAuthor.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload.message;
//       state.isAuthenticated = false;
//     });

  



//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { loginUser, loginAuthor } from '../thunks/authThunk';

// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.error = null;

//       // Clear token from storage
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers: (builder) => {
//     const handlePending = (state) => {
//       state.loading = true;
//       state.error = null;
//     };

//     const handleFulfilled = (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload.user || action.payload.author; // User or Author
//       state.token = action.payload.token;

//       // Save token to localStorage
//       localStorage.setItem('token', action.payload.token);
//     };

//     const handleRejected = (state, action) => {
//       state.loading = false;
//       state.error = action.payload?.message || 'An unexpected error occurred';
//     };

//     builder
//       .addCase(loginUser.pending, handlePending)
//       .addCase(loginUser.fulfilled, handleFulfilled)
//       .addCase(loginUser.rejected, handleRejected)
//       .addCase(loginAuthor.pending, handlePending)
//       .addCase(loginAuthor.fulfilled, handleFulfilled)
//       .addCase(loginAuthor.rejected, handleRejected);
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;








import { createSlice } from '@reduxjs/toolkit';
import { loginUser, loginAuthor } from '../thunks/authThunk';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,  // Load user from localStorage
  author: JSON.parse(localStorage.getItem('author')) || null,  // Load author from localStorage
  token: localStorage.getItem('token') || null,  // Load token from localStorage
  isAuthenticated: !!localStorage.getItem('token'),  // Check if token exists
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
      state.isAuthenticated = false;
      state.error = null;
      localStorage.clear();  // Clear localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle user login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      // Handle author login
      .addCase(loginAuthor.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.author = action.payload.author;
        state.token = action.payload.token;
        localStorage.setItem('author', JSON.stringify(action.payload.author));
        localStorage.setItem('token', action.payload.token);
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
