
// import React, { useState } from "react";
// import "./ArticleDetail.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { format } from "date-fns";
// import axiosWithToken from "../../axiosWithToken"; // Update the path as needed

// function ArticleDetail() {
//   const { user, author } = useSelector((state) => state.auth);
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
  
//   if (!state) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger">
//           Article information not available. Please return to the article list.
//         </div>
//         <button className="btn btn-primary" onClick={() => navigate("/")}>Return to Home</button>
//       </div>
//     );
//   }

//   const formatDate = (dateString) => {
//     return dateString ? format(new Date(dateString), "MMMM dd, yyyy") : "N/A";
//   };

//   const handleSoftDelete = async () => {
//     if (isProcessing) return;
    
//     try {
//       setIsProcessing(true);
      
//       // Create a simplified object with only the necessary data
//       // to avoid potential circular reference issues
//       const articleData = {
//         articleId: state.articleId,
//         title: state.title,
//         content: state.content,
//         category: state.category,
//         status: state.status,
//         // Include other required fields but avoid sending the entire state object
//         // which might contain non-serializable properties
//       };
      
//       const response = await axiosWithToken.put(
//         `http://localhost:4000/author-api/article/${state.articleId}`,
//         articleData
//       );
      
//       if (response.data) {
//         // Show server message
//         alert(response.data.message || "Article status updated successfully");
        
//         // Get the new status from response
//         const newStatus = response.data.payload;
        
//         // Navigate back to articles list with refresh flag
//         navigate("/author-dashboard/view-articles", { 
//           state: { 
//             refreshList: true,
//             updatedArticle: {
//               ...state,
//               status: newStatus
//             } 
//           } 
//         });
//       } else {
//         alert('Failed to update article status');
//       }
//     } catch (error) {
//       console.error('Soft delete error:', error);
      
//       // More detailed error handling
//       let errorMessage = 'An unexpected error occurred while updating article status';
      
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         errorMessage = error.response.data?.message || 
//                       `Server error (${error.response.status}): Please try again`;
//       } else if (error.request) {
//         // The request was made but no response was received
//         errorMessage = 'No response from server. Please check your connection.';
//       }
      
//       alert(errorMessage);
//     } finally {
//       setIsProcessing(false);
//       setShowDeleteModal(false);
//     }
//   };

//   const handlePermanentDelete = async () => {
//     try {
//       setIsProcessing(true);
//       const response = await axiosWithToken.delete(`http://localhost:4000/author-api/article/${state.articleId}`);
//       alert(response.data.message || "Article permanently deleted");
//       navigate("/author-dashboard/view-articles", { state: { refreshList: true } });
//     } catch (error) {
//       alert("Failed to permanently delete the article. Please try again.");
//     } finally {
//       setIsProcessing(false);
//       setShowDeleteModal(false);
//     }
//   };

//   const handleEdit = () => {
//     navigate("/edit-article", { state });
//   };

//   const openDeleteModal = () => {
//     setShowDeleteModal(true);
//   };

//   const closeDeleteModal = () => {
//     setShowDeleteModal(false);
//   };

//   // Delete Modal Component
//   const DeleteModal = () => {
//     return (
//       <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Delete Article</h5>
//               <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
//             </div>
//             <div className="modal-body">
//               <p>How would you like to delete this article?</p>
//               <div className="d-flex flex-column gap-3 mt-3">
//                 <button 
//                   className="btn btn-warning" 
//                   onClick={handleSoftDelete}
//                   disabled={isProcessing}
//                 >
//                   {isProcessing ? (
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                   ) : (
//                     <i className="fa-solid fa-eye-slash me-2"></i>
//                   )}
//                   Soft Delete (Hide from public)
//                 </button>
//                 <button 
//                   className="btn btn-danger" 
//                   onClick={handlePermanentDelete}
//                   disabled={isProcessing}
//                 >
//                   {isProcessing ? (
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                   ) : (
//                     <i className="fa-solid fa-trash-can me-2"></i>
//                   )}
//                   Permanent Delete (Cannot be undone)
//                 </button>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="container mt-5">
//       {showDeleteModal && <DeleteModal />}
      
//       <div className="card shadow p-4 position-relative">
//         <div className="position-absolute top-0 end-0 p-3 d-flex gap-3">
//           {state.status !== false && (
//             <>
//               <button 
//                 className="btn btn-outline-warning rounded-circle"
//                 onClick={handleEdit}
//                 disabled={isProcessing}
//                 title="Edit Article"
//               >
//                 <i className="fa-solid fa-pen-to-square"></i>
//               </button>
//               <button 
//                 className="btn btn-outline-danger rounded-circle"
//                 onClick={openDeleteModal}
//                 disabled={isProcessing}
//                 title="Delete Article"
//               >
//                 <i className="fa-solid fa-trash"></i>
//               </button>
//             </>
//           )}
//           {state.status === false && (
//             <>
//               <button 
//                 className="btn btn-outline-success rounded-circle"
//                 onClick={handleSoftDelete}
//                 disabled={isProcessing}
//                 title="Restore Article"
//               >
//                 {isProcessing ? (
//                   <span className="spinner-border spinner-border-sm"></span>
//                 ) : (
//                   <i className="fa-solid fa-arrow-rotate-left"></i>
//                 )}
//               </button>
//               <button 
//                 className="btn btn-outline-danger rounded-circle"
//                 onClick={openDeleteModal}
//                 disabled={isProcessing}
//                 title="Delete Options"
//               >
//                 <i className="fa-solid fa-trash-can"></i>
//               </button>
//             </>
//           )}
//         </div>

//         <h1 className="text-primary">{state.title}</h1>
//         {state.status === false && (
//           <div className="mb-2">
//             <span className="badge bg-warning">Deleted</span>
//           </div>
//         )}
//         <div className="text-muted mb-3">
//           <p><strong>Created on:</strong> {formatDate(state.dateOfCreation)}</p>
//           <p><strong>Last Modified:</strong> {formatDate(state.dateOfModification)}</p>
//           <p><strong>Author:</strong> {author?.username || user?.username || "Unknown"}</p>
//           <p><strong>Category:</strong> {state.category || "Uncategorized"}</p>
//           <p className="lead mt-3" style={{ whiteSpace: "pre-line" }}>
//             {state.content}
//           </p>
//         </div>

//         {state.imageUrl && (
//           <div className="text-center my-3">
//             <img src={state.imageUrl} alt="Article" className="img-fluid rounded" style={{ maxHeight: "400px" }} />
//           </div>
//         )}

//         <div className="mt-4">
//           <button 
//             className="btn btn-secondary" 
//             onClick={() => navigate("/author-dashboard/view-articles")}
//             disabled={isProcessing}
//           >
//             <i className="fa-solid fa-arrow-left"></i> Back to Articles
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ArticleDetail;


import React, { useState, useRef } from "react";
import "./ArticleDetail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import axiosWithToken from "../../axiosWithToken"; // Update the path as needed

function ArticleDetail() {
  const { user, author } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Use a ref to track if operation should be cancelled
  const isCancelledRef = useRef(false);
  // Store the controller for cancellation
  const controllerRef = useRef(null);
  
  if (!state) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Article information not available. Please return to the article list.
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/")}>Return to Home</button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return dateString ? format(new Date(dateString), "MMMM dd, yyyy") : "N/A";
  };

  const cancelOperation = () => {
    // Immediately abort any pending request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    
    // Set the cancelled flag and reset processing state
    isCancelledRef.current = true;
    setIsProcessing(false);
    
    // Close modal and notify user
    setShowDeleteModal(false);
    alert("Operation cancelled");
  };

  const handleSoftDelete = async () => {
    // If already processing, don't start a new request
    if (isProcessing) {
      return;
    }
    
    try {
      // Set processing state and reset cancel flag
      setIsProcessing(true);
      isCancelledRef.current = false;
      
      // Create an AbortController and store in ref
      controllerRef.current = new AbortController();
      
      // Create a simplified object with only the necessary data
      const articleData = {
        articleId: state.articleId,
        title: state.title,
        content: state.content,
        category: state.category,
        status: state.status,
        // Include other required fields
      };
      
      try {
        const response = await axiosWithToken.put(
          `https://blog-backend-5.onrender.com/author-api/article/${state.articleId}`,
          articleData,
          { signal: controllerRef.current.signal }
        );
        
        // If operation was cancelled during the request, don't proceed
        if (isCancelledRef.current) {
          return;
        }
        
        if (response.data) {
          // Show server message
          alert(response.data.message || "Article status updated successfully");
          
          // Get the new status from response
          const newStatus = response.data.payload;
          
          // Navigate back to articles list with refresh flag
          navigate("/author-dashboard/view-articles", { 
            state: { 
              refreshList: true,
              updatedArticle: {
                ...state,
                status: newStatus
              } 
            } 
          });
        } else {
          // Only show failure message if not cancelled
          if (!isCancelledRef.current) {
            alert('Failed to update article status');
          }
        }
      } catch (error) {
        // Ignore AbortError as this is expected when cancelling
        if (error.name === 'AbortError' || isCancelledRef.current) {
          console.log('Request was cancelled');
          return;
        }
        throw error; // rethrow for the outer catch block
      }
    } catch (error) {
      // If operation was cancelled, don't show error message
      if (isCancelledRef.current) {
        return;
      }
      
      console.error('Soft delete error:', error);
      
      // More detailed error handling
      let errorMessage = 'An unexpected error occurred while updating article status';
      
      if (error.response) {
        errorMessage = error.response.data?.message || 
                      `Server error (${error.response.status}): Please try again`;
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      alert(errorMessage);
    } finally {
      // Only reset state if not cancelled (cancellation already resets these)
      if (!isCancelledRef.current) {
        setIsProcessing(false);
        setShowDeleteModal(false);
      }
      
      // Clear the controller ref
      controllerRef.current = null;
    }
  };

  const handlePermanentDelete = async () => {
    // If already processing, don't start a new request
    if (isProcessing) {
      return;
    }
    
    try {
      // Set processing state and reset cancel flag
      setIsProcessing(true);
      isCancelledRef.current = false;
      
      // Create an AbortController and store in ref
      controllerRef.current = new AbortController();
      
      try {
        const response = await axiosWithToken.delete(
          `https://blog-backend-5.onrender.com/author-api/article/${state.articleId}`,
          { signal: controllerRef.current.signal }
        );
        
        // If operation was cancelled during the request, don't proceed
        if (isCancelledRef.current) {
          return;
        }
        
        // Only show success alert if not cancelled
        alert(response.data.message || "Article permanently deleted");
        navigate("/author-dashboard/view-articles", { state: { refreshList: true } });
      } catch (error) {
        // Ignore AbortError as this is expected when cancelling
        if (error.name === 'AbortError' || isCancelledRef.current) {
          console.log('Request was cancelled');
          return;
        }
        throw error; // rethrow for the outer catch block
      }
    } catch (error) {
      // If operation was cancelled, don't show error message
      if (isCancelledRef.current) {
        return;
      }
      
      console.error('Permanent delete error:', error);
      alert("Failed to permanently delete the article. Please try again.");
    } finally {
      // Only reset state if not cancelled (cancellation already resets these)
      if (!isCancelledRef.current) {
        setIsProcessing(false);
        setShowDeleteModal(false);
      }
      
      // Clear the controller ref
      controllerRef.current = null;
    }
  };

  const handleEdit = () => {
    navigate("/edit-article", { state });
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    // If an operation is in progress and user clicks to close modal, cancel the operation
    if (isProcessing) {
      cancelOperation();
    } else {
      setShowDeleteModal(false);
    }
  };

  // Delete Modal Component
  const DeleteModal = () => {
    return (
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Article</h5>
              <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
            </div>
            <div className="modal-body">
              <p>How would you like to delete this article?</p>
              <div className="d-flex flex-column gap-3 mt-3">
                <button 
                  className="btn btn-warning" 
                  onClick={isProcessing ? cancelOperation : handleSoftDelete}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Cancel Operation
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-eye-slash me-2"></i>
                      Soft Delete (Hide from public)
                    </>
                  )}
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={isProcessing ? cancelOperation : handlePermanentDelete}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Cancel Operation
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-trash-can me-2"></i>
                      Permanent Delete (Cannot be undone)
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={closeDeleteModal}
              >
                {isProcessing ? "Cancel Operation" : "Close"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      {showDeleteModal && <DeleteModal />}
      
      <div className="card shadow p-4 position-relative">
        <div className="position-absolute top-0 end-0 p-3 d-flex gap-3">
          {state.status !== false && (
            <>
              <button 
                className="btn btn-outline-warning rounded-circle"
                onClick={handleEdit}
                disabled={isProcessing}
                title="Edit Article"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button 
                className="btn btn-outline-danger rounded-circle"
                onClick={openDeleteModal}
                disabled={isProcessing}
                title="Delete Article"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </>
          )}
          {state.status === false && (
            <>
              <button 
                className="btn btn-outline-success rounded-circle"
                onClick={isProcessing ? cancelOperation : handleSoftDelete}
                title={isProcessing ? "Cancel Operation" : "Restore Article"}
              >
                {isProcessing ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <i className="fa-solid fa-arrow-rotate-left"></i>
                )}
              </button>
              <button 
                className="btn btn-outline-danger rounded-circle"
                onClick={openDeleteModal}
                disabled={isProcessing}
                title="Delete Options"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </>
          )}
        </div>

        <h1 className="text-primary">{state.title}</h1>
        {state.status === false && (
          <div className="mb-2">
            <span className="badge bg-warning">Deleted</span>
          </div>
        )}
        <div className="text-muted mb-3">
          <p><strong>Created on:</strong> {formatDate(state.dateOfCreation)}</p>
          <p><strong>Last Modified:</strong> {formatDate(state.dateOfModification)}</p>
          <p><strong>Author:</strong> {author?.username || user?.username || "Unknown"}</p>
          <p><strong>Category:</strong> {state.category || "Uncategorized"}</p>
          <p className="lead mt-3" style={{ whiteSpace: "pre-line" }}>
            {state.content}
          </p>
        </div>

        {state.imageUrl && (
          <div className="text-center my-3">
            <img src={state.imageUrl} alt="Article" className="img-fluid rounded" style={{ maxHeight: "400px" }} />
          </div>
        )}

        <div className="mt-4">
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate("/author-dashboard/view-articles")}
            disabled={isProcessing}
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Articles
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;