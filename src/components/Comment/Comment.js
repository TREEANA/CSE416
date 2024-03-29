import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Comment.css";
import { BsPatchCheckFill, BsTrash } from "react-icons/bs";
import axios from "axios";
import { set } from "lodash";

const dummyComment = {
  commentID: 1087,
  userID: 50,
  content:
    "Thank you for the helpful review35. This wine is great with picnic and also festival",
  createdAt: "2022-05-06 22:41:24",
  lastUpdatedAt: "2022-05-06 22:41:24",
  isDeleted: false,
};

const Comment = ({ status, wineID, reviewID, comments = dummyComment }) => {
  const [date, setDate] = useState("");

  //주어진 포맷에 맞게 date 값 바꾸기
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hr = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    return `${year}.${month}.${day} ${hr}:${min}`;
  };

  useEffect(() => {
    setDate(formatDateTime(new Date(comments.lastUpdatedAt)));
  }, []);

  //username fetch 해오는 과정
  const [username, setUsername] = useState("");
  const [userStatus, setUserStatus] = useState(0);

  const fetchUserData = async (userID) => {
    try {
      const res = await axios.get(`/api/users/${userID}`);
      setUsername(res.data.username);
      setUserStatus(res.data.status);
      // console.log("username: ", res.data.username);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserData(comments.userID);
    console.log(
      "comment info, commentID: ",
      comments.commentID,
      " , userID: ",
      comments.userID,
      typeof comments.userID,
      ", status.userID: ",
      status.userID,
      typeof status.userID,
      ", wineID:",
      wineID,
      " , reviewID: ",
      reviewID
    );
  }, []);

  const onDelete = async () => {
    try {
      const res = await axios.delete(
        `/api/wines/${wineID}/reviews/${reviewID}/comments/${comments.commentID}?userID=${status.userID}`
      );
      console.log("onDelete on Comments.js:", res.data);
      console.log(
        "onDelete request on : ",
        `/api/wines/${wineID}/reviews/${reviewID}/comments/${comments.commentID}?userID=${status.userID}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment">
      <div className="comment__user">
        <div className="comment__userInfo">
          <div
            className={
              userStatus === 1 ? "comment__userName-somm" : "comment__userName"
            }
          >
            {username}
          </div>
          <div className="comment__userDate">{date}</div>
        </div>
        {userStatus === 1 && (
          <div className="comment__userIcon">
            <BsPatchCheckFill />
          </div>
        )}
      </div>
      <div className="comment__content">
        <div className="comment__comment">{comments.content}</div>
        {Number(status.userID) === comments.userID ? (
          <div className="comment__trash" onClick={onDelete}>
            <BsTrash />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Comment;
