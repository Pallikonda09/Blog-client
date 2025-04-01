
import React, { useEffect, useState, useCallback } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./AuthorDashboard.css";

const AuthorDashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    viewsPerArticle: [],
    popularArticles: [],
    articleTrend: []
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [timeFilter, setTimeFilter] = useState("all");
  const { user, author, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the create article route
  const isCreatingArticle = location.pathname.includes("create-article");

  // Enhanced fetchStats with advanced metrics
  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    setError("");

    const username = author?.username || user?.username;

    if (!username) {
      setError("User not logged in.");
      setLoadingStats(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Authentication token missing.");
        setLoadingStats(false);
        return;
      }
      
      const res = await axios.get(
        `https://blog-backend-5.onrender.com/author-api/advanced-stats/${username}?timeFilter=${timeFilter}`,
        { 
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          } 
        }
      );

      console.log("Advanced stats response:", res.data);

      // Extract and organize data from response
      const { 
        totalArticles = 0, 
        viewsPerArticle = [], 
        popularArticles = [],
        articleTrend = []
      } = res.data || {};
      
      setStats({ 
        articles: parseInt(totalArticles, 10) || 0,
        viewsPerArticle,
        popularArticles,
        articleTrend
      });
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching advanced stats:", err);
      
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else if (err.response?.status === 404) {
        setError("Author profile not found.");
      } else {
        setError(`Failed to fetch stats: ${err.message || "Unknown error"}`);
      }
    } finally {
      setLoadingStats(false);
    }
  }, [author, user, timeFilter]);

  // Fetch stats on component mount and when dependencies change
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    fetchStats();
    
    const intervalId = setInterval(() => {
      fetchStats();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [fetchStats, isAuthenticated, navigate]);

  // Handle creating a new article
  const handleCreateArticle = () => {
    navigate("create-article");
    // Scroll to top when creating a new article
    window.scrollTo(0, 0);
  };

  // Refresh stats manually
  const handleRefresh = () => {
    fetchStats();
  };

  // Handle time filter change
  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
  };

  // Render different content based on route
  const renderContent = () => {
    if (isCreatingArticle) {
      return (
        <div className="create-article-container">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0"><i className="bi bi-pencil-square me-2"></i> Create New Article</h4>
            </div>
            <div className="card-body">
              <Outlet context={{ updateStats: fetchStats }} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm text-center h-100 stat-card">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-subtitle mb-2 text-muted">Total Articles</h5>
                {loadingStats ? (
                  <div className="spinner-border text-primary my-3 mx-auto" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    <p className="display-1 mb-0 mt-2">{stats.articles}</p>
                    <Link to="view-articles" className="mt-auto text-decoration-none">
                      View all <i className="bi bi-arrow-right"></i>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="col-md-8">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-light">
                <i className="bi bi-graph-up me-2"></i> Article Performance Trend
              </div>
              <div className="card-body">
                {loadingStats ? (
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : stats.articleTrend.length > 0 ? (
                  <div className="chart-container">
                    {/* Chart would be rendered here using a library like Chart.js */}
                    <div className="placeholder-chart">
                      <div className="d-flex justify-content-between mb-2">
                        {stats.articleTrend.map((point, index) => (
                          <div key={index} className="d-flex flex-column align-items-center" style={{ width: `${100 / stats.articleTrend.length}%` }}>
                            <div className="bg-primary" style={{ 
                              height: `${(point.count / Math.max(...stats.articleTrend.map(p => p.count))) * 100}px`,
                              width: '20px'
                            }}></div>
                            <small>{point.date}</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-bar-chart-line text-muted display-4"></i>
                    <p className="mt-3">No trend data available for the selected time period.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="list-group shadow-sm mb-4">
              <div className="list-group-item bg-light fw-bold">
                <i className="bi bi-speedometer2 me-2"></i> Dashboard Menu
              </div>
              <Link to="view-articles" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <span><i className="bi bi-journal-text me-2"></i> My Articles</span>
                <span className="badge bg-primary rounded-pill">{stats.articles}</span>
              </Link>
              <button onClick={handleCreateArticle} className="list-group-item list-group-item-action text-start">
                <i className="bi bi-pencil-square me-2"></i> Create Article
              </button>
              
              <Link to="/author-profile" className="list-group-item list-group-item-action">
                <i className="bi bi-person-circle me-2"></i> Profile
              </Link>
            </div>
            
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <i className="bi bi-lightbulb me-2"></i> Performance Tips
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i> Publish regularly to grow your audience</li>
                  <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i> Use relevant tags for better discoverability</li>
                  <li><i className="bi bi-check-circle text-success me-2"></i> Engage with comments to boost visibility</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light">
                <i className="bi bi-star me-2"></i> Popular Articles
              </div>
              <div className="card-body">
                {loadingStats ? (
                  <div className="d-flex justify-content-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : stats.popularArticles.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                    
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-journals text-muted display-4"></i>
                    <p className="mt-3">No popular articles found for the selected time period.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="card shadow-sm">
              <div className="card-body">
                <Outlet context={{ updateStats: fetchStats }} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="author-dashboard container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Welcome, {author?.username || user?.username}</h2>
          {lastUpdated && !isCreatingArticle && (
            <small className="text-muted">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </small>
          )}
        </div>
        <div className="d-flex">
          {!isCreatingArticle && (
            <>
              <div className="btn-group me-2">
                <button 
                  className={`btn btn-sm ${timeFilter === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleTimeFilterChange('week')}
                >
                  This Week
                </button>
                <button 
                  className={`btn btn-sm ${timeFilter === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleTimeFilterChange('month')}
                >
                  This Month
                </button>
                <button 
                  className={`btn btn-sm ${timeFilter === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleTimeFilterChange('year')}
                >
                  This Year
                </button>
                <button 
                  className={`btn btn-sm ${timeFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => handleTimeFilterChange('all')}
                >
                  All Time
                </button>
              </div>
              <button onClick={handleRefresh} className="btn btn-outline-primary" disabled={loadingStats}>
                {loadingStats ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Refresh
                  </>
                )}
              </button>
            </>
          )}
          {isCreatingArticle && (
            <button onClick={() => navigate("/author-dashboard/view-articles")} className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError("")}></button>
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default AuthorDashboard;