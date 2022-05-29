import Loader from "../../components/Loader/Loader";
import { BsXLg } from "react-icons/bs";
import axios, { CancelToken } from "axios";
import { MdWineBar } from "react-icons/md";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
const FollowsModal = ({ status, setStatus, userID, username }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    console.log(userID);
    setLoading(true);
    const res = await axios.get(`/api/users/${userID}/followers`);
    setLoading(false);
    const newfollowers = res.data.followers;
    const newfollowerslist = [];
    for (let i = 0; i < newfollowers.length; i++) {
      const item = {
        userID: newfollowers[i].userID,
        username: newfollowers[i].username,
        profileImage: newfollowers[i].profileImage,
        status: newfollowers[i].status,
        isFollows: true,
      };
      newfollowerslist.push(item);
    }
    setFollowers(newfollowerslist);
  };

  const displayfollowers = () => {
    const result = [];
    for (let i = 0; i < followers.length; i++) {
      const each = followers[i];
      result.push(
        <div className="search__profile__container">
          <Link to={`/profile/${each.userID}`}>
            <div
              className="search__profile"
              onClick={() => {
                setStatus({
                  ...status,
                  followsModal: !status.followsModal,
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
              each.isFollows
                ? "search__button search__button"
                : "search__button--filled"
            }
          >
            {each.isFollows ? "following" : "follow"}
          </div>
        </div>
      );
    }

    return result;
  };
  useEffect(() => {
    fetchData();
  }, [status.followsModal]);

  return (
    <>
      <div
        className={
          status.followsModal ? "becomesommlier" : "becomesommlier--inactive"
        }
      >
        <div className="becomesommlier__container">
          <div className="becomesommlier__header">
            <div className="becomesommlier__header__title">
              {username}'s Followers
            </div>
            <BsXLg
              className="becomesommlier__top-close"
              onClick={() => {
                setStatus({
                  ...status,
                  followsModal: !status.followsModal,
                });
              }}
            />
          </div>
          <div className="becomesommlier_body">
            {loading ? <Loader /> : <>{displayfollowers()}</>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowsModal;
