import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Loader from "../../components/Loader/Loader";
import Tag from "../../components/Tag/Tag";
import Carousel from "../../components/Carousel/Carousel";

import "./ListDetailPage.css";

const defaultWineList = {
  wineListID: 0,
  userID: 0,
  title: "Title 1",
  images: [
    "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    "https://images.vivino.com/thumbs/ZtkKCO8kRbCD-VuoEkNFXQ_pb_x600.png",
    "https://images.vivino.com/thumbs/R2UZlQseRbe4LsWg50L3Lg_pb_x600.png",
    "https://images.vivino.com/thumbs/TPHfdpsGSju8rPWLCEjKew_pb_x600.png",
    "https://images.vivino.com/thumbs/N6mBEVGCSjm3Icmui0zI-g_pb_x600.png",
    "https://images.vivino.com/thumbs/Ki7znlmVT7iu_na3qUqRpw_pb_x600.png",
  ],
  content: "Content 1",
  lastUpdatedAt: new Date(),
};
const defaultWines = [
  {
    wineID: 0,
    tags: ["picnic"],
    name: "Wine 1",
    rating: 4.1,
    price: 17000,
  },
  {
    wineID: 1,
    tags: ["picnic", "dry"],
    name: "Wine 2",
    rating: 4.2,
    price: 27000,
  },
  {
    wineID: 2,
    tags: ["picnic", "dry", "steak"],
    name: "Wine 3",
    rating: 4.3,
    price: 37000,
  },
  {
    wineID: 3,
    tags: ["picnic", "dry", "steak", "oak"],
    name: "Wine 4",
    rating: 4.4,
    price: 47000,
  },
  {
    wineID: 4,
    tags: ["picnic", "dry", "steak", "oak", "rose"],
    name: "Wine 5",
    rating: 4.5,
    price: 57000,
  },
];
const defaultSommlierPick = [
  {
    wineID: 0,
    sommlierComment: "This is Wine 1",
  },
  {
    wineID: 1,
    sommlierComment: "This is Wine 2",
  },
  {
    wineID: 2,
    sommlierComment: "This is Wine 3",
  },
  {
    wineID: 3,
    sommlierComment: "This is Wine 4",
  },
  {
    wineID: 4,
    sommlierComment: "This is Wine 5",
  },
];

const ListDetailPage = ({
  wineList = defaultWineList,
  wines = defaultWines,
  sommlierPick = defaultSommlierPick,
  status,
}) => {
  const { winelistID } = useParams();
  const [list, setList] = useState({});
  const [curPage, setCurPage] = useState(0);
  const [likeStatus, setLikeStatus] = useState(0);
  const [loading, setLoading] = useState(true);

  const onLikeClick = () => {
    setLikeStatus(!likeStatus);
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

  const displayTags = () => {
    const result = [];
    wines[curPage].tags.forEach((each, i) => {
      if (i < 3)
        result.push(<Tag type="wineButton" isFilled={true} txt={each} />);
      else result.push(<Tag type="wineButton" isFilled={false} txt={each} />);
    });
    return result;
  };

  const fetchList = async () => {
    try {
      const resList = await axios.get(`/api/winelists/${winelistID}`);
      if (resList.data === null || resList.data === "") {
        setList({});
      } else {
        const temp = resList.data;
        const tempWines = [];
        for await (const each of resList.data.wines) {
          const resWines = await axios.get(`/api/wines/${each.wineID}`);
          tempWines.push(resWines.data);
        }
        tempWines.forEach((each, i) => {
          each.sommelierComment = temp.wines[i].sommelierComment;
        });
        temp.images = tempWines.map((each) => each.images[0]);
        setList({ ...temp, wines: tempWines });
        console.log("fetched list: ", { ...resList.data, wines: tempWines });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    setLoading(true);
    await fetchList();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="wineListDetail">
          <div className="wineListDetail__firstCont">
            <div className="wineListDetail__titleCont">
              <div className="wineListDetail__title">{list.title}</div>
              <div className="wineListDetail__subTitle">{list.content}</div>
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
          {/* <div className="wineListDetail__carousel">{displayImages()}</div> */}
          <Carousel images={list.images} curPage={curPage} />
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
            <div className="wineListDetail__tags">{displayTags()}</div>
            <div className="wineListDetail__rate">{`★${list.wines[curPage].rating}`}</div>
            <div className="wineListDetail__price">
              {formatPrice(list.wines[curPage].price)}
            </div>
            <div className="wineListDetail__comment">
              {list.wines[curPage].sommlierComment}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListDetailPage;
