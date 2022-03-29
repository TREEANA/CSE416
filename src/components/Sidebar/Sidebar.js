import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { BsXLg } from "react-icons/bs";

const Sidebar = ({ status, toggleStatus }) => {
  return (
    <>
      <div className={status.sideBar ? "sidebar" : "sidebar sidebar--inactive"}>
        <div className="sidebar__login">
          <div className="sidebar__header">
            <div
              className="sidebar__status"
              onClick={() => {
                toggleStatus("sideBar");
                toggleStatus("loginModal");
              }}
            >
              Login
            </div>
            <BsXLg
              className="sidebar__close"
              onClick={() => toggleStatus("sideBar")}
            />
          </div>

          <div className="sidebar__register">
            <Link to="/register" onClick={() => toggleStatus("registerModal")}>
              don't have an account?
            </Link>
          </div>
        </div>
        <div className="sidebar__menu">
          <div className="sidebar__section">
            <div className="sidebar__title">Title</div>
            {/* 여기서 페이지 구현할때 sidebar__link 하나씩 복사해서 일단 사용 */}
            <div
              className="sidebar__link"
              onClick={() => toggleStatus("sideBar")}
            >
              <Link to="/theme">Theme</Link>
            </div>
            <div
              className="sidebar__link"
              onClick={() => toggleStatus("sideBar")}
            >
              <Link to="/detail">Detail</Link>
            </div>
            <div
              className="sidebar__link"
              onClick={() => toggleStatus("sideBar")}
            >
              <Link to="/profile">Profile</Link>
            </div>
            <div
              className="sidebar__link"
              onClick={() => toggleStatus("sideBar")}
            >
              <Link to="/winePage">WinePage</Link>
            </div>
            <div
              className="sidebar__link"
              onClick={() => toggleStatus("sideBar")}
            >
              <Link to="/wineListPage">WineListPage</Link>
            </div>
            <div
              className="sidebar__link"
              onClick={() => toggleStatus("sideBar")}
            >
              <Link to="/Profile"> Profile</Link>
            </div>
            <div
              className="sidebar__link"
              onClick={() => {
                toggleStatus("sideBar");
                toggleStatus("ticketModal");
              }}
            >
              view tickets
            </div>
            <div
              className="sidebar__link"
              onClick={() => {
                toggleStatus("sideBar");
                toggleStatus("becomeSommlierModal");
              }}
            >
              become sommlier
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
