import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import Loader from "../../components/Loader/Loader";
import Tag from "../../components/Tag/Tag";
import Carousel from "../../components/Carousel/Carousel";

import "./ListDetailPage.css";
import WineList from "../../components/WineList/WineList";

const ListDetailPage = ({ status, setStatus }) => {
  const { winelistID } = useParams();
  const [list, setList] = useState({
    title: "",
    images: [],
    wines: [],
    userID: "",
    username: "",
    profileImage: "",
  });
  const [curPage, setCurPage] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);
  useEffect(() => {
    setLikeStatus(
      status.userinfo.likedWinelists.filter((each) => each === winelistID / 1)
        .length === 1
        ? true
        : false
    );
  }, [status]);
  const [loading, setLoading] = useState(true);

  const onLikeClick = async () => {
    setLikeStatus(!likeStatus);
    const res = await axios.post(
      `/api/users/${status.userID}/like-winelist?winelistID=${winelistID}`
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
  const onLeftClick = () => {
    if (curPage > 0) setCurPage(curPage - 1);
  };
  const onRightClick = () => {
    if (curPage < list.images.length - 1) setCurPage(curPage + 1);
  };

  const formatPrice = (price) => {
    return (
      Math.round((price * status.exchangeRate) / 1000) * 1000
    ).toLocaleString("en-US", {
      style: "currency",
      currency: "KRW",
    });
  };

  const displayTags = (tags, type = "wineButton") => {
    const result = [];
    if (type === "wineButton") {
      tags.forEach((each, i) => {
        result.push(<Tag type={type} isFilled={false} txt={each} />);
      });
    } else {
      tags.forEach((each, i) => {
        result.push(<Tag type={type} isFilled={true} txt={each} />);
      });
    }
    return result;
  };

  const fetchList = async () => {
    try {
      const resList = await axios.get(`/api/winelists/${winelistID}`);
      const tempList = { ...resList.data };
      tempList.images = tempList.wines.map((each) => each.images[0]);
      setList(tempList);
      console.log("fetchList: ", tempList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    setLoading(true);
    await fetchList();
    setLoading(false);
  }, []);

  const formatDate = (date) => {
    return date.split(" ")[0];
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="wineListDetail">
          <div className="wineListDetail__firstCont">
            <div className="wineListDetail__firstContCont">
              <div className="wineListDetail__title">{list.title}</div>
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
            <div className="wineListDetail__secondCont">
              <div className="wineList__profile">
                <div className="wineList__profileTxt">
                  <Link to={"/profile/" + list.userID}>
                    <div className="wineList__name">{list.username}</div>
                  </Link>
                  <div className="wineList__date">
                    {formatDate(list.lastUpdatedAt)}
                  </div>
                </div>
              </div>
            </div>
            <div className="wineListDetail__titleCont">
              <div className="wineListDetail__tagCont">
                {displayTags(list.tags, "listButton")}
              </div>
              <div className="wineListDetail__subTitle">{list.content}</div>
            </div>
          </div>
          <Carousel images={list.images} curPage={curPage} wines={list.wines} />
          <div className="wineListDetail__scrollCont">
            <div
              className={
                curPage > 0
                  ? "wineListDetail__leftArrow"
                  : "wineListDetail__leftArrow wineListDetail--inactive"
              }
              onClick={onLeftClick}
            >
              {"<"}
            </div>
            <div className="wineListDetail__wineName">
              {list.wines[curPage].name}
            </div>
            <div
              className={
                curPage < list.images.length - 1
                  ? "wineListDetail__rightArrow"
                  : "wineListDetail__rightArrow wineListDetail--inactive"
              }
              onClick={onRightClick}
            >
              {">"}
            </div>
          </div>
          <div className="wineListDetail__detail">
            <div className="wineListDetail__tags">
              {displayTags(list.wines[curPage].tags)}
            </div>
            <div className="wineListDetail__rate">{`★${list.wines[curPage].rating}`}</div>
            <div className="wineListDetail__price">
              {formatPrice(list.wines[curPage].price)}
            </div>
            <div className="wineListDetail__comment">
              {list.wines[curPage].sommelierComment}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListDetailPage;
