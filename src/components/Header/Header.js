import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { BsGrid, BsSearch, BsPeople } from "react-icons/bs";

const Header = ({ status, toggleStatus }) => {
  let location = useLocation();
  return (
    <>
      <header className="header">
        <BsGrid
          className="header__menu"
          onClick={() => toggleStatus("sideBarModal")}
        ></BsGrid>
        <Link to="/">
          <h1 className="header__title">
            <b>p</b>odo
          </h1>
        </Link>
        {location.pathname !== "/profile" ? (
          <BsSearch
            className="header__search"
            onClick={() => {
              toggleStatus("searchBarModal");
            }}
          ></BsSearch>
        ) : (
          <BsPeople
            className="header__search"
            onClick={() => {
              toggleStatus("searchBarModal");
            }}
          ></BsPeople>
        )}
      </header>
    </>
  );
};

export default Header;
