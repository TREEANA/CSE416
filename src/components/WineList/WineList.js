import React, { useState } from "react";
import "./WineList.css";

const WineList = ({}) => {
  const [likeStatus, setLikeStatus] = useState(0);
  const onLikeClick = () => {
    setLikeStatus(!likeStatus);
  };
  return (
    <div className="wineList">
      <div className="wineList__bg">
        <div className="wineList__cont">
          <div className="wineList__profile">
            <div className="wineList__profileImg"></div>
            <div className="wineList__profileTxt">
              <div className="wineList__name">Mark Almert</div>
              <div className="wineList__date">2022.02.07</div>
            </div>
          </div>
          <div
            className={
              likeStatus
                ? "wineList__like wineList__like--filled"
                : "wineList__like"
            }
            onClick={onLikeClick}
          >
            ❤
          </div>
        </div>
      </div>
      <div className="wineList__txt">
        <div className="wineList__title">Summer Breeze</div>
        <div className="wineList__subTitle">sweet wines best for pincic</div>
        <div className="wineList__carousel">
          <div className="wineList__leftArrow">{"<"}</div>
          <div className="wineList__pages">
            <div className="wineList__page">o</div>
            <div className="wineList__page">o</div>
            <div className="wineList__page">o</div>
            <div className="wineList__page">o</div>
          </div>
          <div className="wineList__rightArrow">{">"}</div>
        </div>
      </div>
    </div>
  );
};

export default WineList;
