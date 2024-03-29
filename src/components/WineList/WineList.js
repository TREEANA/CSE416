import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { BsCircleFill, BsCircle } from "react-icons/bs";

import "./WineList.css";

const WineList = ({ wineList, status, setStatus }) => {
  const navigate = useNavigate();
  const [likeStatus, setLikeStatus] = useState(false);
  useEffect(() => {
    status !== undefined
      ? setLikeStatus(
          status.userinfo.likedWinelists.filter(
            (each) => each === wineList.winelistID
          ).length === 1
            ? true
            : false
        )
      : setLikeStatus(false);
  }, [status]);
  const [curPage, setCurPage] = useState(0);

  const onPageClick = (num) => {
    setCurPage(num);
  };
  const onLeftArrowClick = () => {
    if (curPage <= 0 || curPage > wineList.wines.length) {
      setCurPage(wineList.wines.length);
    } else {
      setCurPage(curPage - 1);
    }
  };
  const onRightArrowClick = () => {
    if (curPage < 0 || curPage >= wineList.wines.length) {
      setCurPage(0);
    } else {
      setCurPage(curPage + 1);
    }
  };
  const onLikeClick = async () => {
    if (status.userinfo.status === -1) {
      alert("Please login to like the winelist");
      return;
    }
    setLikeStatus(!likeStatus);
    const res = await axios.post(
      `/api/users/${status.userID}/like-winelist?winelistID=${wineList.winelistID}`
    );
    console.log(res.data);
    setStatus({
      ...status,
      userinfo: {
        ...status.userinfo,
        likedWinelists: res.data.likedWinelists,
      },
    });
  };

  const onImageClick = () => {
    console.log("onImageClick");
    navigate("/list/" + wineList.winelistID);
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
      <div className="wineList__bgCont--main" onClick={onImageClick}>
        <img src={wineList.thumbnailImage} />
      </div>
    );
    wineList.wines.forEach((each, i) => {
      result.push(
        <div className="wineList__bgCont--wine" onClick={onImageClick}>
          <img src={each.images[0]} />
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
          <div className="wineList__profile">
            <Link to={"/profile/" + wineList.userID}>
              <img
                className="wineList__profileImg"
                src={wineList.profileImage}
              />
            </Link>
            <div className="wineList__profileTxt">
              <Link to={"/profile/" + wineList.userID}>
                <div className="wineList__name">{wineList.username}</div>
              </Link>
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
