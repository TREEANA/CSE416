import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Review from "../../components/Review/Review";
import Wine from "../../components/Wine/Wine";
import WineList from "../../components/WineList/WineList";
import Tag from "../../components/Tag/Tag";
import Comment from "../../components/Comment/Comment";

import "./CommentPage.css";

import { BsPlus, BsPatchCheckFill, BsReplyFill } from "react-icons/bs";

const commentDummyData = {
  0: {
    commentID: 0,
    userID: 1,
    content: "great review!",
    createdAt: "2018.02.28",
    lastUpdatedAt: "2019.04.17",
    isDeleted: false,
  },
  1: {
    commentID: 1,
    userID: 2,
    content: "i totally agree with you",
    createdAt: "2019.02.12",
    lastUpdatedAt: "2019.02.12",
    isDeleted: false,
  },
  2: {
    commentID: 2,
    userID: 1,
    content: "thank you for consent!",
    createdAt: "2019.02.14",
    lastUpdatedAt: "2019.02.16",
    isDeleted: true,
  },
};

const userDummyData = {
  0: {
    userID: 0,
    username: "Mark Alvert",
    email: "hyerin.choi.1@stonybrook.edu",
    profileImage: "",
    phone: "010-4915-2178",
    gender: "Male",
    status: 2,
  },
  1: {
    userID: 1,
    username: "Hyerin Choit",
    email: "hyerin.choi.1@stonybrook.edu",
    profileImage: "",
    phone: "010-2056-6216",
    gender: "Male",
    status: 1,
  },
};

const CommentPage = ({
  togglecommentModal,
  // commentData = commentDummyData,
  status,
}) => {
  //comment에 있는 userID 바탕으로 userInfo가져오기 (username, status, isDeleted?)

  //get reviewID
  const { wineID, reviewID } = useParams();

  // 유저가 지금 작성중인 comment - submit 하지 않은
  const [tempComment, setTempComment] = useState({});

  // 다른 사람들이 이미 작성한 comment
  const [comments, setComments] = useState({});

  // comment 가져오기
  const fetchComments = async (reviewID, wineID) => {
    try {
      const res = await axios.get(
        `/api/wines/${wineID}/reviews/${reviewID}/comments`
      );
      console.log("fetchComments : ", res.data);
      setComments(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchComments(reviewID);
  }, []);

  const displayComments = (comments) => {
    return comments.map((each) => {
      return <Comment status={status} key={each.id} comments={each} />;
    });
  };

  const onChange = (e) => {
    const { value } = e.target;
    setTempComment(value);
  };

  return (
    <>
      <div className="commentPage">
        <div className="commentPage__container">
          <div className="commentPage__header">
            <div className="commentPage__headerTitle">Comment</div>
            <BsReplyFill
              className="commentPage__close"
              onClick={togglecommentModal}
            />
          </div>
          <div className="commentPage__reviewContainer">
            <Review userstatus={1} />
          </div>
          {/* <div>{displayComments(comments)}</div> */}
          <Comment status={0} />
          <Comment status={1} />
          <div className="commentPage__commentContainer">
            <div className="commentPage__button">
              <input
                className="commentPage__input"
                placeholder="leave a comment"
                onChange={onChange}
              ></input>
            </div>
            <BsPlus className="commentPage__plusIcon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentPage;
