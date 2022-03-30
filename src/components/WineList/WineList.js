import React, { useState } from "react";
import "./WineList.css";
import { BsCircleFill, BsCircle } from "react-icons/bs";

const WineList = ({ totalPage = 4 }) => {
  const [likeStatus, setLikeStatus] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const displayPageButton = () => {
    let result = [];
    for (let i = 0; i < totalPage; i++) {
      if (curPage === i) {
        result.push(<BsCircleFill />);
      } else {
        result.push(<BsCircle onClick={() => onPageClick(i)} />);
      }
    }
    return result;
  };
  const onPageClick = (num) => {
    setCurPage(num);
  };
  const onLeftArrowClick = () => {
    if (curPage <= 0 || curPage > totalPage - 1) {
      return;
    } else {
      setCurPage(curPage - 1);
    }
  };
  const onRightArrowClick = () => {
    if (curPage < 0 || curPage >= totalPage - 1) {
      return;
    } else {
      setCurPage(curPage + 1);
    }
  };
  const onLikeClick = () => {
    setLikeStatus(!likeStatus);
  };
  return (
    <div className="wineList">
      <div className="wineList__topCont">
        <div
          className={
            curPage ? `wineList__bg wineList__bg--${curPage}` : "wineList__bg"
          }
        >
          <div className="wineList__bgCont--main">
            <img src="https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" />
          </div>
          <div className="wineList__bgCont--wine">
            <img src="https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png" />
          </div>
          <div className="wineList__bgCont--wine">
            <img src="https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png" />
          </div>
          <div className="wineList__bgCont--wine">
            <img src="https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png" />
          </div>
        </div>
        <div className="wineList__profileCont">
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
