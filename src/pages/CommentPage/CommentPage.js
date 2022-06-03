import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Review from "../../components/Review/Review";
import Comment from "../../components/Comment/Comment";

import Loader from "../../components/Loader/Loader";

import "./CommentPage.css";

import { BsPlus, BsReplyFill } from "react-icons/bs";

const CommentPage = ({
  status,
  toggleStatus,
  //status data 자체는 app.js 에서 받아옴
}) => {
  //comment에 있는 userID 바탕으로 userInfo가져오기 (username, status, isDeleted?)

  //get reviewID, wineID from the path
  const { wineID, reviewID } = useParams();

  //get Review using reviewID
  const [review, setReview] = useState({});
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(true);

  const fetchReview = async (reviewID) => {
    try {
      setIsReviewLoading(true);
      const res = await axios.get(`/api/wines/${wineID}/reviews`);
      res.data.forEach((each) => {
        if (each.reviewID === Number(reviewID)) {
          setReview(each);
        }
      });
      console.log("fetchReview from commentpage : review data is  ", res.data);
      setIsReviewLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch matching review when first loading
  useEffect(() => {
    fetchReview(reviewID);
  }, []);

  // 유저가 지금 작성중인 comment - submit 하지 않은
  const [tempComment, setTempComment] = useState("");

  // 다른 사람들이 이미 작성한 comment
  const [comments, setComments] = useState([]);

  // comment 가져오기
  const fetchComments = async (reviewID, wineID) => {
    try {
      setIsCommentLoading(true);
      const res = await axios.get(
        `/api/wines/${wineID}/reviews/${reviewID}/comments`
      );
      // console.log("fetchComments : ", res.data);
      setComments(res.data);
      // console.log(comments);
      setIsCommentLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchComments(reviewID, wineID);
  }, []);

  useEffect(() => {
    fetchComments(reviewID, wineID);
  }, [comments]);

  const displayComments = (comments) => {
    if (comments.length === 0) return;
    return comments.map((each) => {
      return (
        <Comment
          status={status}
          wineID={wineID}
          reviewID={reviewID}
          key={each.commentID}
          comments={each}
        />
      );
    });
  };

  const onChange = (e) => {
    const { value } = e.target;
    setTempComment(value);
  };

  // const userID = status.userID;

  const onSubmit = async () => {
    const body = {
      userID: status.userID,
      content: tempComment,
    };
    console.log(body);
    if (status.userID) {
      await axios
        .post(`/api/wines/${wineID}/reviews/${reviewID}/comments`, body)
        .then((res) => {
          console.log("response (comment): ", JSON.stringify(res.data, null));
        })
        .catch((error) => {
          console.log("failed(comment): ", error);
        });
      setTempComment("");
      fetchComments(reviewID, wineID);
    }
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
          {isReviewLoading ? (
            <div className="commentPage__reviewContainer">
              <Review review={review} />
            </div>
          ) : (
            <Loader />
          )}

          <div className="commentPage__comments">
            {displayComments(comments)}
          </div>

          {status.userinfo.status !== -1 ? (
            <>
              <div className="commentPage__commentContainer">
                <div className="commentPage__button">
                  <input
                    className="commentPage__input"
                    placeholder="leave a comment"
                    onChange={onChange}
                    value={tempComment === "" ? "" : tempComment}
                  ></input>
                </div>
                <BsPlus className="commentPage__plusIcon" onClick={onSubmit} />
              </div>
              {/* <div className="commentPage__commentContainer"></div> */}
            </>
          ) : (
            <div
              className="commentPage__loginWarning"
              onClick={() => toggleStatus("sideBarModal")}
            >
              click here to login and leave comments
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentPage;
