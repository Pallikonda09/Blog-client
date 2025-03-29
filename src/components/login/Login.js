import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser, loginAuthor } from '../../redux/thunks/authThunk';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // 👁️ State for password toggle

  const handleLogin = async (data) => {
    try {
      let response = null;

      if (data.userType === 'user') {
        response = await dispatch(loginUser(data)).unwrap();
      } else if (data.userType === 'author') {
        response = await dispatch(loginAuthor(data)).unwrap();
      }

      if (response) {
        console.log('Login successful:', response);
        toast.success('Login successful!', { position: 'top-right' });

        navigate(data.userType === 'user' ? '/User-dashboard' : '/author-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.message || 'Invalid credentials. Please try again.', { position: 'top-right' });
    }
  };

  return (
    <div className="container-adii">
      <div className="container-fluid">
        <div className="Login-box">
          <h1 className="text-center">Please Sign in</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="role-selection">
              <label className="role-label">Select Role:</label>
              <div className="role-options">
                <label>
                  <input type="radio" value="author" {...register('userType', { required: 'Please select a user type' })} />
                  Author
                </label>
                <label>
                  <input type="radio" value="user" {...register('userType', { required: 'Please select a user type' })} />
                  User
                </label>
              </div>
              {errors.userType && <p className="error">{errors.userType.message}</p>}
            </div>

            {/* Username Input */}
            <div className="input-group">
              <input type="text" id="username" placeholder=" " {...register("username", { required: "Username is required" })} />
              <label htmlFor="username">Username</label>
              {errors.username && <p className="error">{errors.username.message}</p>}
            </div>

            {/* Password Input with Eye Icon */}
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=" "
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
              />
              <label htmlFor="password">Password</label>
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>

            <button type="submit">Login</button>
          </form>

          <p className="register-text">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;


// import React, { useState } from 'react';
// import './Login.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { loginUser, loginAuthor } from '../../redux/thunks/authThunk';
// import { toast } from 'react-toastify';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import 'react-toastify/dist/ReactToastify.css';

// function Login() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (data) => {
//     setIsLoading(true);
//     try {
//       // Clear any existing auth data
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
      
//       let response = null;

//       if (data.userType === 'user') {
//         response = await dispatch(loginUser(data)).unwrap();
//       } else if (data.userType === 'author') {
//         response = await dispatch(loginAuthor(data)).unwrap();
//       } else {
//         throw new Error('Please select a user type');
//       }

//       if (response) {
//         console.log('Login successful:', response);
        
//         // Verify localStorage has been properly set
//         const storedUser = localStorage.getItem('user');
//         const token = localStorage.getItem('token');
        
//         if (!storedUser || !token) {
//           throw new Error('Authentication data not stored properly');
//         }
        
//         // Parse user data to verify it's valid JSON
//         let userData = null;
//         try {
//           userData = JSON.parse(storedUser);
//         } catch (e) {
//           throw new Error('Invalid user data format');
//         }
        
//         toast.success('Login successful!', { 
//           position: 'top-right',
//           theme: 'colored' // Add colored theme for proper styling
//         });
        
//         // Add a longer delay to ensure everything is properly set
//         setTimeout(() => {
//           if (data.userType === 'author') {
//             navigate('/author-dashboard');
//           } else {
//             navigate('/User-dashboard');
//           }
//         }, 500); // Increased delay for better transition
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       // Clear any potentially corrupted auth data
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
      
//       let errorMessage = 'Invalid credentials. Please try again.';
      
//       if (error.message) {
//         errorMessage = error.message;
//       } else if (error.response && error.response.data && error.response.data.message) {
//         errorMessage = error.response.data.message;
//       } else if (typeof error === 'object' && error !== null) {
//         errorMessage = error.toString();
//       }
      
//       toast.error(errorMessage, { 
//         position: 'top-right',
//         theme: 'colored' // Add colored theme for proper styling
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container-adii">
//       <div className="container-fluid">
//         <div className="Login-box">
//           <h1 className="text-center">Please Sign in</h1>
//           <form onSubmit={handleSubmit(handleLogin)}>
//             <div className="role-selection">
//               <label className="role-label">Select Role:</label>
//               <div className="role-options">
//                 <label>
//                   <input 
//                     type="radio" 
//                     value="author" 
//                     id="author"
//                     {...register('userType', { required: 'Please select a user type' })} 
//                   />
//                   Author
//                 </label>
//                 <label>
//                   <input 
//                     type="radio" 
//                     value="user" 
//                     id="user"
//                     {...register('userType', { required: 'Please select a user type' })} 
//                   />
//                   User
//                 </label>
//               </div>
//               {errors.userType && <p className="error">{errors.userType.message}</p>}
//             </div>

//             {/* Username Input */}
//             <div className="input-group">
//               <input 
//                 type="text" 
//                 id="username" 
//                 placeholder=" " 
//                 {...register("username", { required: "Username is required" })} 
//               />
//               <label htmlFor="username">Username</label>
//               {errors.username && <p className="error">{errors.username.message}</p>}
//             </div>

//             {/* Password Input with Eye Icon */}
//             <div className="input-group">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 placeholder=" "
//                 {...register("password", { 
//                   required: "Password is required", 
//                   minLength: { value: 6, message: "Password must be at least 6 characters long" } 
//                 })}
//               />
//               <label htmlFor="password">Password</label>
//               <FontAwesomeIcon
//                 icon={showPassword ? faEye : faEyeSlash}
//                 className="password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//               />
//               {errors.password && <p className="error">{errors.password.message}</p>}
//             </div>

//             <button type="submit" disabled={isLoading}>
//               {isLoading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>

//           <p className="register-text">
//             Don't have an account? <Link to="/register">Register here</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;