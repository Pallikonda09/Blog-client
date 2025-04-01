

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../../redux/slices/authSlice';
// import blog from '../Images/blog.png';
// import './Nav.css';

// function Nav() {
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false); // State for scroll effect
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isAuthenticated, user, author } = useSelector((state) => state.auth);

//   const handleLogoClick = () => {
//     if (isAuthenticated) {
//       if (author?.username) {
//         // If an author is logged in, redirect to the author dashboard
//         navigate('/author-dashboard');
//       } else if (user?.username) {
//         // If a regular user is logged in, redirect to the user dashboard
//         navigate('/user-dashboard');
//       }
//     } else {
//       // If not authenticated, redirect to the home page
//       navigate('/');
//     }
//   };
  

//   // Handle resizing of the window
//   useEffect(() => {
//     const handleResize = () => setIsSmallScreen(window.innerWidth <= 770);
//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initialize on mount

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Handle scroll event to add or remove scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true); // Add scroll effect if scrolled more than 50px
//       } else {
//         setIsScrolled(false); // Remove scroll effect
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleNav = () => {
//     setIsNavOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   const avatarLetter = (author?.username || user?.username || 'Guest')[0].toUpperCase();
// const displayName = author?.username || user?.username || 'Guest';  // Get the full name

// // Determine the role or identity of the logged-in user
// const loggedInAs = author?.username ? 'Author' : 'User';  // Determine if it's author or user

//   return (
//     <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
//       {/* Logo Section */}
//       <div className="logo">
//         <span onClick={handleLogoClick}  className="logo-link">
//           <img src={blog} alt="blog" className="logo-img" />
//           <span className="logo-text">BlogSphere</span>
//         </span>
//       </div>
      

//       {/* Center Section: Search bar or filler space */}
//       {isAuthenticated && !isSmallScreen && (
//         <div className="search-container">
//           <input
//             type="text"
//             className="search-input"
//             placeholder="Search posts..."
//             aria-label="Search"
//           />
//         </div>
//       )}

//       {/* Right Section */}
//       {!isAuthenticated ? (
//         <div className="auth-buttons">
//           <Link to="/register" className="nav-bt">
//             Signup
//           </Link>
//           <Link to="/login" className="nav-btn">
//             Signin
//           </Link>
//         </div>
//       ) : (
//         <>
//           <div className="user-avatar" onClick={toggleNav} role="button" tabIndex={0}>
//             {avatarLetter}
//           </div>
//           {isNavOpen && (
//             <nav className="nav-links-container">
//               <ul className="nav-links">
//                 <li className="nav-item">
//                 {displayName} <sup>({loggedInAs})</sup>
//                 </li>
//                 <li className="nav-item">
//             <Link to="/profile" className="nav-link" onClick={toggleNav}>
//               My Profile
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/settings" className="nav-link" onClick={toggleNav}>
//               Settings
//             </Link>
//           </li>


//                 <li className="nav-item">
//                   <button onClick={handleLogout} className="logout-btn">
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default Nav;



// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../../redux/slices/authSlice';
// import blog from '../../Images/blog.png'
// import './Nav.css';

// function Nav() {
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false); // State for scroll effect
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isAuthenticated, user, author } = useSelector((state) => state.auth);

//   const handleLogoClick = () => {
//     if (isAuthenticated) {
//       if (author?.username) {
//         // If an author is logged in, redirect to the author dashboard
//         navigate('/author-dashboard');
//       } else if (user?.username) {
//         // If a regular user is logged in, redirect to the user dashboard
//         navigate('/user-dashboard');
//       }
//     } else {
//       // If not authenticated, redirect to the home page
//       navigate('/');
//     }
//   };

//   // Handle resizing of the window
//   useEffect(() => {
//     const handleResize = () => setIsSmallScreen(window.innerWidth <= 770);
//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initialize on mount

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Handle scroll event to add or remove scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true); // Add scroll effect if scrolled more than 50px
//       } else {
//         setIsScrolled(false); // Remove scroll effect
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleNav = () => {
//     setIsNavOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   const avatarLetter = (author?.username || user?.username || 'Guest')[0].toUpperCase();
//   const displayName = author?.username || user?.username || 'Guest';  // Get the full name

//   // Determine the role or identity of the logged-in user
//   const loggedInAs = author?.username ? 'Author' : 'User';  // Determine if it's author or user

//   return (
//     <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
//       {/* Logo Section */}
//       <div className="logo">
//         <span onClick={handleLogoClick} className="logo-link">
//           <img src={blog} alt="blog" className="logo-img" />
//           <Link className="logo-text">BlogSphere</Link>
//         </span>
//       </div>

//       {/* Center Section: Search bar or filler space */}
//       {isAuthenticated && !isSmallScreen && (
//         <div className="search-container">
//           <input
//             type="text"
//             className="search-input"
//             placeholder="Search posts..."
//             aria-label="Search"
//           />
//         </div>
//       )}

//       {/* Right Section */}
//       {!isAuthenticated ? (
//         <div className="auth-buttons">
//           <Link to="/register" className="nav-bt">Signup</Link>
//           <Link to="/login" className="nav-btn">Signin</Link>
//         </div>
//       ) : (
//         <>
//           <div className="user-avatar" onClick={toggleNav} role="button" tabIndex={0}>
//             {avatarLetter}
//           </div>
//           {isNavOpen && (
//             <nav className="nav-links-container">
//               <ul className="nav-links">
//               <li
//   className="nav-item" onClick={() => {
//     if (author?.username) {
//       navigate('/author-dashboard'); 
//     } else if (user?.username) {
//       navigate('/user-dashboard'); 
//     }}}>
//   <span className="nav-link" style={{ cursor: 'pointer' }}>
//     {displayName} <sup>({loggedInAs})</sup>
//   </span>
// </li>
//                    <li className="nav-item">
//                   <Link to="/Profile" className="nav-link" onClick={toggleNav}>
//                     My Profile
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/settings" className="nav-link" onClick={toggleNav}>
//                     Settings
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <button onClick={handleLogout} className="logout-btn">
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default Nav;



// import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../../redux/slices/authSlice';
// import blog from '../../Images/blog.png'
// import './Nav.css';

// function Nav() {
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false); // State for scroll effect
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const navRef = useRef(null); // Reference to the nav dropdown

//   const { isAuthenticated, user, author } = useSelector((state) => state.auth);

//   const handleLogoClick = () => {
//     if (isAuthenticated) {
//       if (author?.username) {
//         // If an author is logged in, redirect to the author dashboard
//         navigate('/author-dashboard');
//       } else if (user?.username) {
//         // If a regular user is logged in, redirect to the user dashboard
//         navigate('/user-dashboard');
//       }
//     } else {
//       // If not authenticated, redirect to the home page
//       navigate('/');
//     }
//   };

//   // Handle resizing of the window
//   useEffect(() => {
//     const handleResize = () => setIsSmallScreen(window.innerWidth <= 770);
//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initialize on mount

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Handle scroll event to add or remove scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true); // Add scroll effect if scrolled more than 50px
//       } else {
//         setIsScrolled(false); // Remove scroll effect
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Handle clicks outside of the nav dropdown to close it
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navRef.current && !navRef.current.contains(event.target) && isNavOpen) {
//         setIsNavOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isNavOpen]);

//   const toggleNav = () => {
//     setIsNavOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   const avatarLetter = (author?.username || user?.username || 'Guest')[0].toUpperCase();
//   const displayName = author?.username || user?.username || 'Guest';  // Get the full name

//   // Determine the role or identity of the logged-in user
//   const loggedInAs = author?.username ? 'Author' : 'User';  // Determine if it's author or user

//   return (
//     <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
//       {/* Logo Section */}
//       <div className="logo">
//         <span onClick={handleLogoClick} className="logo-link">
//           <img src={blog} alt="blog" className="logo-img" />
//           <Link className="logo-text">BlogSphere</Link>
//         </span>
//       </div>

//       {/* Center Section: Search bar or filler space */}
//       {isAuthenticated && !isSmallScreen && (
//         <div className="search-container">
//           <input
//             type="text"
//             className="search-input"
//             placeholder="Search posts..."
//             aria-label="Search"
//           />
//         </div>
//       )}

//       {/* Right Section */}
//       {!isAuthenticated ? (
//         <div className="auth-buttons">
//           <Link to="/register" className="nav-bt">Signup</Link>
//           <Link to="/login" className="nav-btn">Signin</Link>
//         </div>
//       ) : (
//         <div ref={navRef} className="avatar-container">
//           <div className="user-avatar" onClick={toggleNav} role="button" tabIndex={0}>
//             {avatarLetter}
//           </div>
//           {isNavOpen && (
//             <nav className="nav-links-container">
//               <ul className="nav-links">
//                 <li
//                   className="nav-item" onClick={() => {
//                     if (author?.username) {
//                       navigate('/author-dashboard'); 
//                     } else if (user?.username) {
//                       navigate('/user-dashboard'); 
//                     }
//                     setIsNavOpen(false); // Close menu after navigation
//                   }}>
//                   <span className="nav-link" style={{ cursor: 'pointer' }}>
//                     {displayName} <sup>({loggedInAs})</sup>
//                   </span>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/author-profile" className="nav-link" onClick={() => setIsNavOpen(false)}>
//                     My Profile
//                   </Link>
//                 </li>
              
//                 <li className="nav-item">
//                   <button onClick={() => {
//                     handleLogout();
//                     setIsNavOpen(false);
//                   }} className="logout-btn">
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Nav;




import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import blog from '../../Images/blog.png';
import './Nav.css';

function Nav() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State for scroll effect
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navRef = useRef(null); // Reference to the nav dropdown

  const { isAuthenticated, user, author } = useSelector((state) => state.auth);

  const handleLogoClick = () => {
    if (isAuthenticated) {
      if (author?.username) {
        // If an author is logged in, redirect to the author dashboard
        navigate('/author-dashboard');
      } else if (user?.username) {
        // If a regular user is logged in, redirect to the user dashboard
        navigate('/user-dashboard');
      }
    } else {
      // If not authenticated, redirect to the home page
      navigate('/');
    }
  };

  // Handle resizing of the window
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 770);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll event to add or remove scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Add scroll effect if scrolled more than 50px
      } else {
        setIsScrolled(false); // Remove scroll effect
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside of the nav dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isNavOpen) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavOpen]);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const avatarLetter = (author?.username || user?.username || 'Guest')[0].toUpperCase();
  const displayName = author?.username || user?.username || 'Guest';  // Get the full name

  // Determine the role or identity of the logged-in user
  const loggedInAs = author?.username ? 'Author' : 'User';  // Determine if it's author or user

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Logo Section */}
      <div className="logo">
        <span onClick={handleLogoClick} className="logo-link">
          <img src={blog} alt="blog" className="logo-img" />
          <Link className="logo-text">BlogSphere</Link>
        </span>
      </div>

      {/* Center Section: Search bar or filler space */}
      {isAuthenticated && !isSmallScreen && (
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search posts..."
            aria-label="Search"
          />
        </div>
      )}

      {/* Right Section */}
      {!isAuthenticated ? (
        <div className="auth-buttons">
          <Link to="/register" className="nav-bt">Signup</Link>
          <Link to="/login" className="nav-btn">Signin</Link>
        </div>
      ) : (
        <div ref={navRef} className="avatar-container">
          {/* Render avatar only when authenticated */}
          {isAuthenticated && (
            <div className="user-avatar" onClick={toggleNav} role="button" tabIndex={0}>
              {avatarLetter}
            </div>
          )}

          {/* Dropdown menu for authenticated user */}
          {isNavOpen && (
            <nav className="nav-links-container">
              <ul className="nav-links">
                <li
                  className="nav-item" onClick={() => {
                    if (author?.username) {
                      navigate('/author-dashboard'); 
                    } else if (user?.username) {
                      navigate('/user-dashboard'); 
                    }
                    setIsNavOpen(false); // Close menu after navigation
                  }} >
                  <span className="nav-link" style={{ cursor: 'pointer' }}>
                    {displayName} <sup>({loggedInAs})</sup>
                  </span>
                </li>
                <li className="nav-item">
                  <Link to="/author-profile" className="nav-link" onClick={() => setIsNavOpen(false)}>
                    My Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={() => {
                    handleLogout();
                    setIsNavOpen(false);
                  }} className="logout-btn">
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}

export default Nav;
