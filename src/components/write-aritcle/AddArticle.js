
import "./AddArticle.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosWithToken from "../../axiosWithToken";
import axios from "axios";

function AddArticle() {
  const { register, handleSubmit, reset } = useForm();
  const { isAuthenticated, user, author } = useSelector((state) => state.auth);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileCompletionPercentage, setProfileCompletionPercentage] = useState(0);
  const [showProfileUpdateModal, setShowProfileUpdateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const username = author?.username || user?.username;
        if (!username) return;

        const profileRes = await axios.get(
          `https://blog-backend-5.onrender.com/author-api/profile/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfile(profileRes.data);
        calculateProfileCompletion(profileRes.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (isAuthenticated) {
      fetchAuthorProfile();
    }
  }, [isAuthenticated, user, author]);

  const calculateProfileCompletion = (profileData) => {
    if (!profileData) return 0;

    const requiredFields = [
      "bio", 
      "location", 
      "skills", 
      "avatar"
    ];
    
    const socialFields = [
      "website", 
      "twitter", 
      "facebook", 
      "instagram"
    ];

    // Count completed required fields
    let completedFields = 0;
    requiredFields.forEach(field => {
      if (field === "skills" && Array.isArray(profileData[field]) && profileData[field].length > 0) {
        completedFields++;
      } else if (field !== "skills" && profileData[field] && profileData[field].trim() !== "") {
        completedFields++;
      }
    });

    // Count social profiles (at least one is good)
    let hasSocialProfile = false;
    socialFields.forEach(field => {
      if (profileData[field] && profileData[field].trim() !== "") {
        hasSocialProfile = true;
      }
    });
    
    if (hasSocialProfile) completedFields++;

    // Calculate percentage (required fields + social presence)
    const totalRequiredFields = requiredFields.length + 1; // +1 for social presence
    const percentage = Math.floor((completedFields / totalRequiredFields) * 100);
    
    setProfileCompletionPercentage(percentage);
    return percentage;
  };

  if (!isAuthenticated) {
    return <p>You must be logged in to create an article.</p>;
  }

  const postNewArticle = async (article) => {
    // Check if profile is at least 60% complete
    if (profileCompletionPercentage < 60) {
      setShowProfileUpdateModal(true);
      return;
    }

    setLoading(true);
    setErr("");
    setSuccess("");

    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = user?.username || author?.username;
    article.comments = [];
    article.isDraft = false;

    try {
      const res = await axiosWithToken.post("https://blog-backend-5.onrender.com/author-api/add-article", article);
      setSuccess(res.data.message || "Article published successfully!");
      reset(); // Clear the form
    } catch (error) {
      console.error("Error creating article:", error);
      setErr(error.response?.data?.message || "An error occurred while creating the article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const redirectToProfile = () => {
    navigate("/author-profile");
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-10 col-sm-12">
          {/* Profile Completion Alert */}
          {profile && profileCompletionPercentage < 60 && (
            <div className="alert alert-warning mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1"><i className="fas fa-exclamation-triangle me-2"></i>Profile Incomplete</h5>
                  <p className="mb-0">Your author profile is only {profileCompletionPercentage}% complete. You need at least 60% completion to publish articles.</p>
                </div>
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={redirectToProfile}
                >
                  Complete Profile
                </button>
              </div>
            </div>
          )}

          {/* Profile completion progress */}
          {profile && profileCompletionPercentage >= 60 && profileCompletionPercentage < 100 && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="mb-2">Profile Completion: {profileCompletionPercentage}%</h5>
                <div className="progress">
                  <div 
                    className={`progress-bar ${profileCompletionPercentage < 60 ? 'bg-danger' : profileCompletionPercentage < 80 ? 'bg-warning' : 'bg-success'}`} 
                    role="progressbar" 
                    style={{width: `${profileCompletionPercentage}%`}} 
                    aria-valuenow={profileCompletionPercentage} 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Write an Article</h2>
            </div>
            <div className="card-body bg-light">
              {success && <p className="text-success fs-5">{success}</p>}
              {err && <p className="text-danger fs-5">{err}</p>}
              <form onSubmit={handleSubmit(postNewArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter your article title"
                    {...register("title", { required: "Title is required" })}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a Category
                  </label>
                  <select
                    id="category"
                    className="form-select"
                    {...register("category", { required: "Category is required" })}
                  >
                    <option value="" >--Select category--</option>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI & ML</option>
                    <option value="database">Database</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="News">News</option>
                    <option value="Social media">Social media</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Digital-Marketing">Digital-Marketing</option>
                    <option value="Politics">Politics</option>
                    <option value="Travelling">Travelling</option>
                    <option value="Education">Education</option>
                    <option value="game">Gaming</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    id="content"
                    className="form-control"
                    rows="8"
                    placeholder="Write your article content here..."
                    {...register("content", { required: "Content is required" })}
                  ></textarea>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary text-light"
                    disabled={loading}
                  >
                    {loading ? "Posting..." : "Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Update Modal */}
      {showProfileUpdateModal && (
        <div className="modal d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Profile Update Required</h5>
                <button type="button" className="btn-close" onClick={() => setShowProfileUpdateModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="text-center mb-3">
                  <i className="fas fa-user-edit fa-3x text-primary"></i>
                </div>
                <p>Your author profile is only <strong>{profileCompletionPercentage}% complete</strong>. To publish articles, you need at least 60% completion.</p>
                <p>Complete these profile items:</p>
                <ul>
                  {!profile?.bio && <li>Add a professional bio</li>}
                  {!profile?.location && <li>Add your location</li>}
                  {(!profile?.skills || profile.skills.length === 0) && <li>Add at least one skill</li>}
                  {!profile?.avatar && <li>Upload a profile picture</li>}
                  {!profile?.website && !profile?.twitter && !profile?.facebook && !profile?.instagram && 
                    <li>Add at least one social media profile</li>}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowProfileUpdateModal(false)}>Later</button>
                <button type="button" className="btn btn-primary" onClick={redirectToProfile}>Update Profile Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddArticle;