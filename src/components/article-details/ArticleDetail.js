
import React, { useState } from "react";
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

  const handleSoftDelete = async () => {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      
      const articleToUpdate = { ...state, status: !state.status };
      delete articleToUpdate._id;
      
      const response = await axiosWithToken.put(
        `http://localhost:4000/author-api/article/${state.articleId}`,
        articleToUpdate
      );
      
      alert(response.data.message || `Article ${state.status ? "deleted" : "restored"} successfully`);
      navigate("/author-dashboard/view-articles", { state: { refreshList: true } });
    } catch (error) {
      alert(`Failed to ${state.status ? "delete" : "restore"} the article. Please try again.`);
    } finally {
      setIsProcessing(false);
      setShowDeleteModal(false);
    }
  };

  const handlePermanentDelete = async () => {
    try {
      setIsProcessing(true);
      const response = await axiosWithToken.delete(`http://localhost:4000/author-api/article/${state.articleId}`);
      alert(response.data.message || "Article permanently deleted");
      navigate("/author-dashboard/view-articles", { state: { refreshList: true } });
    } catch (error) {
      alert("Failed to permanently delete the article. Please try again.");
    } finally {
      setIsProcessing(false);
      setShowDeleteModal(false);
    }
  };

  const handleEdit = () => {
    navigate("/edit-article", { state });
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
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
                  onClick={handleSoftDelete}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : (
                    <i className="fa-solid fa-eye-slash me-2"></i>
                  )}
                  Soft Delete (Hide from public)
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={handlePermanentDelete}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : (
                    <i className="fa-solid fa-trash-can me-2"></i>
                  )}
                  Permanent Delete (Cannot be undone)
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
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
                onClick={handleSoftDelete}
                disabled={isProcessing}
                title="Restore Article"
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