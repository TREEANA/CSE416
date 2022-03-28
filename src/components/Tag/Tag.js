import React, { useState } from "react";
import "./Tag.css";

const Tag = ({ isDisabled, isFilled, txt }) => {
  const onClick = () => {
    if (!isDisabled) isFilled = !isFilled;
  };
  return (
    <div className={isFilled ? "tag tag--filled" : "tag"} onClick={onClick}>
      {txt}
    </div>
  );
};

export default Tag;
