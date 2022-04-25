import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Tag.css";

const Tag = ({ type = "wineButton", isFilled = false, txt, onClick }) => {
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
      className={isFilled ? "tag tag--filled" : "tag"}
      onClick={() => onClick()}
    >
      {isFilled ? txt + " x" : txt}
    </div>
  );
};

export default Tag;
