import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { set } from "lodash";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import FollowingModal from "../../modals/FollowingModal/FollowingModal";
import FollowsModal from "../../modals/FollowsModal/FollowsModal";

const ProfilePage = ({ status, toggleStatus, setStatus }) => {
  const dummpyReviewdata = [];
  const [reviewWineList, setreviewWineList] = useState([]);
  const [likesList, setlikesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userID } = useParams();
  const [isFollowd, setFollowd] = useState(false);
  const [userClick, setuserClick] = useState("likes");
  // winelist, wine, review
  const [userData, setUserData] = useState({
    followers: [],
    followings: [],
    likedWinelists: [],
    likedWines: [],
    profileImage: "",
    status: -1,
    tags: [],
    userID: -1,
    username: "",
  });

  const follow = async (id, followOption) => {
    try {
      const res = await axios.post(
        `/api/users/${status.userID}/follow?targetUserID=${id}&followOption=${followOption}`
      );
      if (res.status === 200) {
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserdata();
  }, [userID, status.filterApplyClicked, isFollowd]);

  useEffect(() => {
    checkfollow();
  }, [userID]);

  const displaylikes = () => {
    console.log("보자", likesList);
    const result = [];
    for (let i = 0; i < likesList.length; i = i + 3) {
      if (i === likesList.length - 1) {
        result.push(
          <div className="gallery__cont">
            <div className="gallery__imageCont">
              <Link to={`/${likesList[i].iswinelist}/${likesList[i].id}`}>
                <img
                  className={
                    likesList[i].iswinelist === "list"
                      ? "gallery__wine__image"
                      : "gallery__image"
                  }
                  src={likesList[i].image}
                ></img>
              </Link>
            </div>
          </div>
        );
      } else if (i === likesList.length - 2) {
        result.push(
          <div className="gallery__cont">
            <div className="gallery__imageCont">
              <Link to={`/${likesList[i].iswinelist}/${likesList[i].id}`}>
                <img
                  className={
                    likesList[i].iswinelist === "list"
                      ? "gallery__wine__image"
                      : "gallery__image"
                  }
                  src={likesList[i].image}
                ></img>
              </Link>
            </div>
            <div className="gallery__imageCont">
              <Link
                to={`/${likesList[i + 1].iswinelist}/${likesList[i + 1].id}`}
              >
                <img
                  className={
                    likesList[i + 1].iswinelist === "list"
                      ? "gallery__wine__image"
                      : "gallery__image"
                  }
                  src={likesList[i + 1].image}
                ></img>
              </Link>
            </div>
          </div>
        );
      } else {
        result.push(
          <div className="gallery__cont">
            <div className="gallery__imageCont">
              <Link to={`/${likesList[i].iswinelist}/${likesList[i].id}`}>
                <img
                  className={
                    likesList[i].iswinelist === "list"
                      ? "gallery__wine__image"
                      : "gallery__image"
                  }
                  src={likesList[i].image}
                ></img>
              </Link>
            </div>
            <div className="gallery__imageCont">
              <Link
                to={`/${likesList[i + 1].iswinelist}/${likesList[i + 1].id}`}
              >
                <img
                  className={
                    likesList[i + 1].iswinelist === "list"
                      ? "gallery__wine__image"
                      : "gallery__image"
                  }
                  src={likesList[i + 1].image}
                ></img>
              </Link>
            </div>
            <div className="gallery__imageCont">
              <Link
                to={`/${likesList[i + 2].iswinelist}/${likesList[i + 2].id}`}
              >
                <img
                  className={
                    likesList[i + 2].iswinelist === "list"
                      ? "gallery__wine__image"
                      : "gallery__image"
                  }
                  src={likesList[i + 2].image}
                ></img>
              </Link>
            </div>
          </div>
        );
      }
    }

    return result;
  };

  const displayWines = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length; i = i + 3) {
      if (i === arr.length - 1) {
        result.push(
          <div className="gallery__cont">
            <div className="gallery__imageCont">
              <Link to={`/wine/${arr[i].wineID}`}>
                <img className="gallery__image" src={arr[i].images[0]}></img>
              </Link>
            </div>
          </div>
        );
      } else if (i === arr.length - 2) {
        result.push(
          <div className="gallery__cont">
            <div className="gallery__imageCont">
              <Link to={`/wine/${arr[i].wineID}`}>
                <img className="gallery__image" src={arr[i].images[0]}></img>
              </Link>
            </div>
            <div className="gallery__imageCont">
              <Link to={`/wine/${arr[i + 1].wineID}`}>
                <img
                  className="gallery__image"
                  src={arr[i + 1].images[0]}
                ></img>
              </Link>
            </div>
          </div>
        );
      } else {
        result.push(
          <div className="gallery__cont">
            <div className="gallery__imageCont">
              <Link to={`/wine/${arr[i].wineID}`}>
                <img className="gallery__image" src={arr[i].images[0]}></img>
              </Link>
            </div>
            <div className="gallery__imageCont">
              <Link to={`/wine/${arr[i + 1].wineID}`}>
                <img
                  className="gallery__image"
                  src={arr[i + 1].images[0]}
                ></img>
              </Link>
            </div>
            <div className="gallery__imageCont">
              <Link to={`/wine/${arr[i + 2].wineID}`}>
                <img
                  className="gallery__image"
                  src={arr[i + 2].images[0]}
                ></img>
              </Link>
            </div>
          </div>
        );
      }
    }

    return result;
  };

  const getUserdata = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/users/${userID}?requesterID=${userID}`);

      setUserData({
        ...userData,
        userID: res.data.userID,
        username: res.data.username,
        profileImage: res.data.profileImage,
        status: res.data.status,
        likedWines: res.data.likedWines,
        likedWinelists: res.data.likedWinelists,
        tags: res.data.tags,
        followings: res.data.followings,
        followers: res.data.followers,
      });

      let newlikeslist = [];
      const likedwinelists = await axios.get(
        `/api/users/${userID}/liked-winelists`
      );
      const newlikeswinelists = likedwinelists.data;

      for (let i = 0; i < newlikeswinelists.length; i++) {
        const each = newlikeswinelists[i];
        const likesWineitem = {
          iswinelist: "list",
          id: each.winelistID,
          image: each.thumbnailImage,
          lastUpdatedAt: each.lastUpdatedAt,
        };
        newlikeslist.push(likesWineitem);
      }

      const likedwines = await axios.get(`/api/users/${userID}/liked-wines`);
      const newlikedWines = likedwines.data;

      for (let i = 0; i < newlikedWines.length; i++) {
        const each = newlikedWines[i];
        const likesWinesitem = {
          iswinelist: "wine",
          id: each.wineID,
          image: each.images[0],
          lastUpdatedAt: each.lastUpdatedAt,
        };
        newlikeslist.push(likesWinesitem);
      }
      console.log("안녕", newlikeslist);

      newlikeslist.sort((a, b) => {
        if (a.lastUpdatedAt < b.lastUpdatedAt) {
          return 1;
        } else if (a.lastUpdatedAt > b.lastUpdatedAt) {
          return -1;
        } else {
          return 0;
        }
      });
      setlikesList(newlikeslist);

      const res2 = await axios.get(`/api/users/${userID}/reviewed-wines`);
      setLoading(false);
      setreviewWineList(res2.data);
    } catch (e) {
      console.log(e);
    }
  };

  const checkfollow = async () => {
    if (status.userID !== Number(userID)) {
      const res = await axios.get(
        `/api/users/${status.userID}?requesterID=${status.userID}`
      );

      let check = false;
      for (let i = 0; i < res.data.followings.length; i++) {
        const each = res.data.followings[i];
        if (each === Number(userID)) {
          check = true;
        }
      }
      setFollowd(check);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <FollowingModal
            status={status}
            setStatus={setStatus}
            userID={Number(userData.userID)}
            username={userData.username}
          ></FollowingModal>
          <FollowsModal
            status={status}
            setStatus={setStatus}
            userID={Number(userData.userID)}
            username={userData.username}
          ></FollowsModal>
          <div className="profile">
            <div className="profile__name"> {userData.username}</div>

            <div className="profile_table">
              <img className="profile__image" src={userData.profileImage}></img>
              <div className="profile_table_stats">
                <div className="profile_table_stats_number">
                  {" "}
                  {likesList.length}{" "}
                </div>
                <div className="profile_table_stats_title">likes </div>
              </div>
              <div className="profile_table_stats">
                {" "}
                <div className="profile_table_stats_number">
                  {reviewWineList.length}{" "}
                </div>
                <div className="profile_table_stats_title">reviews </div>
              </div>
              <div
                className="profile_table_stats"
                onClick={() => {
                  setStatus({
                    ...status,
                    followsModal: !status.followsModal,
                  });
                }}
              >
                {" "}
                <div className="profile_table_stats_number">
                  {userData.followers.length}{" "}
                </div>
                <div className="profile_table_stats_title">followers </div>
              </div>
              <div
                className="profile_table_stats"
                onClick={() => {
                  setStatus({
                    ...status,

                    followingModal: !status.followingModal,
                  });
                }}
              >
                {" "}
                <div className="profile_table_stats_number">
                  {userData.followings.length}{" "}
                </div>
                <div className="profile_table_stats_title">follows </div>
              </div>
            </div>
            {/* 
            <div className="proflie__proflie">

              <img className="profile__image" src={userData.profileImage}></img>
              <div className="profile__stats">
                <ul>
                  <li>
                    <span className="profile__stats__count">
                      {likesList.length}
                    </span>
                    likes
                  </li>
                  <li>
                    <span className="profile__stats__count">
                      {reviewWineList.length}
                    </span>
                    reviews
                  </li>
                  <li>
                    <span
                      className="profile__stats__count"
                      onClick={() => {
                        setStatus({
                          ...status,
                          followsModal: !status.followsModal,
                        });
                      }}
                    >
                      {userData.followers.length}
                    </span>{" "}
                    followers
                  </li>
                  <li>
                    <span
                      className="profile__stats__count"
                      onClick={() => {
                        setStatus({
                          ...status,

                          followingModal: !status.followingModal,
                        });
                      }}
                    >
                      {userData.followings.length}
                    </span>{" "}
                    follows
                  </li>
                </ul>
              </div>
            </div> */}

            {Number(status.userID) === Number(userID) ? (
              <div
                className="profile__editporfile"
                onClick={() => {
                  toggleStatus("editProfileModal");
                }}
              >
                Edit Profile
              </div>
            ) : (
              <div
                className={
                  isFollowd
                    ? "profile__editporfile_unfilled "
                    : "profile__editporfile"
                }
                onClick={() => {
                  follow(Number(userID), "following"), setFollowd(!isFollowd);
                }}
              >
                {isFollowd ? "following" : "follow"}
              </div>
            )}

            <div className="profile__listcontainer">
              {userClick !== "review" ? (
                <>
                  {" "}
                  <div className="profile__selected">like</div>
                  <div
                    className="profile__unselected"
                    onClick={() => {
                      setuserClick("review");
                    }}
                  >
                    review
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div
                    className="profile__unselected"
                    onClick={() => {
                      setuserClick("likes");
                    }}
                  >
                    like
                  </div>
                  <div className="profile__selected">review</div>
                </>
              )}
            </div>
            <div className="profile__list">
              <div className="gallery">
                {userClick === "likes"
                  ? displaylikes()
                  : displayWines(reviewWineList)}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePage;
