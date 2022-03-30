import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { BsGrid, BsSearch, BsPeople } from "react-icons/bs";
import { Router, Routes, Route } from "react-router-dom";

const Header = ({ type = "wine", status, toggleStatus }) => {
  const history = useNavigate();
  const displaySearchIcon = () => {
    const url = window.location.href.split("/").reverse()[0];
    if (url === "profile") {
      return (
        <BsPeople
          className="header__search"
          onClick={() => toggleStatus("searchPersonBar")}
        ></BsPeople>
      );
    } else {
      return (
        <BsSearch
          className="header__search"
          onClick={() => toggleStatus("searchBar")}
        ></BsSearch>
      );
    }
  };
  return (
    <>
      <header className="header">
        {console.log()}
        <BsGrid
          className="header__menu"
          onClick={() => toggleStatus("sideBar")}
        ></BsGrid>
        <Link to="/">
          <h1 className="header__title">podo</h1>
        </Link>
        {displaySearchIcon()}
      </header>
    </>
  );
};

export default Header;
