
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "./UserDashboard.css";
// Add Font Awesome import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faComment, faTrash, faPencilAlt, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as fasThumbsUp } from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCommentArticleId, setActiveCommentArticleId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // For editing comments
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  // Reference for temporary comment IDs
  const tempIdCounter = useRef(0);
  // For responsive design
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  
  const navigate = useNavigate();

  // Validate authentication and return user if valid
  const validateAuth = () => {
    try {
      const token = localStorage.getItem("token");
      const storedUserJson = localStorage.getItem("user");
      
      if (!token || !storedUserJson) {
        console.error("Missing authentication data");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/login');
        return false;
      }
      
      // Try to parse the user JSON
      try {
        const storedUser = JSON.parse(storedUserJson);
        
        if (!storedUser || !storedUser.username) {
          console.error("Invalid user data format");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate('/login');
          return false;
        }
        
        setUser(storedUser);
        return true;
      } catch (parseError) {
        console.error("Failed to parse user data:", parseError);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/login');
        return false;
      }
    } catch (error) {
      console.error("Authentication validation error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate('/login');
      return false;
    }
  };
  
  // Handle authentication errors in API responses
  const handleApiAuthError = () => {
    console.error("Authentication failed during API request");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login');
  };

  useEffect(() => {
    // Validate authentication before fetching data
    if (!validateAuth()) {
      return;
    }
    
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const response = await fetch("http://localhost:4000/user-api/articles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          // Handle different error status codes
          if (response.status === 401 || response.status === 403) {
            handleApiAuthError();
            throw new Error("Session expired. Please log in again.");
          } else {
            throw new Error("Failed to fetch articles");
          }
        }
        
        const data = await response.json();
        
        // Ensure each article has a comments array
        const articlesWithComments = data.payload.map(article => ({
          ...article,
          comments: article.comments || []
        }));
        
        setArticles(articlesWithComments);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();

    // Add event listener for window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  const handleCommentButtonClick = (articleId) => {
    // Toggle comment section - if already active for this article, close it
    if (activeCommentArticleId === articleId) {
      setActiveCommentArticleId(null);
    } else {
      setActiveCommentArticleId(articleId);
    }
    // Reset comment input when changing articles
    setNewComment("");
    // Also reset any editing state
    setEditingCommentId(null);
  };

  const submitComment = async (articleId) => {
    if (!newComment.trim()) return;
    
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem("token");
      
      try {
        const response = await fetch(`http://localhost:4000/user-api/articles/${articleId}/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment }),
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            handleApiAuthError();
            throw new Error("Session expired. Please log in again.");
          }
          throw new Error("Failed to post comment");
        }

        const result = await response.json();
        
        // Ensure the comment has a valid ID before adding it to the state
        if (!result.comment.commentId) {
          // Generate a temporary ID if backend doesn't provide one
          const tempId = tempIdCounter.current++;
          result.comment.commentId = `temp-${articleId}-${tempId}`;
          console.warn("Using temporary comment ID as backend didn't provide one");
        }
        
        // Update articles state with the new comment
        setArticles(prevArticles => 
          prevArticles.map(article => 
            article.articleId === articleId 
              ? { 
                  ...article, 
                  comments: [...article.comments, result.comment]
                } 
              : article
          )
        );
      } catch (apiError) {
        console.error("API error:", apiError);
        
        // Check if this was an auth error
        if (apiError.message.includes("Session expired")) {
          // Already handled by handleApiAuthError
          throw apiError; 
        }
        
        // Fallback: Add comment to local state only
        const tempId = tempIdCounter.current++;
        const newCommentObj = {
          commentId: `temp-${articleId}-${tempId}`,
          content: newComment,
          createdAt: new Date().toISOString(),
          userId: user.userId,
          username: user.username
        };
        
        setArticles(prevArticles => 
          prevArticles.map(article => 
            article.articleId === articleId 
              ? { 
                  ...article, 
                  comments: [...article.comments, newCommentObj]
                } 
              : article
          )
        );
        
        console.log("Added comment to local state only");
      }

      // Clear the comment input
      setNewComment("");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (articleId) => {
    try {
      const token = localStorage.getItem("token");
      
      try {
        const response = await fetch(`http://localhost:4000/user-api/articles/${articleId}/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            handleApiAuthError();
            throw new Error("Session expired. Please log in again.");
          }
          throw new Error("Failed to like article");
        }

        // Update articles with new like count
        setArticles(prevArticles => 
          prevArticles.map(article => 
            article.articleId === articleId 
              ? { ...article, likes: (article.likes || 0) + 1, isLiked: true } 
              : article
          )
        );
      } catch (apiError) {
        console.error("API error:", apiError);
        
        // Check if this was an auth error
        if (apiError.message.includes("Session expired")) {
          // Already handled by handleApiAuthError
          throw apiError; 
        }
        
        // Fallback: Update like in local state only
        setArticles(prevArticles => 
          prevArticles.map(article => 
            article.articleId === articleId 
              ? { ...article, likes: (article.likes || 0) + 1, isLiked: true } 
              : article
          )
        );
        
        console.log("Updated like in local state only");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Start editing a comment
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditedCommentContent(comment.content);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  // Save edited comment
  const handleSaveComment = async (articleId, commentId) => {
    if (!editedCommentContent.trim()) return;
    
    try {
      const token = localStorage.getItem("token");
      
      try {
        const response = await fetch(`http://localhost:4000/user-api/comments/${commentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: editedCommentContent }),
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            handleApiAuthError();
            throw new Error("Session expired. Please log in again.");
          }
          throw new Error("Failed to update comment");
        }

        // Update was successful in the backend
      } catch (apiError) {
        console.error("API error:", apiError);
        
        // Check if this was an auth error
        if (apiError.message.includes("Session expired")) {
          // Already handled by handleApiAuthError
          throw apiError;
        }
        
        // Continue with local update even if API fails
        console.log("Updating comment in local state only");
      }
      
      // Update local state
      setArticles(prevArticles => 
        prevArticles.map(article => 
          article.articleId === articleId 
            ? { 
                ...article, 
                comments: article.comments.map(comment => 
                  comment.commentId === commentId 
                    ? { ...comment, content: editedCommentContent }
                    : comment
                )
              } 
            : article
        )
      );

      // Exit edit mode
      setEditingCommentId(null);
      setEditedCommentContent("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete comment
  const handleDeleteComment = async (articleId, commentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;
    
    try {
      const token = localStorage.getItem("token");
      
      try {
        const response = await fetch(`http://localhost:4000/user-api/comments/${commentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            handleApiAuthError();
            throw new Error("Session expired. Please log in again.");
          }
          throw new Error("Failed to delete comment");
        }

        // Delete was successful in the backend
      } catch (apiError) {
        console.error("API error:", apiError);
        
        // Check if this was an auth error
        if (apiError.message.includes("Session expired")) {
          // Already handled by handleApiAuthError
          throw apiError;
        }
        
        // Continue with local deletion even if API fails
        console.log("Deleting comment from local state only");
      }
      
      // Update local state
      setArticles(prevArticles => 
        prevArticles.map(article => 
          article.articleId === articleId 
            ? { 
                ...article, 
                comments: article.comments.filter(comment => comment.commentId !== commentId)
              } 
            : article
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // Helper function to check if comment belongs to current user
  const isCommentOwner = (comment) => {
    return user && comment.userId === user.userId;
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        {user && <p className="welcome-message">Welcome, {user.username}!</p>}
      </header>

      <main className="dashboard-content">
        {loading && <div className="loading-state">Loading articles...</div>}

        {error && <div className="error-message">Error: {error}</div>}

        {!loading && !error && (
          <div className="articles-section">
            <h2>Articles</h2>

            {articles.length === 0 ? (
              <div className="no-articles">No articles found.</div>
            ) : (
              <div className="articles-list">
                {articles.map((article) => (
                  <div className="article-card" key={article.articleId}>
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-author">Author: {article.username}</p>
                    <div className="article-content lead">{article.content}</div>
                    
                    <div className={`article-interactions ${isMobile ? 'mobile-view' : ''}`}>
                      <div className="interaction-stats">
                        <span className="like-count">
                          <FontAwesomeIcon icon={fasThumbsUp} className="icon-small" /> {article.likes || 0}
                        </span>
                        <span className="comment-count">
                          <FontAwesomeIcon icon={faComment} className="icon-small" /> {article.comments?.length || 0}
                        </span>
                      </div>
                      
                      <div className={`interaction-buttons ${isMobile ? 'mobile-buttons' : ''}`}>
                        <button 
                          className={`like-button ${article.isLiked ? 'liked' : ''}`}
                          onClick={() => handleLike(article.articleId)}
                          disabled={article.isLiked}
                        >
                          <FontAwesomeIcon icon={article.isLiked ? fasThumbsUp : farThumbsUp} />
                          {!isMobile && <span>{article.isLiked ? 'Liked' : 'Like'}</span>}
                        </button>
                        
                        <button 
                          className={`comment-button ${activeCommentArticleId === article.articleId ? 'active' : ''}`}
                          onClick={() => handleCommentButtonClick(article.articleId)}
                        >
                          <FontAwesomeIcon icon={faComment} />
                          {!isMobile && <span>Comment</span>}
                        </button>
                        
                        <div className="share-dropdown">
                          <button className="share-button">
                            <FontAwesomeIcon icon={faShare} />
                            {!isMobile && <span>Share</span>}
                          </button>
                          <div className="share-options">
                            <button>Facebook</button>
                            <button>Twitter</button>
                            <button>LinkedIn</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Comments section - only visible when active for this article */}
                    {activeCommentArticleId === article.articleId && (
                      <div className={`comments-section ${isMobile ? 'mobile-comments' : ''}`}>
                        <div className="comment-form">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            disabled={submitting}
                            className={isMobile ? 'mobile-textarea' : ''}
                          />
                          <div className="comment-actions">
                            <button 
                              type="button" 
                              onClick={() => submitComment(article.articleId)}
                              disabled={submitting || !newComment.trim()}
                              className={isMobile ? 'mobile-button' : ''}
                            >
                              {submitting ? 'Posting...' : 'Post'}
                            </button>
                          </div>
                        </div>
                        
                        {/* Display comments */}
                        {article.comments?.length > 0 ? (
                          <div className="comments-list">
                            <h4>Comments</h4>
                            {article.comments.map((comment, index) => {
                              // Ensure each comment has a unique and stable key
                              const commentKey = comment.commentId || `temp-${article.articleId}-${index}-${tempIdCounter.current++}`;
                              
                              return (
                                <div className={`comment ${isMobile ? 'mobile-comment' : ''}`} key={commentKey}>
                                  <div className="comment-header">
                                    <p className="comment-author">{comment.username}</p>
                                    
                                    {/* Show edit/delete buttons if user owns this comment */}
                                    {isCommentOwner(comment) && (
                                      <div className="comment-actions-buttons">
                                        <button 
                                          className="edit-button" 
                                          onClick={() => handleEditComment(comment)}
                                          title="Edit comment"
                                        >
                                          <FontAwesomeIcon icon={faPencilAlt} />
                                        </button>
                                        <button 
                                          className="delete-button" 
                                          onClick={() => handleDeleteComment(article.articleId, comment.commentId)}
                                          title="Delete comment"
                                        >
                                          <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Show edit form or normal content */}
                                  {editingCommentId === comment.commentId ? (
                                    <div className={`edit-comment-form ${isMobile ? 'mobile-edit-form' : ''}`}>
                                      <textarea
                                        value={editedCommentContent}
                                        onChange={(e) => setEditedCommentContent(e.target.value)}
                                        className={`edit-comment-textarea ${isMobile ? 'mobile-textarea' : ''}`}
                                      />
                                      <div className="edit-comment-actions">
                                        <button 
                                          className="save-button"
                                          onClick={() => handleSaveComment(article.articleId, comment.commentId)}
                                          disabled={!editedCommentContent.trim()}
                                        >
                                          <FontAwesomeIcon icon={faCheck} /> Save
                                        </button>
                                        <button 
                                          className="cancel-button"
                                          onClick={handleCancelEdit}
                                        >
                                          <FontAwesomeIcon icon={faTimes} /> Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="comment-content">{comment.content}</p>
                                  )}
                                  
                                  <span className="comment-date">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="no-comments">No comments yet. Be the first to comment!</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;