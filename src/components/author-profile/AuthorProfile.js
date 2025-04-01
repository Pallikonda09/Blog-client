


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./AuthorProfile.css";

const AuthorProfile = () => {
  const { user, author } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    birthday: "",
    location: "",
    website: "",
    twitter: "",
    facebook: "",
    instagram: "",
    skills: []
  });
  
  const [newSkill, setNewSkill] = useState("");
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token missing.");
          setLoading(false);
          return;
        }

        const username = author?.username || user?.username;
        if (!username) {
          setError("User not found.");
          setLoading(false);
          return;
        }

        // Fetch Author Profile
        const profileRes = await axios.get(
          `https://blog-backend-5.onrender.com/author-api/profile/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfile(profileRes.data);
        setFormData({
          bio: profileRes.data.bio || "",
          birthday: profileRes.data.birthday || "",
          location: profileRes.data.location || "",
          website: profileRes.data.website || "",
          twitter: profileRes.data.twitter || "",
          facebook: profileRes.data.facebook || "",
          instagram: profileRes.data.instagram || "",
          skills: profileRes.data.skills || []
        });
      } catch (err) {
        setError("Failed to fetch profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [author, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://blog-backend-5.onrender.com/author-api/upload-avatar/${profile.username}`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );

      setProfile((prev) => ({ ...prev, avatar: response.data.avatar }));
      showSuccessMessage("Profile picture updated successfully!");
    } catch (err) {
      setError("Failed to upload avatar. Please try a different image or try again later.");
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `https://blog-backend-5.onrender.com/author-api/profile/${profile.username}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setProfile(prev => ({
        ...prev,
        ...formData
      }));
      
      setIsEditing(false);
      showSuccessMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const cancelEditing = () => {
    // Reset form data to current profile values
    if (profile) {
      setFormData({
        bio: profile.bio || "",
        birthday: profile.birthday || "",
        location: profile.location || "",
        website: profile.website || "",
        twitter: profile.twitter || "",
        facebook: profile.facebook || "",
        instagram: profile.instagram || "",
        skills: profile.skills || []
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
        </div>
        <button className="btn btn-outline-primary" onClick={() => window.location.reload()}>
          <i className="fas fa-sync-alt me-1"></i> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container author-profile mt-4 mb-5">
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="fas fa-check-circle me-2"></i>
          {successMessage}
          <button type="button" className="btn-close" onClick={() => setSuccessMessage("")}></button>
        </div>
      )}
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow profile-sidebar">
            <div className="card-body text-center">
              <div className="avatar-container mb-4">
                <div 
                  onClick={triggerFileInput} 
                  className="avatar-wrapper editable"
                >
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="rounded-circle profile-avatar"
                    />
                  ) : (
                    <div className="default-avatar">
                      <i className="fa-solid fa-user-tie fa-3x text-white"></i>
                    </div>
                  )}
                  <div className="avatar-overlay">
                    <i className="fas fa-camera"></i>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleUploadAvatar}
                />
              </div>
              
              <h4 className="profile-name">{profile.fullName}</h4>
              <p className="username">@{profile.username}</p>
              
              {!isEditing && formData.location && (
                <p className="text-muted">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  {formData.location}
                </p>
              )}
              
              {!isEditing && (
                <div className="social-links mt-3">
                  {formData.website && (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fas fa-globe"></i>
                    </a>
                  )}
                  {formData.twitter && (
                    <a href={`https://twitter.com/${formData.twitter}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {formData.facebook && (
                    <a href={`https://facebook.com/${formData.facebook}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fab fa-facebook"></i>
                    </a>
                  )}
                  {formData.instagram && (
                    <a href={`https://instagram.com/${formData.instagram}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                </div>
              )}
              
              {!isEditing && (
                <button 
                  className="btn btn-primary btn-sm mt-3" 
                  onClick={() => setIsEditing(true)}
                >
                  <i className="fas fa-edit me-1"></i> Edit Profile
                </button>
              )}
            </div>
          </div>
          
          {!isEditing && formData.skills.length > 0 && (
            <div className="card shadow mt-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="fas fa-lightbulb me-2"></i> Skills
                </h5>
              </div>
              <div className="card-body">
                <div className="skills-container">
                  {formData.skills.map((skill, index) => (
                    <span key={index} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4>
                {isEditing ? (
                  <><i className="fas fa-user-edit me-2"></i>Edit Profile</>
                ) : (
                  <><i className="fas fa-user me-2"></i>Author Information</>
                )}
              </h4>
            </div>
            <div className="card-body">
              {isEditing ? (
                // Edit mode
                <form onSubmit={(e) => { e.preventDefault(); saveProfile(); }}>
                  <div className="mb-3">
                    <label className="form-label"><strong>Bio:</strong></label>
                    <textarea
                      className="form-control"
                      name="bio"
                      rows="4"
                      placeholder="Tell readers about yourself..."
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label"><strong>Birthday:</strong></label>
                      <input
                        type="date"
                        className="form-control"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label"><strong>Location:</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        placeholder="City, Country"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label"><strong>Website:</strong></label>
                    <input
                      type="url"
                      className="form-control"
                      name="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label"><strong>Twitter:</strong></label>
                      <div className="input-group">
                        <span className="input-group-text">@</span>
                        <input
                          type="text"
                          className="form-control"
                          name="twitter"
                          placeholder="username"
                          value={formData.twitter}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label"><strong>Facebook:</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        name="facebook"
                        placeholder="username"
                        value={formData.facebook}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label"><strong>Instagram:</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        name="instagram"
                        placeholder="username"
                        value={formData.instagram}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label"><strong>Skills:</strong></label>
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                      <button 
                        type="button" 
                        className="btn btn-outline-primary"
                        onClick={addSkill}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    
                    <div className="skills-editor">
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <span>{skill}</span>
                          <button 
                            type="button"
                            className="btn-remove"
                            onClick={() => removeSkill(skill)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="d-flex gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-success" 
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-1"></i> Save Changes
                        </>
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={cancelEditing}
                      disabled={saving}
                    >
                      <i className="fas fa-times me-1"></i> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // View mode
                <>
                  <div className="profile-section">
                    <h5 className="section-title">
                      <i className="fas fa-user-circle me-2"></i> About
                    </h5>
                    <p className="profile-bio">
                      {formData.bio || "This author hasn't added a bio yet."}
                    </p>
                  </div>
                  
                  <hr className="my-4" />
                  
                  <div className="profile-section">
                    <h5 className="section-title">
                      <i className="fas fa-info-circle me-2"></i> Details
                    </h5>
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <strong><i className="fas fa-envelope me-2"></i> Email:</strong>
                          <br />
                          {profile.email}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong><i className="fas fa-birthday-cake me-2"></i> Birthday:</strong>
                          <br />
                          {formData.birthday ? new Date(formData.birthday).toLocaleDateString() : "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {(formData.website || formData.twitter || formData.facebook || formData.instagram) && (
                    <>
                      <hr className="my-4" />
                      <div className="profile-section">
                        <h5 className="section-title">
                          <i className="fas fa-globe me-2"></i> Online Presence
                        </h5>
                        <div className="row">
                          {formData.website && (
                            <div className="col-md-6 mb-2">
                              <p>
                                <strong><i className="fas fa-link me-2"></i> Website:</strong>
                                <br />
                                <a href={formData.website} target="_blank" rel="noopener noreferrer">
                                  {formData.website}
                                </a>
                              </p>
                            </div>
                          )}
                          {formData.twitter && (
                            <div className="col-md-6 mb-2">
                              <p>
                                <strong><i className="fab fa-twitter me-2"></i> Twitter:</strong>
                                <br />
                                <a href={`https://twitter.com/${formData.twitter}`} target="_blank" rel="noopener noreferrer">
                                  @{formData.twitter}
                                </a>
                              </p>
                            </div>
                          )}
                          {formData.facebook && (
                            <div className="col-md-6 mb-2">
                              <p>
                                <strong><i className="fab fa-facebook me-2"></i> Facebook:</strong>
                                <br />
                                <a href={`https://facebook.com/${formData.facebook}`} target="_blank" rel="noopener noreferrer">
                                  {formData.facebook}
                                </a>
                              </p>
                            </div>
                          )}
                          {formData.instagram && (
                            <div className="col-md-6 mb-2">
                              <p>
                                <strong><i className="fab fa-instagram me-2"></i> Instagram:</strong>
                                <br />
                                <a href={`https://instagram.com/${formData.instagram}`} target="_blank" rel="noopener noreferrer">
                                  {formData.instagram}
                                </a>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;


