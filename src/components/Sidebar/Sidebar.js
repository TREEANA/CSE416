import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ sidebarStatus, toggleSidebar }) => {
  return (
    <>
      <div className={sidebarStatus ? "sidebar" : "sidebar--inactive"}>
        <div className="sidebar__login">
          <div className="sidebar-login-header">
            <div> Login </div>
            <span className="sidebar__close" onClick={toggleSidebar}>
              x
            </span>
          </div>
          <div className = "sidebar-login-subheader"> don't have an account? </div>
        </div>

        <div className="sidebar-menu">
          <div className="sidebar-menu-winelist">
            <div> </div>

            <span className="sidebar-menu-title">Wine List</span>
            {/* 여기서 페이지 구현할때 sidebar__link 하나씩 복사해서 일단 사용 */}
            <div className="sidebar__link" onClick={toggleSidebar}>
              <Link to="/login">Login</Link>
            </div>



          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
