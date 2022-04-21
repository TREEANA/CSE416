import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Tag.css";

const Tag = ({ type = "wineButton", isFilled = false, txt }) => {
  const [isSelected, setIsSelected] = useState(false);
  const onClickSelect = () => {
    console.log("onClickSelect");
    setIsSelected(!isSelected);
  };
  return type === "wineButton" ? (
    <Link to={`/wines/${txt}`}>
      <div className={isFilled ? "tag tag--filled" : "tag"}>{txt}</div>
    </Link>
  ) : type === "listButton" ? (
    <Link to={`/lists/${txt}`}>
      <div className={isFilled ? "tag tag--filled" : "tag"}>{txt}</div>
    </Link>
  ) : (
    <div
      className={isSelected ? "tag tag--filled" : "tag"}
      onClick={onClickSelect}
    >
      {isSelected ? txt + " x" : txt}
    </div>
  );
};

export default Tag;
