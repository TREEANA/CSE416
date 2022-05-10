import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Tag from "../../components/Tag/Tag";
import Loader from "../../components/Loader/Loader";
import Wine from "../../components/Wine/Wine";
import WineList from "../../components/WineList/WineList";
import CommentModal from "../../modals/CommentModal/CommentModal";
import Review from "../../components/Review/Review";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import { BsFillPencilFill, BsHeartFill } from "react-icons/bs";
import "./WineDetailPage.css";

// const defaultWineInfo = {
//   wineID: 1,
//   name: "Meanoi",
//   images: [],
//   lightness: 2.4,
//   sweetness: 1.3,
//   smoothness: 4.3,
//   softness: 3.1,
//   price: 1030,
//   grape: "Pinot Noir",
//   likes: 33,
//   rating:0,
//   reviews : [
//     wineID:1,
//     reviewID:202,
//     userID:35,
//     username:testUser2,
//     rating:3,
//     content : "this is good",
//     isDeleted:false,
//     createdAt:,
//     lastUpdatedAt:,
//     tags:[],
//     comments:[]
//   ],
//   // tags : [],
// };

const WineDetailPage = ({ status }) => {
  const userID = status.userID;
  const [wine, setWine] = useState(false);
  const { wineID } = useParams();
  //개인유저가 이 와인을 마음에 들어했는지, 아닌지를 하트로 판단
  //전체숫자에 더해주고, 이 사람의 liked list 에 넣어줘야함.
  const [likes, setLikes] = useState(false);
  const toggleLikes = () => {
    setLikes(!likes);
    console.log("likes:", likes);
  };
  //wineID로 와인 가져오기
  const fetchWine = async (wineId) => {
    try {
      const res = await axios.get(`/api/wines/${wineId}`);
      setWine(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  //review중에 userID로 쓴 리뷰가 있는지 확인
  const [existReview, setExistReview] = useState(0);
  // 들어온 리뷰 중에 userID 겹치는게 있는지 확인

  // const wineReviews = wine.review;
  // const checkReview = (userID) => {
  //   wine.review.forEach((review) => {
  //     if (review.userID === userID) {
  //       setExistReview(1);
  //     }
  //   });
  // };
  // //처음에 불러올때 확인
  // useEffect(() => {
  //   checkReview(userID);
  // }, []);

  //price 나타내주기 current currency price 긁어와서 계산
  //vivino에서 달러로 긁어와서 바꿔줘야함
  const formatPrice = () => {
    return (
      Math.round((wine.price * status.exchangeRate) / 1000) * 1000
    ).toLocaleString("en-US", {
      style: "currency",
      currency: "KRW",
    });
  };

  //grape 품종 (퍼센트와 품명) 대로 가져와서 display
  const formatGrape = () => {
    return wine.grape.map((each, index) => <div>{each}</div>);
  };

  useEffect(() => {
    fetchWine(wineID);
  }, []);

  //tags display
  const displayTags = () => {
    return wine.tags.map((each) => (
      <Tag type="wineButton" key={each.id} txt={each} />
    ));
  };

  //Edit Review available 한지 안한지 구분
  const [editReview, setEditReview] = useState(false);
  const toggleEditReview = () => {
    setEditReview(!editReview);
  };
  // // winePage 에서 각 review 에 대한 comment 로 넘어가기
  // // 근데 이 내용이 app.js에 있음 이거 어떻게 업데이트 할지 생각해보기
  // const [showComment, setShowComment] = useState(0);
  // const toggleComment = () => {
  //   setShowComment(!showComment);
  // };

  // //전체 tag list
  // const [tags, setTags] = useState({});
  // //tag list 불러오기
  // const fetchTags = async () => {
  //   const res = await axios.get("/api/tags/list");
  //   const tempTags = {};
  //   res.data.forEach((each) => {
  //     tempTags[each] = false;
  //   });
  //   setTags(tempTags);
  // };

  // useEffect(() => {
  //   fetchTags();
  // }, []);

  const [tagList, setTagList] = useState({
    acidic: false,
    light: false,
    picnic: false,
    dry: false,
    oak: false,
    rose: false,
    cherry: false,
    blackberry: false,
    chocolate: false,
    vanilla: false,
    good: false,
    fruit: false,
    strawberry: false,
    fig: false,
  });
  const [valueSearch, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState({});

  useEffect(() => {
    const newlist = [];
    for (const each in tagList) {
      if (tagList[each] === true) {
        newlist.push(each);
      }
    }
    setSelectedTag(newlist);
  }, [tagList]);

  const clickAddIcon = () => {
    for (const each in tagList) {
      if (each === valueSearch) {
        const copyTagList = tagList;
        copyTagList[valueSearch] = true;
        setTagList(copyTagList);
      }
    }
  };

  //tag 클릭하면 newTag에 넣음
  function onTagClick() {
    //우현이거
    // const newTag = [];
    // for (let each in tags) {
    //   if (tags[each] === true) {
    //     newTag.push(each);
    //   }
    // }
    //우형이형거
    const newlist = [];
    for (const each in tagList) {
      if (tagList[each] === true) {
        newlist.push(each);
      }
    }
    setSelectedTag(newlist);

    // setTags({ ...tags, [this.txt]: !tags[this.txt] });
    setTagList({ ...tagList, [this.txt]: !tagList[this.txt] });
    setNewReview({
      ...newReview,
      tags: selectedTag,
    });
  }

  const displaySelectedTags = () => {
    const result = [];

    for (let each in tagList) {
      if (tagList[each] === true) {
        result.push(
          <Tag
            type="selected"
            txt={each}
            isFilled={true}
            onClick={onTagClick.bind({ txt: each })}
          />
        );
      }
    }
    result.sort();
    return result;
  };

  const displayUnselectedTags = () => {
    const result = [];
    for (let each in tagList) {
      if (tagList[each] === false) {
        if (each.includes(valueSearch)) {
          result.push(
            <Tag
              type="selected"
              txt={each}
              onClick={onTagClick.bind({ txt: each })}
            />
          );
        }
      }
    }
    return result;
  };

  // const [search, setSearch] = useState("");

  //user가 새로 create 하는 리뷰
  const [newReview, setNewReview] = useState({
    content: "",
    rating: 0,
    like: likes,
    tags: [],
  });

  //리뷰 content 가 바뀔때마다 업데이트
  const onChange = (e) => {
    const { value, name } = e.target;
    let newTempReview = {
      ...newReview,
      [name]: value,
    };
    setNewReview(newTempReview);
    console.log(newTempReview);
  };

  const onSubmit = async () => {
    // setCreating(true);
    // const body = {
    //   ...newReview,
    //   // userID: status.userID,
    //   wines: newReview.wines.map((each) => {
    //     return { wineID: each.wineID };
    //   }),
    // };

    const formData = new FormData();
    form.append("userID", userID);
    // form.append("wineID", wineID);
    form.append("content", newReview.content);
    form.append("rating", newReview.rating);
    form.append("tags", newReview.tags);

    const config = {
      header: { "Content-Type": "multipart/form-data" },
    };

    // console.log(body);
    // if (existReview) {
    //   await axios
    //     .put(`/api/wines/${wineID}/reviews`, form)
    //     .then((response) => {
    //       console.log("response : ", JSON.stringify(response, null));
    //     })
    //     .catch((error) => {
    //       console.log("failed", error);
    //     });
    // } else {
    //   await axios
    //     .post(`/api/wines/${wineID}/reviews`, form)
    //     .then((response) => {
    //       console.log("response : ", JSON.stringify(response, null));
    //     })
    //     .catch((error) => {
    //       console.log("failed", error);
    //     });
    // }
  };

  return (
    <>
      {wine === false ? (
        <Loader />
      ) : (
        <div className="detail">
          <div>
            <div className="detail__wine">
              <div className="detail__wineImage">
                <img src={wine.images[0]}></img>
              </div>

              <div className="detail__wineDetail">
                <div className="detail__wineTitle">{wine.name}</div>
                <div className="detail__grapeTitle">{formatGrape()}</div>
                <div className="detail__wineTags">{displayTags()}</div>
                <div className="detail__wineRate">
                  <StarIcon fontSize="40" /> {wine.rating}
                </div>
                <div className="detail__winePrice">{formatPrice()}</div>
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
                  <Rating
                    // precision={0.5}
                    size="large"
                    name="rating"
                    onChange={onChange}
                    readOnly={editReview ? false : true}
                    sx={{ fontSize: 40 }}
                    emptyIcon={
                      <StarIcon
                        style={{ color: "var(--bg-20)" }}
                        sx={{ fontSize: 40 }}
                      />
                    }
                    // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit"}
                  />
                </div>
                <div className="detail__reviewIcons">
                  <BsHeartFill
                    className={
                      likes
                        ? "detail__reviewIcon--active"
                        : "detail__reviewIcon--inactive"
                    }
                    onClick={toggleLikes}
                    name="like"
                    onChange={onChange}
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
                    {/* {newReview.tags.map((each) => (
                      <Tag type="wineButton" txt={each} />
                    ))} */}
                    {displaySelectedTags()}
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
                    <div className="detail__reviewPlus" onClick={clickAddIcon}>
                      +
                    </div>
                  </div>
                  <div>
                    {displaySelectedTags()}
                    {displayUnselectedTags()}
                  </div>
                </div>
              )}

              {/* selected 된 태그만 나타내고 싶은데 db가 없어서 그런가 잘 안됨 */}
              {!editReview && (
                <div>
                  {wine.tags
                    .filter((each) => each.isSelected == true)
                    .map((each) => (
                      <Tag key={each.id} txt={each} />
                    ))}
                </div>
              )}
              <div className="detail__reviewContent">
                <input
                  className="detail__reviewContentInput"
                  readOnly={editReview ? false : true}
                  placeholder="waiting for your review here :)"
                  name="content"
                  onChange={onChange}
                ></input>
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
            <div className="detail__moreReview"> view more reviews</div>
          </div>
          <hr className="detail__line"></hr>
          <div className="detail__wineRecomm">
            <div className="detail__wineRecommTitle"> You may also like</div>
            {/* <Wine />
            <Wine /> */}
          </div>
          <hr className="detail__line"></hr>
          <div className="detail__winelistRecomm">
            <div className="detail__winelistRecommTitle">
              List that contains this wine
            </div>
            {/* <WineList />
            <WineList /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default WineDetailPage;
