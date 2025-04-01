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
      console.log("Login attempt with data:", data);
      let response = null;
  
      if (data.userType === "user") {
        response = await dispatch(loginUser(data)).unwrap();
      } else if (data.userType === "author") {
        response = await dispatch(loginAuthor(data)).unwrap();
      }
  
      console.log("API Response:", response);
  
      if (response?.token) {
        toast.success("Login successful!", { position: "top-right" });
  
        navigate(data.userType === "user" ? "/User-dashboard" : "/author-dashboard");
      } else {
        throw new Error(response?.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message || "Invalid credentials. Please try again.", { position: "top-right" });
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

