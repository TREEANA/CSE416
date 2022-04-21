import React, { useState } from "react";
import "./SortModal.css";
import { BsSearch, BsXLg } from "react-icons/bs";

const SortModal = ({ sortModal, toggleSortModal }) => {
  const [Highest_Rating, setHighest_Rating] = useState(
    "sort__method--selected"
  );
  const [Most_Liked, setMost_Liked] = useState("sort__method--unselected");
  const [Price_Low_to_High, setPrice_Low_to_High] = useState(
    "sort__method--unselected"
  );
  const [Price_High_to_Low, setPrice_High_to_Low] = useState(
    "sort__method--unselected"
  );

  const click_Highest_Rating = () => {
    setHighest_Rating("sort__method--selected");
    setMost_Liked("sort__method--unselected");
    setPrice_Low_to_High("sort__method--unselected");
    setPrice_High_to_Low("sort__method--unselected");
  };

  const click_Most_Liked = () => {
    setHighest_Rating("sort__method--unselected");
    setMost_Liked("sort__method--selected");
    setPrice_Low_to_High("sort__method--unselected");
    setPrice_High_to_Low("sort__method--unselected");
  };

  const click_Price_Low_to_High = () => {
    setHighest_Rating("sort__method--unselected");
    setMost_Liked("sort__method--unselected");
    setPrice_Low_to_High("sort__method--selected");
    setPrice_High_to_Low("sort__method--unselected");
  };

  const click_Price_High_to_Low = () => {
    setHighest_Rating("sort__method--unselected");
    setMost_Liked("sort__method--unselected");
    setPrice_Low_to_High("sort__method--unselected");
    setPrice_High_to_Low("sort__method--selected");
  };

  return (
    <>
      <div className={sortModal ? "sort" : "sort--inactive"}>
        <div className="sort__top">
          <div className="sort__top-left">x</div>
          <div className="sort__top-title"> Sort </div>
          <BsXLg className="sort__top-close" onClick={toggleSortModal} />
        </div>

        <div className="sort__method">
          <div className={Highest_Rating} onClick={click_Highest_Rating}>
            Highest Rating
          </div>
          <div className={Most_Liked} onClick={click_Most_Liked}>
            Most Liked
          </div>
          <div className={Price_Low_to_High} onClick={click_Price_Low_to_High}>
            Price - Low to High
          </div>
          <div className={Price_High_to_Low} onClick={click_Price_High_to_Low}>
            Price - High to Low
          </div>
        </div>
      </div>
    </>
  );
};

export default SortModal;
