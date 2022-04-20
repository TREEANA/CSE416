import React, { useState } from "react";
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
}) => {
  const [curPage, setCurPage] = useState(0);
  const [likeStatus, setLikeStatus] = useState(0);
  const onLikeClick = () => {
    setLikeStatus(!likeStatus);
  };
  const onLeftClick = () => {
    if (curPage > 0) setCurPage(curPage - 1);
  };
  const onRightClick = () => {
    if (curPage < wineList.images.length - 2) setCurPage(curPage + 1);
  };
  const formatPrice = (price) => {
    return price.toLocaleString();
  };
  const displayTags = () => {
    const result = [];
    wines[curPage].tags.forEach((each, i) => {
      if (i < 3) result.push(<Tag isFilled={1} isDisabled={1} txt={each} />);
      else result.push(<Tag isDisabled={1} txt={each} />);
    });
    return result;
  };
  return (
    <>
      <div className="wineListDetail">
        <div className="wineListDetail__firstCont">
          <div className="wineListDetail__titleCont">
            <div className="wineListDetail__title">{wineList.title}</div>
            <div className="wineListDetail__subTitle">{wineList.content}</div>
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
        <Carousel images={wineList.images} curPage={curPage} />
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
          <div className="wineListDetail__wineName">{wines[curPage].name}</div>
          <div
            className={
              curPage < wineList.images.length - 2
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
          <div className="wineListDetail__rate">{`★${wines[curPage].rating}`}</div>
          <div className="wineListDetail__price">{`₩${formatPrice(
            wines[curPage].price
          )}`}</div>
          <div className="wineListDetail__comment">
            {sommlierPick[curPage].sommlierComment}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListDetailPage;
