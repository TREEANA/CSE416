import React, { useState } from "react";
import "./FollowButton.css";

const FollowButton = ({ isFlollowed = false }) => {
  <div className={isFlollowed ? "button button--filled" : "button"}>
    {isFlollowed ? "follow" : "following"}
  </div>;
};

export default FollowButton;
