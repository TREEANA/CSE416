import React, { useState, useEffect } from "react";
import "./CommentModal.css";

import Review from "../../components/Review/Review";
import Wine from "../../components/Wine/Wine";
import WineList from "../../components/WineList/WineList";
import Tag from "../../components/Tag/Tag";

import {
  BsHeart,
  BsFillPencilFill,
  BsHeartFill,
  BsStar,
  BsPlus,
  BsPatchCheckFill,
  BsStarFill,
  BsReplyFill,
} from "react-icons/bs";

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

const CommentModal = ({
  commentModalStatus,
  togglecommentModal,
  commentData = commentDummyData,
  status,
}) => {
  //comment에 있는 userID 바탕으로 userInfo가져오기 (username, status, isDeleted?)

  const [tempComment, setTempComment] = useState();

  const onChange = (e) => {
    const { value } = e.target;
    setTempComment(value);
  };

  // const handleKeyPress = (e) =>{
  //   if(e.key === 'Enter'){
  //     this.handleClick();
  //   }
  // }

  const getComments = (arr) => {
    return arr
      .slice()
      .reverse()
      .map((each) => {
        return <Comment status={status} />;
      });
  };

  return (
    <>
      <div className={commentModalStatus ? "comment" : "comment--inactive"}>
        <div className="comment__container">
          <div className="comment__header">
            <div className="comment__headerTitle">Comment</div>
            <BsReplyFill
              className="comment__close"
              onClick={togglecommentModal}
            />
          </div>
          <div className="comment__reviewContainer">
            <Review userstatus={1} />
          </div>
          {/* <div>{getComments()}</div> */}
          <div className="comment__tagContainer">
            <div className="comment__tagButton">
              <input
                className="comment__tagInput"
                placeholder="leave a comment"
                onChange={onChange}
              ></input>
            </div>
            <BsPlus className="comment__plusIcon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentModal;
