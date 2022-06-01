import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import axios from "axios";

import Tag from "../../components/Tag/Tag";
import Loader from "../../components/Loader/Loader";
import Wine from "../../components/Wine/Wine";
import WineList from "../../components/WineList/WineList";
import Review from "../../components/Review/Review";

import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import { BsFillPencilFill, BsHeartFill } from "react-icons/bs";
import { GrView } from "react-icons/gr";

import "./WineDetailPage.css";

const WineDetailPage = ({ status, setStatus, toggleStatus }) => {
  //const for loader (true : loading, false : not loading)
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();
  const [numReviews, setNumReviews] = useState(2);
  const [pageNum, setPageNum] = useState(1);

  const userID = status.userID;
  const [wine, setWine] = useState(false);
  const { wineID } = useParams();

  //user가 새로 create 하는 리뷰
  const [newReview, setNewReview] = useState({
    content: "",
    rating: 0,
    userLiked: false,
    //userLiked로 바꾸기
    tags: [],
  });

  //리뷰 content 가 바뀔때마다 업데이트
  const onChange = (e) => {
    const { value, name } = e.target;
    if (name !== "like") {
      let newTempReview = {
        ...newReview,
        [name]: value,
      };
      setNewReview(newTempReview);
      console.log(newTempReview);
    }
  };

  const toggleLikes = () => {
    // setLikes(!likes);
    setNewReview({ ...newReview, userLiked: !newReview.userLiked });
  };
  //wineID로 와인 가져오기
  const fetchWine = async (wineID) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/wines/${wineID}`);
      setWine(res.data);
      // console.log(
      //   "setWine(res.data) from fetchWine in WineDetailpage : ",
      //   res.data
      // );
      setLoading(false);
      // console.log("fetchWine from WineDetailpage, wine:", wine);
    } catch (e) {
      console.log(e);
    }
  };

  //price 나타내주기 current currency price 긁어와서 계산(vivino는 달러로 되어있음)
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

  // //전체 tag list
  const [tagList, setTagList] = useState({});
  const fetchTags = async () => {
    setLoading(true);
    const res = await axios.get("/api/tags/list");
    const tempTags = {};
    res.data.forEach((each) => {
      tempTags[each] = false;
    });
    setLoading(false);
    setTagList(tempTags);
  };

  useEffect(() => {
    fetchWine(wineID);
    fetchTags();
    // checkReview(userID);
  }, []);

  //review중에 userID로 쓴 리뷰가 있는지 확인
  const [existReview, setExistReview] = useState(0);
  const [reviewID, setReviewID] = useState(0);

  // 들어온 리뷰 중에 userID 겹치는게 있는지 확인
  // const [prevReview, setPrevReview] = useState({});
  // const checkPrevReviewExist = () => {
  //   wine.reviews.forEach((each, index) => {
  //     if (each.userID === Number(status.userID)) {
  //       setExistReview(true);
  //       setPrevReview(each);
  //     }
  //   });
  //   console.log(
  //     "useEffect from checkPrevReviewExist , existReview : ",
  //     existReview,
  //     ", prevReview: ",
  //     prevReview
  //   );
  // };

  // useEffect(() => {
  //   checkPrevReviewExist();
  // }, []);

  const displayRecommendation = () => {
    let result = [];
    // console.log(
    //   "displayRecommendations, wine recomm list :  ",
    //   wine.recommendations
    // );
    wine.recommendations.forEach((each, index) => {
      result.push(
        <Wine type="recommendation" wine={each} key={index} status={status} />
      );
    });
    return result;
  };

  // const checkReview = (userID) => {
  //   console.log("checkReview starts : ");
  //   console.log("checkReview: wine.reviews", wine.reviews);
  //   let prevReview = wine.reviews.some((review) => {
  //     // console.log(
  //     //   "review.userID :",
  //     //   review.userID,
  //     //   "type :",
  //     //   typeof review.userID
  //     // );
  //     // console.log("input userID:", userID, "type :", typeof userID);
  //     if (review.userID === Number(userID)) {
  //       return review;
  //       // setExistReview(1);
  //       // // setNewReview(...review);
  //       // setNewReview(
  //       //   (newReview.content = review.content),
  //       //   (newReview.rating = review.rating),
  //       //   (newReview.userLiked = review.userLiked),
  //       //   (newReview.tags = review.tags)
  //       // );
  //       // setReviewID(review.reviewID);
  //     }
  //   });
  //   setExistReview(1);
  //   setNewReview(...prevReview);
  //   setReviewID(prevReview.reviewID);
  //   console.log("checkReview result: ", existReview);
  // };

  const [search, setSearch] = useState("");
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

  //add tag(with value on the search input) into tagList
  const clickAddIcon = () => {
    for (const each in tagList) {
      if (each === search) {
        const copyTagList = tagList;
        copyTagList[search] = true;
        setTagList(copyTagList);
      }
    }
  };

  //tag 클릭하면 newTag에 넣음
  function onTagClick() {
    const newlist = [];
    for (const each in tagList) {
      if (tagList[each] === true) {
        newlist.push(each);
      }
    }
    setSelectedTag(newlist);
    setTagList({ ...tagList, [this.txt]: !tagList[this.txt] });
    setNewReview({
      ...newReview,
      tags: selectedTag,
    });
    console.log(
      "onTagClick : newReview.tags ",
      newReview.tags,
      ", selectedTags:",
      selectedTag
    );
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
    const formattedTag = search.toLowerCase();
    if (formattedTag !== "") {
      for (let each in tagList) {
        if (
          each.toLowerCase().indexOf(formattedTag) === 0 &&
          tagList[each] === false
        ) {
          result.push(
            <Tag
              type="selected"
              txt={each}
              onClick={onBtnClick.bind({ txt: each })}
            />
          );
        }
      }
    } else {
      for (let each in tagList) {
        if (tagList[each] === false) {
          result.push(
            <Tag
              type="selected"
              txt={each}
              onClick={onBtnClick.bind({ txt: each })}
            />
          );
        }
      }
    }
    return result;
  };

  function onBtnClick() {
    setTagList({ ...tagList, [this.txt]: !tagList[this.txt] });
  }

  const onLikeClick = async (like) => {
    setNewReview({ ...newReview, userLiked: like });
    const res = await axios.post(
      `/api/users/${status.userID}/like-winelist?winelistID=${wineID}`
    );
    console.log("res.data : ", res.data, "newReview after like : ", newReview);
    setStatus({
      ...status,
      userinfo: {
        ...status.userinfo,
        likedWines: res.data.likedWines,
      },
    });
  };
  // const onRateClick = async () => {
  //   setNewReview({ ...newReview, rating: newReview.rating });
  //   const res = await axios.post(
  //     `/api/users/${status.userID}/like-winelist?winelistID=${wineID}`
  //   );
  //   console.log("res.data : ", res.data, "newReview after like : ", newReview);
  //   setStatus({
  //     ...status,
  //     userinfo: {
  //       ...status.userinfo,
  //       likedWines: res.data.likedWines,
  //     },
  //   });
  // };

  const displayReviews = () => {
    let result = [];
    console.log(
      "displayReviews, wine : ",
      wine,
      ", wine.reviews:",
      wine.reviews
    );
    wine.reviews.forEach((each) => {
      if (!each.isDeleted) {
        result.push(
          <Link to={`/wine/${wineID}/reviews/${each.reviewID}`}>
            <Review
              // toggleStatus={toggleStatus}
              review={each}
              status={status}
              id={each.reviewID}
              key={each.reviewID}
            ></Review>
          </Link>
        );
      }
    });
    return result;
    // return wine.reviews.map((each) => {
    //   if (each.userID !== Number(userID)) {
    //     return (
    // <Link to={`/wine/${wineID}/reviews/${each.reviewID}`}>
    //   <Review
    //     toggleStatus={toggleStatus}
    //     review={each}
    //     id={each.reviewID}
    //     key={each.reviewID}
    //   ></Review>
    // </Link>
    //     );
    //   }
    // });
  };

  // //shownReview : reviews shown through view more button clicks
  // const [shownReview, setShownReview] = useState([]);
  // //when page is initially loaded, load only designated number(numReviews) of reviews
  // useEffect(() => {
  //   setShownReview(wine.reviews.slice(0, numReviews));
  // }, []);
  // // whenever numReviews changes,
  // useEffect(() => {
  //   setShownReview(wine.reviews.slice(0, numReviews));
  // }, [numReviews]);

  const onClickMore = () => {
    // setPageNum(pageNum + 1);
    setNumReviews(numReviews + 3);
    // return wine.reviews.slice(0, numReviews).map((each) => {
    //   return (
    //     <Review
    //       review={each}
    //       status={status}
    //       id={each.reviewID}
    //       key={each.reviewID}
    //     />
    //   );
    // });
  };

  const onSubmit = async () => {
    const body = {
      userID: userID,
      content: newReview.content,
      rating: newReview.rating,
      tags: selectedTag,
    };
    console.log(body);
    if (existReview) {
      setLoading(true);
      await axios
        .put(`/api/wines/${wineID}/reviews/${reviewID}`, body)
        .then((res) => {
          console.log("response : ", JSON.stringify(res.data, null));
        })
        .catch((error) => {
          console.log("failed", error);
        });
      setLoading(false);
    } else {
      setLoading(true);
      await axios
        .post(`/api/wines/${wineID}/reviews`, body)
        .then((res) => {
          console.log("response : ", JSON.stringify(res.data, null));
        })
        .catch((error) => {
          console.log("failed", error);
        });
      setLoading(false);
    }
    // setStatus({
    //   ...status,
    //   userinfo: {
    //     ...status.userinfo,
    //     reviewedWine: reviewedWines.push(),
    //   },
    // });
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
                {loading ? (
                  <Loader />
                ) : (
                  <div className="detail__grapeTitle">{formatGrape()}</div>
                )}
                {loading ? (
                  <Loader />
                ) : (
                  <div className="detail__wineTags">{displayTags()}</div>
                )}
                <div className="detail__wineRate">
                  <StarIcon fontSize="40" /> {wine.rating.toFixed(1)}
                </div>
                <div className="detail__winePrice">{formatPrice()}</div>
                <hr className="detail__hr" />
                <div className="detail__abv">
                  <b>alcohol by volume (abv)</b> : {wine.abv}
                </div>
                <div className="detail__closure">
                  <b>closure type :</b> {wine.bottleClosure}
                </div>
                <div className="detail__foodpair">
                  <b>food pairings : </b>
                  {wine.foodPairings}
                </div>
                <br />
                <div className="detail__views">
                  <GrView /> {wine.views}
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
                />
                <div className="detail__wineCharName"> acidic</div>
              </div>
            </div>
          </div>

          <hr className="detail__line"></hr>

          <div className="detail__review">
            <div className="detail__reviewTitle"> Reviews </div>

            <div className="detail__oneReview">
              <div className="detail__reviewTitle">
                <div className="detail__reviewStar">
                  <Rating
                    size="large"
                    name="rating"
                    onChange={onChange}
                    readOnly={!editReview}
                    // value={existReview ? newReview.rating : 0}
                    sx={{ fontSize: 40 }}
                    emptyIcon={
                      <StarIcon
                        style={{ color: "var(--bg-20)" }}
                        sx={{ fontSize: 40 }}
                      />
                    }
                  />
                </div>
                <div
                  className="detail__reviewIcons"
                  name="like"
                  value={newReview.userLiked}
                >
                  <BsHeartFill
                    className={
                      newReview.userLiked
                        ? "detail__reviewIcon--active"
                        : "detail__reviewIcon--inactive"
                    }
                    onClick={() => {
                      toggleLikes();
                      onLikeClick(1);
                    }}
                    name="userLiked"
                    // onChange={onChange}
                    readOnly={!editReview}
                    value={existReview ? newReview.userLiked : 0}
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
                    {/* {displaySelectedTagsonReview()} */}
                    {displaySelectedTags()}
                  </div>
                )}
              </div>

              {editReview && (
                <>
                  <div className="detail__reviewAddtag">
                    <div className="detail__reviewTagcont">
                      <input
                        className="detail__reviewInput"
                        placeholder="add tags "
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      ></input>
                      <div
                        className="detail__reviewPlus"
                        onClick={clickAddIcon}
                      >
                        +
                      </div>
                    </div>
                    <div>
                      {displaySelectedTags()}
                      {displayUnselectedTags()}
                    </div>
                  </div>
                  <div className="detail__reviewContent">
                    <input
                      className="detail__reviewContentInput"
                      readOnly={editReview ? false : true}
                      // value={existReview ? newReview.content : ""}
                      placeholder="waiting for your review here :)"
                      name="content"
                      onChange={onChange}
                    ></input>
                  </div>
                </>
              )}

              {editReview && (
                <div
                  className="detail__reviewPost"
                  onClick={() => {
                    toggleEditReview();
                    onSubmit();
                  }}
                >
                  post a review
                </div>
              )}

              {/* <div></div> */}
            </div>
            <hr className="detail__hr" />
            {displayReviews()}
            <div className="detail__moreReview" onClick={onClickMore}>
              view more reviews
            </div>
          </div>
          <hr className="detail__line"></hr>
          <div className="detail__wineRecomm">
            <div className="detail__wineRecommTitle"> You may also like...</div>
            {displayRecommendation()}
          </div>
        </div>
      )}
    </>
  );
};

export default WineDetailPage;
