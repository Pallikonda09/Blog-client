
// import "./Register.css";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// // API base URL - can be changed for different environments
// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

// function Register() {
//   const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Watch password field for validation
//   const password = watch("password");

//   async function submitRegistration(userCred, userType) {
//     const endpoint = userType === "author" ? 
//       `${API_BASE_URL}/author-api/user` : 
//       `${API_BASE_URL}/user-api/user`;
    
//     try {
//       const res = await axios.post(endpoint, userCred, {
//         headers: { "Content-Type": "application/json" },
//       });

//       const successMessage = userType === "author" ? 
//         "Author Registration Success" : 
//         "User Registration Success";

//       if (res.data.message === successMessage) {
//         // Display success toast with "success" type to ensure green color
//         toast.success(`${userType === "author" ? "Author" : "User"} registered successfully!`, { 
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           className: "toast-success-container", // Add custom class for additional styling if needed
//           bodyClassName: "toast-success-body",
//         });
        
//         // Reset form and use setTimeout to ensure the toast is visible before redirecting
//         reset();
//         setTimeout(() => {
//           navigate("/login");
//         }, 1000); // Short delay to allow toast to be seen
//       } else {
//         toast.error(res.data.message || "Registration failed. Please try again.", { position: "top-right" });
//       }
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   function handleError(error) {
//     if (error.response) {
//       toast.error(error.response.data.message || "An error occurred. Please try again.", { position: "top-right" });
//     } else if (error.request) {
//       toast.error("No response from the server. Please check your network.", { position: "top-right" });
//     } else {
//       toast.error("Unexpected error. Please try again.", { position: "top-right" });
//     }
//   }

//   async function handleSubmitForm(data) {
//     if (!data.userType) {
//       toast.error("Please select a user type.", { position: "top-right" });
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await submitRegistration(data, data.userType);
//     } catch (error) {
//       console.error("Form submission error:", error);
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="container-adii">
//       <div className="container-fluid">
//         <div className="Register-box">
//           <h1>Sign Up</h1>
//           <form onSubmit={handleSubmit(handleSubmitForm)}>
//             {/* Role Selection */}
//             <div className="role-selection">
//               <label className="role-label">Select User Type:</label>
//               <div className="role-options">
//                 <label>
//                   <input
//                     type="radio"
//                     id="author"
//                     value="author"
//                     {...register("userType", { required: "Please select a user type" })}
//                   />
//                   Author
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     id="user"
//                     value="user"
//                     {...register("userType", { required: "Please select a user type" })}
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
//                 {...register("username", { 
//                   required: "Username is required",
//                   minLength: { value: 3, message: "Username must be at least 3 characters" },
//                   maxLength: { value: 20, message: "Username must not exceed 20 characters" },
//                   pattern: { 
//                     value: /^[a-zA-Z0-9_-]+$/, 
//                     message: "Username can only contain letters, numbers, underscores and hyphens" 
//                   }
//                 })}
//               />
//               <label htmlFor="username">Username</label>
//               {errors.username && <p className="error">{errors.username.message}</p>}
//             </div>

//             {/* Email Input */}
//             <div className="input-group">
//               <input
//                 type="email"
//                 id="email"
//                 placeholder=" "
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                     message: "Invalid email format",
//                   },
//                 })}
//               />
//               <label htmlFor="email">Email</label>
//               {errors.email && <p className="error">{errors.email.message}</p>}
//             </div>

//             {/* Password Input */}
//             <div className="input-group">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 placeholder=" "
//                 {...register("password", { 
//                   required: "Password is required", 
//                   minLength: { 
//                     value: 8, 
//                     message: "Password must be at least 8 characters long" 
//                   },
//                   pattern: {
//                     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                     message: "Password must include uppercase, lowercase, number and special character"
//                   }
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

//             {/* Confirm Password Input */}
//             <div className="input-group">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 placeholder=" "
//                 {...register("confirmPassword", { 
//                   required: "Please confirm your password",
//                   validate: value => value === password || "Passwords do not match"
//                 })}
//               />
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <FontAwesomeIcon
//                 icon={showConfirmPassword ? faEye : faEyeSlash}
//                 className="password-toggle"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               />
//               {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
//             </div>

//             {/* Submit Button */}
//             <button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? "Registering..." : "Register"}
//             </button>
//           </form>

//           {/* Redirect to Login */}
//           <p className="register-text">
//             Already have an account? <Link to="/login">Login here</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;




import "./Register.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// API base URL - can be changed for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://blog-backend-5.onrender.com"

function Register() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Watch password field for validation
  const password = watch("password");

  async function submitRegistration(userCred, userType) {
    const endpoint = userType === "author" ? 
      `${API_BASE_URL}/author-api/user` : 
      `${API_BASE_URL}/user-api/user`;
    
    try {
      const res = await axios.post(endpoint, userCred, {
        headers: { "Content-Type": "application/json" },
      });

      const successMessage = userType === "author" ? 
        "Author Registration Success" : 
        "User Registration Success";

      if (res.data.message === successMessage) {
        // Display success toast with "colored" theme to ensure green color
        toast.success(`${userType === "author" ? "Author" : "User"} registered successfully!`, { 
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored", // Added theme option for correct color
        });
        
        // Reset form first
        reset();
        // Then redirect with a slight delay
        setTimeout(() => {
          navigate("/login");
        }, 1500); // Increased delay to ensure form reset completes
      } else {
        toast.error(res.data.message || "Registration failed. Please try again.", { 
          position: "top-right",
          theme: "colored" 
        });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleError(error) {
    if (error.response) {
      toast.error(error.response.data.message || "An error occurred. Please try again.", { 
        position: "top-right",
        theme: "colored" 
      });
    } else if (error.request) {
      toast.error("No response from the server. Please check your network.", { 
        position: "top-right",
        theme: "colored" 
      });
    } else {
      toast.error("Unexpected error. Please try again.", { 
        position: "top-right",
        theme: "colored" 
      });
    }
  }

  async function handleSubmitForm(data) {
    if (!data.userType) {
      toast.error("Please select a user type.", { 
        position: "top-right",
        theme: "colored" 
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitRegistration(data, data.userType);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container-adii">
      <div className="container-fluid">
        <div className="Register-box">
          <h1>Sign Up</h1>
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
                    {...register("userType", { required: "Please select a user type" })}
                  />
                  Author
                </label>
                <label>
                  <input
                    type="radio"
                    id="user"
                    value="user"
                    {...register("userType", { required: "Please select a user type" })}
                  />
                  User
                </label>
              </div>
              {errors.userType && <p className="error">{errors.userType.message}</p>}
            </div>

            {/* Username Input */}
            <div className="input-group">
              <input
                type="text"
                id="username"
                placeholder=" "
                {...register("username", { 
                  required: "Username is required",
                  minLength: { value: 3, message: "Username must be at least 3 characters" },
                  maxLength: { value: 20, message: "Username must not exceed 20 characters" },
                  pattern: { 
                    value: /^[a-zA-Z0-9_-]+$/, 
                    message: "Username can only contain letters, numbers, underscores and hyphens" 
                  }
                })}
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
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=" "
                {...register("password", { 
                  required: "Password is required", 
                  minLength: { 
                    value: 8, 
                    message: "Password must be at least 8 characters long" 
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must include uppercase, lowercase, number and special character"
                  }
                })}
              />
              <label htmlFor="password">Password</label>
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder=" "
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
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