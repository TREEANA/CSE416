import React, { useState, useEffect } from "react";

import "./Review.css";
import Tag from "../../components/Tag/Tag";

import { BsFillStarFill, BsPatchCheckFill } from "react-icons/bs";
import { MdWineBar, MdSettings } from "react-icons/md";

const dummyReview = {
  wineID: 17,
  reviewID: 234,
  userID: 36,
  username: "testUser1",
  profileImage:
    "https://oneego-image-storage.s3.ap-northeast-2.amazonaws.com/Archive/duck/duck_1.jpg",
  status: 0,
  rating: 4,
  content: "This is good wine by user36",
  isDeleted: false,
  createdAt: "2022-05-06 22:41:45",
  lastUpdatedAt: "2022-05-06 22:41:45",
  tags: [],
  comments: [],
};

const Review = ({ review = dummyReview }) => {
  const tags = review.tags;

  const getTags = (tags) => {
    const tagsResult = [];
    for (let i = 0; i < tags.length; i++) {
      tagsResult.push(
        <Tag type="wineButton" key={i} isFilled="false" txt={tags[i]} />
      );
    }
    return tagsResult;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <>
      <div className={review.status == 1 ? "review--somm" : "review"}>
        <div className="review__title">
          <div className="review__user">
            <div className="review__userImage">
              <img src={review.profileImage} />
            </div>
            <div className="review__userInfo">
              <div className="review__userName">{review.username}</div>
              <div className="review__userDate">
                {formatDate(new Date(review.lastUpdatedAt))}
              </div>
            </div>
            <div className="review__userIcon">
              {review.status == 1 ? <MdWineBar /> : <div></div>}
            </div>
          </div>
          <div
            className={
              review.status == 1 ? "review__userRate--somm" : "review__userRate"
            }
          >
            <BsFillStarFill />
            {review.rating}
          </div>
        </div>
        {/* <div className="review__tag">{displaySelectedTags(tags)}</div> */}
        <div className="review__tag">{getTags(tags)}</div>
        <div className="review__content"> {review.content} </div>
      </div>
    </>
  );
};

export default Review;
