

import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  
import RootLayout from "./Rootlayout";
import Hom from "./components/hom/Hom";
import Register from "./register/Register";
import Login from "./components/login/Login";
import AuthorDashboard from "./components/author-dashboard/AuthorDashboard";
import UserDashboard from "./components/user-dashboard/UserDashboard";
import AddArticle from "./components/write-aritcle/AddArticle";
import ArticlesByAuthor from "./components/author-article/ArticlesByAuthor";
import ArticleDetail from "./components/article-details/ArticleDetail";
import EditArticle from "./components/edit-articles/EditArticle";
import AuthorProfile from "./components/author-profile/AuthorProfile";


function App() {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/home" replace />, 
        },
        {
          path: "home",
          element: <Hom />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "user-dashboard",
          element: <UserDashboard />,
         
        },
        { path: "article-detail", element: <ArticleDetail /> },
        {
          path: "author-dashboard",
          element: <AuthorDashboard />,
          children: [
            {
              path: "view-articles",
              element: <ArticlesByAuthor />,
            },
            {
              path: "create-article",
              element: <AddArticle />,
            },
          ],
        },
        {
          path: "article/:articleId", 
          element: <ArticleDetail />,
        },
        {
          path: "author-dashboard/article/:articleId", 
          element: <ArticleDetail />,
        },
        
                 
        { path: "edit-article",
         element: <EditArticle /> 
        },

        {
          path: "author-profile",
          element: <AuthorProfile/>,
        },

      ],
    },
  ]);

  return(
    <>
      <RouterProvider router={router} />
      <ToastContainer autoClose={2500} /> 
    </>
  );

}

export default App; 