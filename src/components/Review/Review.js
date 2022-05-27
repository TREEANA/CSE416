import React, { useState, useEffect } from "react";

import "./Review.css";
import Tag from "../../components/Tag/Tag";

import { BsFillStarFill, BsPatchCheckFill } from "react-icons/bs";
import { MdWineBar, MdSettings } from "react-icons/md";

const dummyReview = {
  reviewID: 1,
  wineID: 1,
  userID: 1,
  content: "I love this wine, but it is more expensive than I thought",
  rating: 4.5,
  createdAt: "2022-04-04 18:11:12",
  lastUpdatedAt: "2022-04-04 18:11:12",
  comments: [],
  tags: ["red", "sweet"],
  isDeleted: false,
  userstatus: 1,
  username: "Woohyung Lee",
  imageurl:
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
};

const Review = ({ review = dummyReview }) => {
  // const getTags = (tags) => {
  //   const tagsResult = [];
  //   for (let i = 0; i < tags.length; i++) {
  //     tagsResult.push(<div className="review__ind-tag"> {tags[i]}</div>);
  //   }
  //   return tagsResult;
  // };

  const tags = review.tags;
  const displaySelectedTags = (tags) => {
    return tags.map((each) => {
      return <Tag type="wineButton" txt={each} />;
    });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    // console.log(date, year, month, day);
    // console.log("dummyReview date: ", dummyReview.createdAt);
    return `${year}.${month}.${day}`;
  };

  // const [date, setDate] = useState("");
  // useEffect(() => {
  //   setDate(formatDate(new Date(review.lastUpdatedAt)));
  // }, []);

  return (
    <>
      <div
        // className={review.userstatus == 1 ? "review--somm" : "review"}
        className={review.userID == 1 ? "review--somm" : "review"}
        // onClick={() => toggleStatus("commentModal")}
      >
        <div className="review__title">
          <div className="review__user">
            <div className="review__user-image">
              <img src={review.imageurl} />
            </div>
            {/* <img className = "review__user-image" src = "https://mymodernmet.com/wp/wp-content/uploads/2020/08/sommelier-shutterstock-1.jpg"> </img> */}
            <div className="review__user-info">
              <div className="review__user-name">{review.username}</div>
              <div className="review__user-date">
                {formatDate(new Date(review.createdAt))}
                {/* {date} */}
              </div>
            </div>
            <div className="review__user-icon">
              {review.userID == 1 ? <MdWineBar /> : <div></div>}
              {/* {review.userstatus == 1 ? <MdWineBar /> : <div></div>} */}
            </div>
          </div>
          <div
            className={
              review.userID == 1
                ? // review.userstatus == 1
                  "review__user-rate--somm"
                : "review__user-rate"
            }
          >
            <BsFillStarFill />
            {review.rating}
          </div>
        </div>
        {/* <div className="review__tag">{getTags(review.tags)}</div> */}
        {/* <div className="review__tag">{displaySelectedTags(tags)}</div> */}
        <div className="review__content"> {review.content} </div>
      </div>
    </>
  );
};

export default Review;
