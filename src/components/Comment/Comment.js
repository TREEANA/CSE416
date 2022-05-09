import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Comment.css";
import { BsPatchCheckFill } from "react-icons/bs";
import axios from "axios";
import { set } from "lodash";
const dummyComment = {
  commentID: 1087,
  userID: 35,
  content: "Thank you for the helpful review35",
  createdAt: "2022-05-06 22:41:24",
  lastUpdatedAt: "2022-05-06 22:41:24",
  isDeleted: false,
};
const Comment = ({ status, comments = dummyComment }) => {
  const [commentInfo, setCommentInfo] = useState({});
  useEffect(() => {
    setCommentInfo(...comments);
  }, []);
  const [date, setDate] = useState(new Date(commentInfo.lastUpdatedAt));

  //get comment lists
  const [comment, setComment] = useState({});
  //comment 가져오기
  const fetchComments = async (reviewID) => {
    try {
      const res = await axios.get(`api/wines/${wineID}`);
      setComment(res.data.comments);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchComments(reviewID);
  }, []);

  //get reviewID
  const { reviewID } = useParams();

  //주어진 포맷에 맞게 date 값 바꾸기
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
    // return `${month}.${day}`;
  };
  //   useEffect(() => {
  //     setDate(formatDate(new Date(commentInfo.lastUpdatedAt)));
  //   }, []);

  //get
  return (
    <div className="comment__commentContainer">
      <div className="comment__user">
        <div className="comment__userInfo">
          <div className="comment__userName">Marc Almert</div>
          <div className="comment__userDate">{formatDate(date)}</div>
        </div>
        {/* {status.user === 1 && ( */}
        <div className="comment__userIcon">
          <BsPatchCheckFill />
        </div>
        {/* )} */}
      </div>
      <div className="comment__comment">{commentInfo.content}</div>
    </div>
  );
};

export default Comment;
