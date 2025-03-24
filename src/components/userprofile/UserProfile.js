import React from "react";
import "./UserProfile.css";

function UserProfile({ user }) {
  return (
    <div className="user-profile card shadow p-3 mb-4">
      <div className="card-body text-center">
        <img
          src={user?.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          className="rounded-circle mb-3"
          width={100}
          height={100}
        />
        <h4>{user?.username || "User"}</h4>
        <p className="text-muted">{user?.email || "No email available"}</p>
      </div>
    </div>
  );
}

export default UserProfile;
