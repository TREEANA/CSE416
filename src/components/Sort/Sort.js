import React, { useState } from "react";
import "./Sort.css";
import { BsSearch, BsXLg } from "react-icons/bs";

const Sort = ({ sortModal, toggleSortModal }) => {
  return (
    <>
      {/* <div className = {sortToggle? "sort": "sort--inactive"}> */}
      <div className="sort">
        <div className="sort__top">
          <div className="sort__top-left">x</div>
          <div className="sort__top-title"> Sort </div>
          <BsXLg className="sort__top-close" onClick={toggleSortModal} />
        </div>

        <div className="sort__method">
          <div className="sort__method--selected">Highest Rating</div>
          <div className="sort__method--unselected">Most Liked</div>
          <div className="sort__method--unselected">Price - Low to High</div>
          <div className="sort__method--unselected">Price - High to Low</div>
        </div>
      </div>
    </>
  );
};

export default Sort;
