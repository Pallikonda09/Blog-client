// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import "./ArticlesByAuthor.css";

// function ArticlesByAuthor() {
//   const [articlesList, setArticlesList] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const { isAuthenticated, user, author } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       setLoading(true);
//       setError("");

//       if (!isAuthenticated) {
//         setError("You must be logged in to view your articles.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const username = user?.username || author?.username;

//         if (!username) {
//           setError("User information is missing. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(
//           `http://localhost:4000/author-api/articles-by-author/${username}`
//         );

//         const articles = res.data.articles || [];
//         setArticlesList(articles);

//         if (articles.length === 0) {
//           setError("No articles found. Start creating some amazing content!");
//         }
//       } catch (err) {
//         console.error("Error fetching articles:", err);
//         setError("Failed to fetch articles. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, [isAuthenticated, user, author]);

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Your Articles</h2>

//       {/* Loading State */}
//       {loading && <p className="text-info">Loading articles...</p>}

//       {/* Error State */}
//       {error && !loading && <p className="text-danger">{error}</p>}

//       {/* Articles List */}
//       <div className="row row-cols-1 row-cols-md-2 g-4">
//         {!loading &&
//           !error &&
//           articlesList.map((article) => (
//             <div className="col" key={article.articleId}>
//               <div className="card h-100 shadow">
//                 <div className="card-body">
//                   <h5 className="card-title text-primary">{article.title}</h5>
//                   <p className="card-text">
//                     {article.content
//                       ? `${article.content.substring(0, 80)}...`
//                       : "No content available for this article."}
//                   </p>
//                   <small className="text-muted">
//                     Last updated:{" "}
//                     {new Date(article.dateOfModification).toLocaleDateString(
//                       "en-US",
//                       {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       }
//                     )}
//                   </small>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default ArticlesByAuthor;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./ArticlesByAuthor.css";

// function ArticlesByAuthor() {
//   const [articlesList, setArticlesList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
  
//   // Navigate function
//   const navigate = useNavigate();

//   const { isAuthenticated, user, author } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       setLoading(true);
//       setError("");

//       if (!isAuthenticated) {
//         setError("You must be logged in to view your articles.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const username = user?.username || author?.username;

//         if (!username) {
//           setError("User information is missing. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(
//           `http://localhost:4000/author-api/articles-by-author/${username}`
//         );

//         const articles = res.data.articles || [];
//         setArticlesList(articles);

//         if (articles.length === 0) {
//           setError("No articles found. Start creating some amazing content!");
//         }
//       } catch (err) {
//         console.error("Error fetching articles:", err);
//         setError("Failed to fetch articles. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, [isAuthenticated, user, author]);

//   // Navigate to the article's detailed page
//   const readArticleByArticleId = (article) => {
//     navigate(`/article/${article.articleId}`, { state: article });
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Your Articles</h2>

//       {/* Loading State */}
//       {loading && <p className="text-info">Loading articles...</p>}

//       {/* Error State */}
//       {error && !loading && <p className="text-danger">{error}</p>}

//       {/* Articles List */}
//       <div className="row row-cols-1 row-cols-md-2 g-4">
//         {!loading &&
//           !error &&
//           articlesList.map((article) => (
//             <div className="col" key={article.articleId}>
//               <div className="card h-100 shadow">
//                 <div className="card-body">
//                   <h5 className="card-title text-primary">{article.title}</h5>
//                   <p className="card-text">
//                     {article.content
//                       ? `${article.content.substring(0, 80)}...`
//                       : "No content available for this article."}
//                   </p>
//                   <small className="text-muted">
//                     Last updated:{" "}
//                     {new Date(article.dateOfModification).toLocaleDateString(
//                       "en-US",
//                       {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       }
//                     )}
//                   </small>
//                   <button
//                     className="btn btn-primary mt-3"
//                     onClick={() => readArticleByArticleId(article)}
//                   >
//                     Read More
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default ArticlesByAuthor;






import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ArticlesByAuthor.css";
import axiosWithToken from "../../axiosWithToken";

function ArticlesByAuthor() {
  const [articlesList, setArticlesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Navigate function
  const navigate = useNavigate();
  
  const { isAuthenticated, user, author } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError("");
      
      if (!isAuthenticated) {
        setError("You must be logged in to view your articles.");
        setLoading(false);
        return;
      }
      
      try {
        const username = user?.username || author?.username;
        
        if (!username) {
          setError("User information is missing. Please log in again.");
          setLoading(false);
          return;
        }
        
        const res = await axios.get(
          `https://blog-backend-5.onrender.com/author-api/articles-by-author/${username}`
        );
        
        const articles = res.data.articles || [];
        
        // Sort articles by date of modification (newest first)
        const sortedArticles = [...articles].sort((a, b) => 
          new Date(b.dateOfModification) - new Date(a.dateOfModification)
        );
        
        setArticlesList(sortedArticles);
        
        if (articles.length === 0) {
          setError("No articles found. Start creating some amazing content!");
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to fetch articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [isAuthenticated, user, author]);
  
  // Navigate to the article's detailed page
  const readArticleByArticleId = (article) => {
    navigate(`/article/${article.articleId}`, { state: article });
  };
  
  // Handle restore article
  const handleRestoreArticle = async (article) => {
    if (window.confirm("Are you sure you want to restore this article? It will be visible to the public again.")) {
      try {
        // Clone the article for the update operation
        const articleToUpdate = {
          ...article,
          status: article.status // The backend will toggle this value
        };
        
        // Remove _id if it exists to avoid MongoDB conflicts
        delete articleToUpdate._id;
        
        const response = await axiosWithToken.put(
          `https://blog-backend-5.onrender.com/author-api/article/${article.articleId}`,
          articleToUpdate
        );
        
        alert(response.data.message || "Article restored successfully");
        
        // Refresh the articles list
        window.location.reload();
      } catch (error) {
        console.error("Error restoring article:", error);
        alert(error.response?.data?.message || "Failed to restore the article");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Articles</h2>
      
      {/* Loading State */}
      {loading && <p className="text-info">Loading articles...</p>}
      
      {/* Error State */}
      {error && !loading && <p className="text-danger">{error}</p>}
      
      {/* Active Articles List */}
      <h3>Active Articles</h3>
      <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
        {!loading &&
          !error &&
          articlesList
            .filter(article => article.status !== false)
            .map((article) => (
              <div className="col" key={article.articleId}>
                <div className="card h-100 shadow">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{article.title}</h5>
                    <p className="card-text">
                      {article.content
                        ? `${article.content.substring(0, 80)}...`
                        : "No content available for this article."}
                    </p>
                    <small className="text-muted">
                      Last updated:{" "}
                      {new Date(article.dateOfModification).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </small>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => readArticleByArticleId(article)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
        {!loading && 
          !error && 
          articlesList.filter(article => article.status !== false).length === 0 && (
            <div className="col-12">
              <p className="text-muted">No active articles found.</p>
            </div>
          )
        }
      </div>
      
      {/* Deleted Articles List */}
      <h3>Deleted Articles</h3>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {!loading &&
          !error &&
          articlesList
            .filter(article => article.status === false)
            .map((article) => (
              <div className="col" key={article.articleId}>
                <div className="card h-100 shadow border-warning">
                  <div className="card-header bg-warning bg-opacity-25">
                    <span className="badge bg-warning">Deleted</span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-muted">{article.title}</h5>
                    <p className="card-text text-muted">
                      {article.content
                        ? `${article.content.substring(0, 80)}...`
                        : "No content available for this article."}
                    </p>
                    <small className="text-muted">
                      Author: {article.author || user?.username || author?.username}
                    </small>
                    <br />
                    <small className="text-muted">
                      Last updated:{" "}
                      {new Date(article.dateOfModification).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </small>
                    <div className="mt-3">
                      <button
                        className="btn btn-success"
                        onClick={() => handleRestoreArticle(article)}
                      >
                        <i className="bi bi-arrow-counterclockwise me-1"></i> Restore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        {!loading && 
          !error && 
          articlesList.filter(article => article.status === false).length === 0 && (
            <div className="col-12">
              <p className="text-muted">No deleted articles found.</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default ArticlesByAuthor;