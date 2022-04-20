import React from "react";
import "./WineDetailPage.css";
import Review from "../../components/Review/Review";
// import Search from "../Search/Search";
// import Filter from "../Filter/Filter";
// import Sort from "../Sort/Sort";
// import Register from "../Register/Register";
// import RegisterTag from "../RegisterTag/RegisterTag";
import Wine from "../../components/Wine/Wine";
import WineList from "../../components/WineList/WineList";
import Tag from "../../components/Tag/Tag";
import {
  BsHeart,
  BsFillPencilFill,
  BsHeartFill,
  BsStar,
  BsStarFill,
} from "react-icons/bs";

const WineDetailPage = ({
  name,
  images,
  lightness,
  smoothness,
  sweetness,
  softness,
  price,
  grape,
}) => {
  const initTags = {};
  // const tagsSorted = [...movies].sort(
  //   (a, b) => b[sortProperty] - a[sortProperty]
  // );

  return (
    <>
      <div className="detail">
        <div>
          <div className="detail__wine">
            <div className="detail__wineImage">
              <img src="https://images.vivino.com/thumbs/MhiwIbE4TmSLMfjD-EKYjg_pb_x300.png"></img>
            </div>

            <div className="detail__wineDetail">
              <div className="detail__wineTitle">{name}</div>
              {/* <div>tag</div> */}
              <div className="detail__wineTags">
                <Tag isFilled={1} isDisabled={1} txt="picnic" />
                <Tag isDisabled={1} txt="dry" />
                <Tag isDisabled={1} txt="steak" />
                <Tag isDisabled={1} txt="oak" />
                <Tag isDisabled={1} txt="rose" />
                <Tag isDisabled={1} txt="cherry" />
              </div>
              <div className="detail__wineRate">★4.5</div>
              <div className="detail__winePrice">{price}</div>
            </div>
          </div>
          <div className="detail__wineChar">
            <div className="detail__wineCharInd">
              <div className="detail__wineCharName"> light </div>
              <input
                className="detail__wineCharSlider"
                type="range"
                min="0"
                max="5"
                value={lightness}
                disable="disable"
              />
              <div className="detail__wineCharName"> bold</div>
            </div>

            <div className="detail__wineCharInd">
              <div className="detail__wineCharName"> smooth </div>
              <input
                className="detail__wineCharSlider"
                type="range"
                min="0"
                max="5"
                value={smoothness}
                disable="disable"
              />
              <div className="detail__wineCharName"> tannin</div>
            </div>

            <div className="detail__wineCharInd">
              <div className="detail__wineCharName"> sweet </div>
              <input
                className="detail__wineCharSlider"
                type="range"
                min="0"
                max="5"
                value={sweetness}
                disable="disable"
              />
              <div className="detail__wineCharName"> dry</div>
            </div>

            <div className="detail__wineCharInd">
              <div className="detail__wineCharName"> soft </div>
              <input
                className="detail__wineCharSlider"
                type="range"
                min="0"
                max="5"
                value={softness}
                disable="disable"
              />
              <div className="detail__wineCharName"> acidic</div>
            </div>
          </div>
        </div>

        <hr className="detail__line"></hr>
        <div className="detail__review">
          <div className="detail__reviewTitle"> Reviews </div>

          <div className="detail__oneTeview">
            <div className="detail__reviewTitle">
              <div className="detail__reviewStar">
                {" "}
                <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStarFill />{" "}
                <BsStar />{" "}
              </div>
              <div className="detail__reviewIcons">
                <BsHeartFill />
                <BsFillPencilFill />
              </div>
            </div>

            <div className="detail__reviewAddtag">
              <div className="detail__reviewTagcont">
                <input
                  className="detail__reviewInput"
                  placeholder="add tags "
                ></input>
                <div className="detail__reviewPlus"> +</div>
              </div>
              <div>
                <Tag isDisabled={0} isFilled={1} txt="x acidic"></Tag>
                <Tag isDisabled={0} isFilled={1} txt="x dry"></Tag>
                <Tag isDisabled={0} isFilled={1} txt="x light"></Tag>
                <Tag isDisabled={0} isFilled={1} txt="x steak"></Tag>
                <Tag isDisabled={0} isFilled={1} txt="x picnic"></Tag>
              </div>
            </div>

            <div className="detail__reviewContent">
              Great autumn wine. Clean leather, mint, cherry, blackberry and
              chocolate. Worth opening ahead of drinking - smooth and mellow.
            </div>
            <div className="detail__review-post"> post a review </div>
            <div></div>
          </div>

          <Review userstatus={1} />
          <Review userStatus={0} />
        </div>
        <hr className="detail__line"></hr>
        <div className="detail__wineRecomm">
          <div className="detail__wineRecommTitle"> You may also like</div>
          <Wine />
          <Wine />
        </div>
        <hr className="detail__line"></hr>
        <div className="detail__winelistRecomm">
          <div className="detail__winelistRecommTitle">
            List that contains this wine
          </div>
          <WineList />
          <WineList />
        </div>
      </div>
    </>
  );
};

// <img alt="Meiomi Pinot Noir" src="//images.vivino.com/thumbs/fjBaM_ZHTxqQtDa5Qj94JQ_pb_x600.png" height="500" width="147">

export default WineDetailPage;
