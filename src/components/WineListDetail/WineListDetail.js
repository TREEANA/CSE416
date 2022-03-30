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
      <div className="wineListDetail__carousel">
        <img src="https://images.vivino.com/thumbs/ZtkKCO8kRbCD-VuoEkNFXQ_pb_x600.png" />
        <img src="https://images.vivino.com/thumbs/R2UZlQseRbe4LsWg50L3Lg_pb_x600.png" />
        <img src="https://images.vivino.com/thumbs/TPHfdpsGSju8rPWLCEjKew_pb_x600.png" />
        <img src="https://images.vivino.com/thumbs/N6mBEVGCSjm3Icmui0zI-g_pb_x600.png" />
        <img src="https://images.vivino.com/thumbs/Ki7znlmVT7iu_na3qUqRpw_pb_x600.png" />
      </div>
      <div className="wineListDetail__scrollCont">
        <div className="wineListDetail__leftArrow">{"<"}</div>
        <div className="wineListDetail__wineName">Matsu El Viejo 2018</div>
        <div className="wineListDetail__rightArrow">{">"}</div>
      </div>
      <div className="wineListDetail__detail">
        <div className="wineListDetail__tags">
          <Tag isFilled={1} isDisabled={1} txt="picnic" />
          <Tag isFilled={1} isDisabled={1} txt="dry" />
          <Tag isFilled={1} isDisabled={1} txt="steak" />
          <Tag isDisabled={1} txt="oak" />
          <Tag isDisabled={1} txt="rose" />
          <Tag isDisabled={1} txt="cherry" />
        </div>
        <div className="wineListDetail__rate">★4.5</div>
        <div className="wineListDetail__price">₩17,000</div>
        <div className="wineListDetail__comment">
          Lovely red fruit coming through. This is not a dry attempt at
          sophistication. It is a warm, fruit driven celebration. In a great
          bottle!
        </div>
      </div>
    </div>
  );
};

export default WineListDetail;
