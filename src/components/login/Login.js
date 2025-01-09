
import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser,loginAuthor } from '../../redux/thunks/authThunk';


function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const Navigate = useNavigate()

  const handleLogin = async (data) => {
  try {
    // Check the selected role and call the appropriate thunk
    if (data.userType === 'user') {
      const response = await dispatch(loginUser(data)).unwrap();
      console.log('User login successful:', response);
        //  ('User login successful!');
         Navigate('/User-dashboard')
    } else if (data.userType === 'author') {
      const response = await dispatch(loginAuthor(data)).unwrap();
      console.log('Author login successful:', response);
      Navigate('/author-dashboard')
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert(error.message || 'An error occurred');
  }
};

  return (
    <div className='container-adii'>
      <div className="container-fluid">
        <div className="Login-box">
          <h1 className='text-center'>Please Sign in</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="role-selection">
              <label className="role-label ">Select Role:</label>
              <div className="role-options">
                <label>
                  <input
                    type="radio"
                    value="author"
                    {...register('userType', { required: 'Please select a user type' })}
                  />
                  Author
                </label>
                <label>
                  <input
                    type="radio"
                    value="user"
                    {...register('userType', { required: 'Please select a user type' })}
                  />
                  User
                </label>
              </div>
              {errors.userType && <p className="error">{errors.userType.message}</p>}
            </div>

            <div className="input-group">
        <input
          type="text"
          id="username"
          placeholder=" "
          {...register("username", { required: "Username is required" })}
        />
        <label htmlFor="username">Username</label>
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>


      {/* Password Input */}
      <div className="input-group">
        <input
          type="password"
          id="password"
          placeholder=" "
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        <label htmlFor="password">Password</label>
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


