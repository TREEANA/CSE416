import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { BsGrid, BsSearch } from "react-icons/bs";

const Header = ({ status, toggleStatus }) => {
  return (
    <>
      <header className="header">
        <BsGrid
          className="header__menu"
          onClick={() => toggleStatus("sideBar")}
        ></BsGrid>
        <Link to="/">
          <h1 className="header__title">podo</h1>
        </Link>
        <BsSearch
          className="header__search"
          onClick={() => toggleStatus("searchBar")}
        ></BsSearch>
      </header>
    </>
  );
};

export default Header;
