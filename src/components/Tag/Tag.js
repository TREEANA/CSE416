import React from "react";
import "./Tag.css";

const Tag = ({ isFilled, txt }) => {
  return <div className={isFilled ? "tag tag--filled" : "tag"}>{txt}</div>;
};

export default Tag;
