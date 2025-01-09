import "./Register.css";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function onSignUpFormSubmit(userCred) {
    try {
      const res = await axios.post('http://localhost:4000/user-api/user', userCred, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.data.message === "User Registration Success") {
        reset();
        navigate('/login');
      } else {
        setErr(res.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      handleError(error);
    }
  }

  async function onAuthorSignUpFormSubmit(authorCred) {
    try {
      const res = await axios.post('http://localhost:4000/author-api/user', authorCred, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.data.message === "Author Registration Success") {
        reset();
        navigate('/login');
      } else {
        setErr(res.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      handleError(error);
    }
  }

  function handleError(error) {
    if (error.response) {
      setErr(error.response.data.message || "An error occurred. Please try again.");
    } else if (error.request) {
      setErr("No response from the server. Please check your network.");
    } else {
      setErr("Unexpected error. Please try again.");
    }
  }

  async function handleSubmitForm(data) {
    setErr(''); // Reset error message
    if (!data.userType) {
      setErr('Please select a user type.');
      return;
    }

    if (data.userType === 'author') {
      await onAuthorSignUpFormSubmit(data);
    } else {
      await onSignUpFormSubmit(data);
    }
  }

  return (
    <div className='container-adii'>
      <div className="container-fluid">
        <div className="Register-box">
          <h1>Sign Up</h1>
          {err && <p className="text-danger fs-5">{err}</p>}
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            {/* Role Selection */}
            <div className="role-selection">
              <label className="role-label">Select User Type:</label>
              <div className="role-options">
                <label>
                  <input
                    type="radio"
                    id="author"
                    value="author"
                    {...register('userType', { required: 'Please select a user type' })}
                  />
                  Author
                </label>
                <label>
                  <input
                    type="radio"
                    id="user"
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

      {/* Email Input */}
      <div className="input-group">
        <input
          type="email"
          id="email"
          placeholder=" "
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
          })}
        />
        <label htmlFor="email">Email</label>
        {errors.email && <p className="error">{errors.email.message}</p>}
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


                                   
            {/* Submit Button */}
            <button type="submit">Register</button>
          </form>

          {/* Redirect to Login */}
          <p className="register-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
