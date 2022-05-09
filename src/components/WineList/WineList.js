import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BsCircleFill, BsCircle } from "react-icons/bs";

import "./WineList.css";

const defaultWineList = {
  wineListID: 0,
  userID: 0,
  title: "Title 1",
  images: [
    "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
    "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
    "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
  ],
  content: "Content 1",
  lastUpdatedAt: "2022-05-09",
};

const WineList = ({ wineList = defaultWineList }) => {
  const [likeStatus, setLikeStatus] = useState(0);
  const [curPage, setCurPage] = useState(0);

  const onPageClick = (num) => {
    setCurPage(num);
  };
  const onLeftArrowClick = () => {
    if (curPage <= 0 || curPage > wineList.wines.length) {
      return;
    } else {
      setCurPage(curPage - 1);
    }
  };
  const onRightArrowClick = () => {
    if (curPage < 0 || curPage >= wineList.wines.length) {
      return;
    } else {
      setCurPage(curPage + 1);
    }
  };
  const onLikeClick = () => {
    setLikeStatus(!likeStatus);
  };
  const onProfileClick = () => {
    //go to author's profile page
    console.log("onProfileClick");
  };

  const displayPageButton = () => {
    let result = [];
    for (let i = 0; i < wineList.wines.length + 1; i++) {
      if (curPage === i) {
        result.push(<BsCircleFill />);
      } else {
        result.push(<BsCircle onClick={() => onPageClick(i)} />);
      }
    }
    return result;
  };
  const displayImages = () => {
    const result = [];
    result.push(
      <div className="wineList__bgCont--main">
        <Link to={"/list/" + wineList.winelistID}>
          <img src={wineList.thumbnailImage} />
        </Link>
      </div>
    );
    wineList.wines.forEach((each, i) => {
      result.push(
        <div className="wineList__bgCont--wine">
          <Link to={"/list/" + wineList.winelistID}>
            <img src={each.images[0]} />
          </Link>
        </div>
      );
    });
    return result;
  };
  const formatDate = (date) => {
    return date.split(" ")[0];
  };
  return (
    <div className="wineList">
      <div className="wineList__topCont">
        <div
          className={
            curPage ? `wineList__bg wineList__bg--${curPage}` : "wineList__bg"
          }
        >
          {displayImages()}
        </div>
        <div className="wineList__profileCont">
          <div className="wineList__profile" onClick={onProfileClick}>
            <img className="wineList__profileImg" src={wineList.profileImage} />
            <div className="wineList__profileTxt">
              <div className="wineList__name">{wineList.username}</div>
              <div className="wineList__date">
                {formatDate(wineList.lastUpdatedAt)}
              </div>
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
        <Link to={"/list/" + wineList.winelistID}>
          <div className="wineList__title">{wineList.title}</div>
        </Link>
        <div className="wineList__subTitle">{wineList.content}</div>
        <div className="wineList__carousel">
          <div className="wineList__leftArrow" onClick={onLeftArrowClick}>
            {"<"}
          </div>
          <div className="wineList__pages">{displayPageButton()}</div>
          <div className="wineList__rightArrow" onClick={onRightArrowClick}>
            {">"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineList;
