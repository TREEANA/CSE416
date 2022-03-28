import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { BsXLg } from "react-icons/bs";

const Sidebar = ({
  sidebarStatus,
  toggleSidebar,
  toggleLoginModal,
  toggleTicketModal,
  userstatus,
  filterpage,
  togglefilterpage,
  sortpage,
  togglesortpage,
}) => {
  return (
    <>
      <div className={sidebarStatus ? "sidebar" : "sidebar sidebar--inactive"}>
        <div className="sidebar__login">
          <div className="sidebar__header">
            <div
              className="sidebar__status"
              onClick={() => {
                toggleSidebar();
                toggleLoginModal();
                console.log("onclick");
              }}
            >
              Login
            </div>
            <BsXLg className="sidebar__close" onClick={toggleSidebar} />
          </div>

          <div className="sidebar__register">
            <Link to="/register">don't have an account?</Link>
          </div>
        </div>
        <div className="sidebar__menu">
          <div className="sidebar__section">
            <div className="sidebar__title">Title</div>
            {/* 여기서 페이지 구현할때 sidebar__link 하나씩 복사해서 일단 사용 */}
            <div className="sidebar__link" onClick={toggleSidebar}>
              <Link to="/">Main</Link>
            </div>
            <div className="sidebar__link" onClick={toggleSidebar}>
              <Link userstatus={userstatus} to="/detail">
                Detail
              </Link>
            </div>
            <div className="sidebar__link" onClick={toggleSidebar}>
              <Link
                userstatus={userstatus}
                filterpage={filterpage}
                togglefilterpage={togglefilterpage}
                togglesortpage={togglesortpage}
                sortpage={sortpage}
                to="/winePage"
              >
                WinePage
              </Link>
            </div>
            <div className="sidebar__link" onClick={toggleSidebar}>
              <Link userstatus={userstatus} to="/wineListPage">
                WineListPage
              </Link>
            </div>
            <div className="sidebar__link" onClick={toggleSidebar}>
              <Link userstatus={userstatus} to="/wineListDetail">
                WineListDetail
              </Link>
            </div>
            <div className="sidebar__link" onClick={toggleSidebar}>
              <Link userstatus={userstatus} to="/Profile">
                Profile
              </Link>
            </div>
            <div
              className="sidebar__link"
              onClick={() => {
                toggleSidebar();
                toggleTicketModal();
              }}
            >
              view tickets
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
