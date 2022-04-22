import React, { useState } from "react";
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
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import {
  BsHeart,
  BsFillPencilFill,
  BsHeartFill,
  BsStar,
  BsStarFill,
} from "react-icons/bs";

const defaultWineInfo = {
  wineID: 1,
  name: "Meanoi",
  images: [],
  lightness: 2.4,
  sweetness: 1.3,
  smoothness: 4.3,
  softness: 3.1,
  price: 1030,
  grape: "Pinot Noir",
  likes: 33,
  //tags 는 쓸데없는거였음.. 이건 좀 더 생각 해봐야겠우
};

const WineDetailPage = ({ wine = defaultWineInfo }) => {
  //개인유저가 이 와인을 마음에 들어했는지, 아닌지를 하트로 판단
  //전체숫자에 더해주고, 이 사람의 liked list 에 넣어줘야함.

  const [likes, setLikes] = useState(0);
  const toggleLikes = () => {
    setLikes(!likes);
  };
  const dummyTags = [
    "acidic",
    "chocolate",
    "blueberry",
    "fruity",
    "steak",
    "picnic",
    "seafood",
    "cheese",
  ];
  const selectedTaglist = ["steak", "blueberry"];

  const tagList = dummyTags.map((each) => (
    <Tag type="wineButton" key={each.id} txt={each} />
  ));

  const [editReview, setEditReview] = useState(false);
  const toggleEditReview = () => {
    setEditReview(!editReview);
  };

  return (
    <>
      <div className="detail">
        <div>
          <div className="detail__wine">
            <div className="detail__wineImage">
              <img src="https://images.vivino.com/thumbs/MhiwIbE4TmSLMfjD-EKYjg_pb_x300.png"></img>
            </div>

            <div className="detail__wineDetail">
              <div className="detail__wineTitle">{wine.name}</div>
              <div className="detail__grapeTitle">{wine.grape}</div>
              <div className="detail__wineTags">{tagList}</div>
              <div className="detail__wineRate">
                <StarIcon fontSize="40" /> 4.5
              </div>
              <div className="detail__winePrice">
                {wine.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
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
                value={wine.lightness}
                disable="disable"
                readonly
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
                value={wine.smoothness}
                disable="disable"
                readonly
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
                value={wine.sweetness}
                disable="disable"
                readonly
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
                value={wine.softness}
                disable="disable"
                readonly
              />
              <div className="detail__wineCharName"> acidic</div>
            </div>
          </div>
        </div>

        <hr className="detail__line"></hr>

        <div className="detail__review">
          <div className="detail__reviewTitle"> Reviews </div>

          <form className="detail__oneReview" method="POST">
            <div className="detail__reviewTitle">
              <div className="detail__reviewStar">
                {/* <Box> */}
                <Rating
                  precision={0.5}
                  size="large"
                  // fontSize="large"
                  defaultValue={2.5}
                  readOnly={editReview ? false : true}
                  sx={{ fontSize: 40 }}
                  emptyIcon={
                    <StarIcon
                      style={{ color: "var(--bg-20)" }}
                      // fontSize=""
                      sx={{ fontSize: 40 }}
                    />
                  }
                  // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit"}
                />
                {/* </Box> */}
              </div>
              <div className="detail__reviewIcons">
                <BsHeartFill
                  className={
                    likes
                      ? "detail__reviewIcon--active"
                      : "detail__reviewIcon--inactive"
                  }
                  onClick={toggleLikes}
                />
                <BsFillPencilFill
                  className={
                    editReview
                      ? "detail__reviewIcon--active"
                      : "detail__reviewIcon--inactive"
                  }
                  onClick={toggleEditReview}
                />
              </div>
            </div>

            <div className="detail__reviewTags">
              {!editReview && (
                <div>
                  {selectedTaglist.map((each) => (
                    <Tag type="wineButton" txt={each} />
                  ))}
                </div>
              )}
            </div>

            {editReview && (
              <div className="detail__reviewAddtag">
                <div className="detail__reviewTagcont">
                  <input
                    className="detail__reviewInput"
                    placeholder="add tags "
                  ></input>
                  <div className="detail__reviewPlus"> +</div>
                </div>
                <div>
                  {/* 여기 매우 몹시 이상한데 일단 넘어가.... */}
                  {/* selected 처리할수 있게되면 그때 다시 하겠음 */}
                  {/* 우형이형이한거 보고 다시 할 예정*/}
                  {selectedTaglist.map((each) => (
                    <Tag type="wineButton" txt={each} isFilled />
                  ))}
                  {dummyTags.map((each) => (
                    <Tag key={each.id} txt={each} />
                  ))}
                </div>
              </div>
            )}

            {/* selected 된 태그만 나타내고 싶은데 db가 없어서 그런가 잘 안됨 */}
            {!editReview && (
              <div>
                {dummyTags
                  .filter((each) => each.isSelected == true)
                  .map((each) => (
                    <Tag key={each.id} txt={each} />
                  ))}
              </div>
            )}

            <div className="detail__reviewContent">
              Great autumn wine. Clean leather, mint, cherry, blackberry and
              chocolate. Worth opening ahead of drinking - smooth and mellow.
            </div>
            {editReview && (
              <div className="detail__reviewPost" onClick={toggleEditReview}>
                post a review
              </div>
            )}

            <div></div>
          </form>

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

{
  /* <img alt="Meiomi Pinot Noir" src="//images.vivino.com/thumbs/fjBaM_ZHTxqQtDa5Qj94JQ_pb_x600.png" height="500" width="147"> */
}

export default WineDetailPage;
