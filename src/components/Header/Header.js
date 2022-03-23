import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { BsGrid, BsSearch } from "react-icons/bs";

const Header = ({ toggleSidebar , toggleSearchBar, searchBarStatus}) => {
  return (
    <>
      <header className="header">
        <BsGrid className="header__menu" onClick={toggleSidebar}></BsGrid>
        <Link to="/">
          <h1 className="header__title">podo</h1>
        </Link>
        <BsSearch className="header__search" onClick = {toggleSearchBar}></BsSearch>
      </header>
    </>
  );
};

export default Header;
