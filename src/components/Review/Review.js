import React, { useState } from "react";
import "./Review.css";
import { BsFillStarFill, BsPatchCheckFill } from "react-icons/bs";
import { MdWineBar, MdSettings } from "react-icons/md";

const dumyReviewdata = {
  reviewID: 1,
  name: "Woohyung Lee",
  // 리뷰하는 사람의 이름, 리뷰하는 사람의 유저의 등급 (userstat필요 ),리뷰하는 사람의 이미지를 얻는다
  wineID: 1,
  userID: 1,
  content: "I love this wine, but it is more expensive than I thought",
  rating: 4.5,
  createdAt: "2022-04-04 18:11:12",
  lastUpdatedAt: "2022-04-04 18:11:12",
  comments: [],
  tags: ["red", "sweet"],
  isDeleted: false,
};
const getTags = (tags) => {
  const tagsResult = [];

  for (let i = 0; i < tags.length; i++) {
    tagsResult.push(<div className="review__ind-tag"> {tags[i]}</div>);
  }

  return tagsResult;
};

const Review = ({ userstatus }) => {
  // userstatus = 1;
  return (
    <>
      <div className={userstatus == 1 ? "review--somm" : "review"}>
        <div className="review__title">
          <div className="review__user">
            <div className="review__user-image">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
            </div>
            {/* <img className = "review__user-image" src = "https://mymodernmet.com/wp/wp-content/uploads/2020/08/sommelier-shutterstock-1.jpg"> </img> */}
            <div className="review__user-info">
              <div className="review__user-name">{dumyReviewdata.name}</div>
              <div className="review__user-date">
                {" "}
                {dumyReviewdata.createdAt}{" "}
              </div>
            </div>
            <div className="review__user-icon">
              {" "}
              {userstatus == 1 ? <MdWineBar /> : <div></div>}{" "}
            </div>
          </div>
          <div
            className={
              userstatus == 1 ? "review__user-rate--somm" : "review__user-rate"
            }
          >
            {" "}
            <BsFillStarFill />
            {dumyReviewdata.rating}{" "}
          </div>
        </div>

        <div className="review__tag">{getTags(dumyReviewdata.tags)}</div>
        <div className="review__content"> {dumyReviewdata.content} </div>
      </div>
    </>
  );
};

export default Review;
