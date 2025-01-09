// import './App.css';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Rootlayout from './Rootlayout';
// import Hom from './components/hom/Hom';
// import Register from './components/register/Register';
// import Login from './components/login/Login';
// import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
// import UserDashboard from './components/user-dashboard/UserDashboard';
// import AuthorDashboard from './components/author-dashboard/AuthorDashboard.js';


// function App() {
//   // Create browser router
//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Rootlayout />,
//       children: [
//         {
//           path: '/',  // Redirect root path to home
//           element: <Navigate to="/home" />, 
//         },
//         {
//           path: 'home',
//           element: <Hom />,
//         },
//         {
//           path: 'register',
//           element: <Register />,
//         },
//         {
//           path: 'login',
//           element: <Login />,
//           children:[
//                       {
//                         path:"User-dashboard",
//                         element:<UserDashboard/> 
//                       },
                       
//                       {
//                         path:"Author-dashboard",
//                         element:<AuthorDashboard/>
//                       }

//           ]
//         },
//       ],
//     },
//   ]);

//   return (
//     <div>
//       {/* Provide browser router to the application */}
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;


import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Rootlayout from './Rootlayout';
import Hom from './components/hom/Hom';
import Register from './components/register/Register';
import Login from './components/login/Login';
import UserDashboard from './components/user-dashboard/UserDashboard';
import AuthorDashboard from './components/author-dashboard/AuthorDashboard';




function App() {
  
 


  // Create browser router
  const router = createBrowserRouter([ 


    {
      path: '/',
      element: <Rootlayout />,
      children: [
        {
          path: '/', // Redirect root path to home
          element: <Navigate to="/home" />,
        },
        {
          path: 'home',
          element: <Hom />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'user-dashboard', // Independent route for UserDashboard
          element: <UserDashboard /> 
        },
        {
          path:'author-dashboard',
          element:<AuthorDashboard/>
        }
       
      ],
    },
  ]);

  return (
    <div>
      {/* Provide browser router to the application */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

