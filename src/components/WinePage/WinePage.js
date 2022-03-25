import React from "react";
import "./WinePage.css";
import Wine from "../Wine/Wine";

const WinePage = ({}) => {
  return (
    <div className="winePage">
      <div className="winePage__titleCont">
        <div className="winePage__text">search results for</div>
        <div className="winePage__title">Pinot Noir</div>
      </div>
      <div className="winePage__btnCont">
        <button className="winePage__filter">filter</button>
        <button className="winePage__sort">sort</button>
      </div>
      <Wine />
      <Wine />
      <Wine />
    </div>
  );
};

export default WinePage;
