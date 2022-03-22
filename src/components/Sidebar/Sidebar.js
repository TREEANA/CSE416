import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ sidebarStatus, toggleSidebar }) => {
  return (
    <>
      <div className={sidebarStatus ? "sidebar" : "sidebar--inactive"}>
        <div className="sidebar__login">
          <div className="sidebar-login-header">
            <p> Login </p>
            <span className="sidebar__close" onClick={toggleSidebar}>
              x
            </span>
          </div>
          <div> don't have an account? </div>
        </div>

        <div className="sidebar-menu">
          <div className="sidebar-menu-winelist">
            <span className="sidebar-menu-title">Title</span>
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
