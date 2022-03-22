import React from "react";
import "./Header.css";
import { BsGrid, BsSearch } from "react-icons/bs";

const Header = () => {
  return (
    <>
      <header className="header">
        <BsGrid className="header__menu"></BsGrid>
        <div className="header__title">podo</div>
        <BsSearch className="header__search"></BsSearch>
      </header>
    </>
  );
};

export default Header;
