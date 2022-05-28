import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Review from "../../components/Review/Review";
import Tag from "../../components/Tag/Tag";
import Comment from "../../components/Comment/Comment";

import "./CommentPage.css";

import { BsPlus, BsReplyFill } from "react-icons/bs";

// const commentDummyData = {
//   0: {
//     commentID: 0,
//     userID: 1,
//     content: "great review!",
//     createdAt: "2018.02.28",
//     lastUpdatedAt: "2019.04.17",
//     isDeleted: false,
//   },
//   1: {
//     commentID: 1,
//     userID: 2,
//     content: "i totally agree with you",
//     createdAt: "2019.02.12",
//     lastUpdatedAt: "2019.02.12",
//     isDeleted: false,
//   },
//   2: {
//     commentID: 2,
//     userID: 1,
//     content: "thank you for consent!",
//     createdAt: "2019.02.14",
//     lastUpdatedAt: "2019.02.16",
//     isDeleted: true,
//   },
// };

const CommentPage = ({
  status,
  //status data 자체는 app.js 에서 받아옴
}) => {
  //comment에 있는 userID 바탕으로 userInfo가져오기 (username, status, isDeleted?)

  //get reviewID, wineID from the path
  const { wineID, reviewID } = useParams();

  //get Review using reviewID
  const [review, setReview] = useState({});

  const fetchReview = async (reviewID) => {
    try {
      const res = await axios.get(`/api/wines/${wineID}/reviews`);
      console.log("fetchreview.res : ", res.data);
      res.data.forEach((each) => {
        // console.log(
        //   "each.reviewID : ",
        //   each.reviewID,
        //   "type : ",
        //   typeof each.reviewID
        // );
        // console.log("reviewID:", reviewID, "type : ", typeof reviewID);
        // console.log("");
        if (Number(each.reviewID) === Number(reviewID)) {
          setReview(each);
        }
      });
      console.log("review after fetch: ", review);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch matching review when first loading
  useEffect(() => {
    fetchReview(reviewID);
    console.log("useEFFEct fetchReview : ", review);
  }, []);

  // 유저가 지금 작성중인 comment - submit 하지 않은
  const [tempComment, setTempComment] = useState("");

  // 다른 사람들이 이미 작성한 comment
  const [comments, setComments] = useState([]);

  // comment 가져오기
  const fetchComments = async (reviewID, wineID) => {
    try {
      const res = await axios.get(
        `/api/wines/${wineID}/reviews/${reviewID}/comments`
      );
      // console.log("fetchComments : ", res.data);
      setComments(res.data);
      // console.log(comments);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchComments(reviewID, wineID);
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

  const userID = status.userID;

  const onSubmit = async () => {
    // console.log(userID);
    // why null man
    const body = {
      userID: userID,
      content: { tempComment },
    };
    console.log(body);
    await axios
      .post(`/api/wines/${wineID}/reviews/${reviewID}/comments`, body)
      .then((res) => {
        console.log("response (comment): ", JSON.stringify(res, null));
      })
      .catch((error) => {
        console.log("failed(comment): ", error);
      });
    setTempComment("");
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="commentPage">
        <div className="commentPage__container">
          <div className="commentPage__header">
            <div className="commentPage__headerTitle">Comment</div>
            <BsReplyFill
              className="commentPage__close"
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="commentPage__reviewContainer">
            <Review review={review} />
          </div>
          <div>{displayComments(comments)}</div>
          <div className="commentPage__commentContainer">
            <div className="commentPage__button">
              <input
                className="commentPage__input"
                placeholder="leave a comment"
                onChange={onChange}
                value={tempComment === "" ? "" : tempComment}
                // onClick={() => {
                //   if (status.userInfo.status) {
                //   }
                // }}
              ></input>
            </div>
            <BsPlus className="commentPage__plusIcon" onClick={onSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentPage;
