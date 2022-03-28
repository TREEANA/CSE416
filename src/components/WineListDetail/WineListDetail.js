import React, { useState } from "react";
import Tag from "../Tag/Tag";
import "./WineListDetail.css";

const WineListDetail = ({}) => {
  const [likeStatus, setLikeStatus] = useState(0);
  const onLikeClick = () => {
    setLikeStatus(!likeStatus);
  };
  return (
    <div className="wineListDetail">
      <div className="wineListDetail__firstCont">
        <div className="wineListDetail__titleCont">
          <div className="wineListDetail__title">Summer Breeze</div>
          <div className="wineListDetail__subTitle">
            sweet wines best for picnic
          </div>
        </div>
        <div
          className={
            likeStatus
              ? "wineListDetail__like wineListDetail__like--filled"
              : "wineListDetail__like"
          }
          onClick={onLikeClick}
        >
          ❤
        </div>
      </div>
      <div className="wineListDetail__carousel">carousel</div>
      <div className="wineListDetail__scrollCont">
        <div className="wineListDetail__leftArrow">{"<"}</div>
        <div className="wineListDetail__wineName">Wine Name</div>
        <div className="wineListDetail__rightArrow">{">"}</div>
      </div>
      <div className="wineListDetail__detail">
        <Tag />
        <div className="wineListDetail__rating"></div>
        <div className="wineListDetail__price"></div>
        <div className="wineListDetail__comment"></div>
      </div>
    </div>
  );
};

export default WineListDetail;
