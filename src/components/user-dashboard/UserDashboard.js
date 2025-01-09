import React from "react";
import { useSelector, } from "react-redux";
import "./UserDashboard.css";



function UserDashboard() {
   


  const {  user } = useSelector((state) => state.auth);
  return (
    <div className="dashboard-layout">
      {/* NavBar */}
     

      {/* Main Content Area */}
      <main className="dashboard-content">
        <h1 >Welcome,{user?.username}</h1>
        <section>
          <br></br>
          <h2>My Posts</h2>
          <p>
            This is the user dashboard. Add your dynamic content like posts,
            statistics, or other features here.
          </p>
        </section>
      </main>

      {/* Footer */}
     
    </div>
  );
}

export default UserDashboard;
