import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import axios from "axios";

function EditArticle() {
  const { state } = useLocation(); // Get article data passed from ArticleDetail
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [articleEditStatus, setArticleEditStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pre-fill form with existing article data
  useEffect(() => {
    if (state) {
      setValue("title", state.title);
      setValue("content", state.content);
    }
  }, [state, setValue]);

  // Enable edit state
  const enableEditState = () => {
    setArticleEditStatus(true);
  };

  const saveModifiedArticle = async (editedArticle) => {
    let modifiedArticle = { ...state, ...editedArticle };
  
    // Update modification date
    modifiedArticle.dateOfModification = new Date();
  
    // Remove `_id` field
    delete modifiedArticle._id;
  
    try {
      setLoading(true); // Show loading state
  
      let res = await axios.put(
        "https://blog-backend-5.onrender.com/author-api/article",
        modifiedArticle,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (res.data.message === "Article modified") {
        setArticleEditStatus(false);
  
        // ✅ Show success toast notification
        toast.success("Article updated successfully!", {
          position: "top-right",
          autoClose: 3000, // Auto close after 3 sec
        });
  
        // ✅ Redirect to "View Articles" after 1.5 sec
        setTimeout(() => {
          navigate("/author-dashboard/view-articles");
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating article:", error);
  
      // ❌ Show error toast notification
      toast.error("Failed to update article. Try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // Hide loading state
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center">Edit Article</h2>

        {!articleEditStatus ? (
          <>
            <p><strong>Title:</strong> {state.title}</p>
            <p><strong>Content:</strong> {state.content}</p>
            <button className="btn btn-warning" onClick={enableEditState}>
              Edit Article
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit(saveModifiedArticle)}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" {...register("title")} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea className="form-control" rows="5" {...register("content")} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditArticle;
