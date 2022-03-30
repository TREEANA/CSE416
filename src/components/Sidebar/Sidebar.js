import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { BsXLg, BsFillPlusCircleFill } from "react-icons/bs";
import { MdWineBar, MdSettings } from "react-icons/md";

const Sidebar = ({ status, toggleStatus }) => {
  const displayUser = () => {
    if (status.user === 0)
      return (
        <div className="sidebar__login">
          <div className="sidebar__header">
            <div
              className="sidebar__status"
              onClick={() => {
                toggleStatus("sideBar", "loginModal");
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
            <Link
              to="/register"
              onClick={() => {
                toggleStatus("sideBar", "registerModal");
              }}
            >
              don't have an account?
            </Link>
          </div>
        </div>
      );
    else if (status.user === 1) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <div className="sidebar__profile">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
              <div className="sidebar__name">iamdooddi</div>
            </div>
            <BsXLg
              className="sidebar__close"
              onClick={() => toggleStatus("sideBar")}
            />
          </div>
        </div>
      );
    } else if (status.user === 2) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <div className="sidebar__profile">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
              <div className="sidebar__name">iamdooddi</div>
              <MdWineBar className="sidebar__icon" />
            </div>
            <BsXLg
              className="sidebar__close"
              onClick={() => toggleStatus("sideBar")}
            />
          </div>
          <div className="sidebar__create">
            <BsFillPlusCircleFill /> create wine list
          </div>
          <hr className="sidebar__hr"></hr>
        </div>
      );
    } else if (status.user === 3) {
      return (
        <div className="sidebar__topCont">
          <div className="sidebar__profileCont">
            <div className="sidebar__profile">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
              <div className="sidebar__name">iamdooddi</div>
              <MdSettings className="sidebar__icon" />
            </div>
            <BsXLg
              className="sidebar__close"
              onClick={() => toggleStatus("sideBar")}
            />
          </div>
        </div>
      );
    }
  };
  const displayFunction = () => {
    if (status.user === 0) {
      return <></>;
    } else if (status.user === 1) {
      return (
        <>
          <hr className="sidebar__hr"></hr>
          <div
            className="sidebar__link"
            onClick={() => toggleStatus("sideBar")}
          >
            become sommlier
          </div>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBar", "ticketModal");
            }}
          >
            view tickets
          </div>
        </>
      );
    } else if (status.user === 2) {
      return (
        <>
          <hr className="sidebar__hr"></hr>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBar", "ticketModal");
            }}
          >
            view tickets
          </div>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBar", "createWineListModal");
            }}
          >
            create Wine List
          </div>
        </>
      );
    } else if (status.user === 3) {
      return (
        <>
          <hr className="sidebar__hr"></hr>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBar");
            }}
          >
            <Link to = "/verifysomm">verify sommeliers</Link>
          </div>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBar");
            }}
          >
            manage reviews
          </div>
          <div
            className="sidebar__link"
            onClick={() => {
              toggleStatus("sideBar");
            }}
          >
            manage tickets
          </div>
        </>
      );
    }
  };
  return (
    <>
      <div className={status.sideBar ? "sidebar" : "sidebar sidebar--inactive"}>
        {displayUser()}
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
              <Link to="/wineListDetail">WineListDetail</Link>
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
                toggleStatus("sideBar", "ticketModal");
              }}
            >
              view tickets
            </div>
            <div
              className="sidebar__link"
              onClick={() => {
                toggleStatus("sideBar", "becomeSommlierModal");
              }}
            >
              become sommlier
            </div>
            {displayFunction()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
