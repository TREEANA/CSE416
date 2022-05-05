import React, { memo } from "react";
import ReactLoading from "react-loading";
import "./Loader.css";

const Loader = ({}) => {
  return (
    <div className="loader">
      <ReactLoading type="spin" color="rgba(222, 73, 75, 1)" />
    </div>
  );
};

export default Loader;
