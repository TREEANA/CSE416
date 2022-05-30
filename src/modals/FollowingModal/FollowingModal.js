import Loader from "../../components/Loader/Loader";
import { BsXLg } from "react-icons/bs";
import axios, { CancelToken } from "axios";
import { MdWineBar } from "react-icons/md";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "./FollowingModal.css";
const FollowingModal = ({ status, setStatus, userID, username }) => {
  const [followering, setFollowering] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (userID) {
      console.log(userID);
      setLoading(true);
      const res = await axios.get(`/api/users/${userID}/followings`);
      setLoading(false);
      const newfollowings = res.data.followings;
      const newfollowingslist = [];

      for (let i = 0; i < newfollowings.length; i++) {
        const item = {
          userID: newfollowings[i].userID,
          username: newfollowings[i].username,
          profileImage: newfollowings[i].profileImage,
          status: newfollowings[i].status,
          isFollowing: true,
        };
        newfollowingslist.push(item);
      }

      setFollowering(newfollowingslist);
    }
  };

  const displayfollowings = () => {
    const result = [];
    for (let i = 0; i < followering.length; i++) {
      const each = followering[i];
      result.push(
        <div className="search__profile__container">
          <Link to={`/profile/${each.userID}`}>
            <div
              className="search__profile"
              onClick={() => {
                setStatus({
                  ...status,
                  followingModal: !status.followingModal,
                });
              }}
            >
              <div className="search__image">
                <img className="search__image" src={each.profileImage} />
              </div>
              <div className="search__name" id={each.userID}>
                {each.username}
              </div>
              {each.status === 1 && <MdWineBar />}
            </div>
          </Link>

          <div
            className={
              each.isFollowing
                ? "search__button search__button"
                : "search__button--filled"
            }
          >
            {each.isFollowing ? "following" : "follow"}
          </div>
        </div>
      );
    }

    return result;
  };

  useEffect(() => {
    fetchData();
  }, [status.followingModal]);

  return (
    <>
      <div
        className={
          status.followingModal ? "becomesommlier" : "becomesommlier--inactive"
        }
      >
        <div className="becomesommlier__container">
          <div className="becomesommlier__header">
            <div className="becomesommlier__header__title">
              {username}'s Followings
            </div>
            <BsXLg
              className="becomesommlier__top-close"
              onClick={() => {
                setStatus({
                  ...status,
                  followingModal: !status.followingModal,
                });
              }}
            />
          </div>
          <div className="becomesommlier_body">
            {loading ? <Loader /> : <>{displayfollowings()}</>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingModal;
