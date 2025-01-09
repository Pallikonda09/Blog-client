
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../redux/slices/authSlice'; // Adjust the path to your slice
// import blog from '../Images/blog.png';
// import './Nav.css';

// function Nav() {
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get authentication state and user/author data from Redux store
//   const { isAuthenticated, user, author } = useSelector((state) => state.auth);

//   const toggleNav = () => {
//     setIsNavOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login'); // Redirect to login page after logout
//   };

//   return (
//     <header className="navbar">
//       {/* Logo Section */}
//       <div className="logo">
//         <img src={blog} alt="blog" className="logo-img" />
//       </div>

//       {/* Hamburger Menu */}
//       <div className="hamburger" onClick={toggleNav}>
//         <div className="line"></div>
//         <div className="line"></div>
//         <div className="line"></div>
//       </div>

//       {/* Navigation Links */}
//       <nav className={`nav-links-container ${isNavOpen ? 'show' : ''}`}>
//         <ul className="nav-links">
//           {isAuthenticated ? (
//             <>
//               {/* Display Welcome Message */}
//               <li>
//                 <span>Welcome, {user?.username || author?.username || 'Guest'}</span>
                
                  

//               </li>
//               {/* Logout Button */}
//               <li>
//                 <button className="logout-btn" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               {/* Public Navigation Links */}
//               <li>
//                 <Link to="/home" onClick={() => setIsNavOpen(false)}>
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/register" onClick={() => setIsNavOpen(false)}>
//                   Register
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/login" onClick={() => setIsNavOpen(false)}>
//                   Login
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>

//       {/* Search Bar - Visible only if user is authenticated */}
//       {isAuthenticated && (
//         <div className="search">
//           <input type="text" placeholder="Search" />
//         </div>
//       )}
//     </header>
//   );
// }

// export default Nav;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice'; // Adjust the path to your slice
import blog from '../Images/blog.png';
import './Nav.css';

function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authentication state and user/author data from Redux store
  const { isAuthenticated, user, author } = useSelector((state) => state.auth);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <img src={blog} alt="blog" className="logo-img" />
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleNav}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Navigation Links */}
      <nav className={`nav-links-container ${isNavOpen ? 'show' : ''}`}>
        <ul className="nav-links">
          {isAuthenticated ? (
            <>
              {/* Display Username and User Type */}
              
<li>
  <span
    className="lead fs-4 me-3 fw-1"
    style={{
      color: '#333',
      fontSize: '1rem',
      textTransform: 'capitalize',
      fontFamily: 'Arial, sans-serif',
    }}
  >
    {author?.username || user?.username || 'Guest'}
    <sup
      style={{
        // color: 'var(--dark-green)',
        // fontSize: '1rem',
        color: '#555',
        fontSize: '0.8rem',

      }}
    >
      ({author?.userType || user?.userType || 'User'})
    </sup>
  </span>
</li>

              {/* Logout Button */}
              <li>
  <button
    className="modern-logout-btn"
    onClick={handleLogout}
  >
    <i className="fas fa-sign-out-alt"></i> Logout
  </button>
</li>


            </>
          ) : (
            <>
              {/* Public Navigation Links */}
              <li>
                <Link to="/home" onClick={() => setIsNavOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setIsNavOpen(false)}>
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={() => setIsNavOpen(false)}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Search Bar - Visible only if user is authenticated */}
      {isAuthenticated && (
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
      )}
    </header>
  );
}

export default Nav;





