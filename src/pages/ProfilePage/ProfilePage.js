import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { set } from "lodash";
import { Link } from "react-router-dom";
const ProfilePage = ({ status, toggleStatus }) => {
  const dummpyReviewdata = [];
  const [reviewWineList, setreviewWineList] = useState([]);
  const [likesList, setlikesList] = useState([]);

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

  useEffect(
    () => {
      getUserdata();
    },
    [userID],
    [status]
  );

  useEffect(() => {
    checkfollow();
  }, [userID]);

  const displaylikes = () => {
    const result = [];
    for (let i = 0; i < likesList.length; i = i + 3) {
      if (i === likesList.length - 1) {
        result.push(
          <div className="gallery__cont">
            <div className="gallery__imageCont">
              <Link to={`/${likesList[i].iswinelist}/${likesList[i].id}`}>
                <img className="gallery__image" src={likesList[i].image}></img>
              </Link>
            </div>
          </div>
        );
      } else if (i === likesList.length - 2) {
        result.push(
          <div className="gallery__cont">
            <div className="gallery__imageCont">
              <Link to={`/${likesList[i].iswinelist}/${likesList[i].id}`}>
                <img className="gallery__image" src={likesList[i].image}></img>
              </Link>
            </div>
            <div className="gallery__imageCont">
              <Link
                to={`/${likesList[i + 1].iswinelist}/${likesList[i + 1].id}`}
              >
                <img
                  className="gallery__image"
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
                <img className="gallery__image" src={likesList[i].image}></img>
              </Link>
            </div>
            <div className="gallery__imageCont">
              <Link
                to={`/${likesList[i + 1].iswinelist}/${likesList[i + 1].id}`}
              >
                <img
                  className="gallery__image"
                  src={likesList[i + 1].image}
                ></img>
              </Link>
            </div>
            <div className="gallery__imageCont">
              <Link
                to={`/${likesList[i + 2].iswinelist}/${likesList[i + 2].id}`}
              >
                <img
                  className="gallery__image"
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
      const res = await axios.get(`/api/users/${userID}?requesterID=${userID}`);
      // const newlikedWines = [10, 4, 3];
      // const newlikeswinelists = [1, 0, 2];
      const newlikedWines = res.data.likedWines;
      const newlikeswinelists = res.data.likedWinelists;

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

      for (let i = 0; i < newlikeswinelists.length; i++) {
        const winelistID = newlikeswinelists[i];
        const res = await axios.get(`/api/winelists/${winelistID}`);
        const likesWineitem = {
          iswinelist: "list",
          id: res.data.winelistID,
          image: res.data.thumbnailImage,
          lastUpdatedAt: res.data.lastUpdatedAt,
        };
        newlikeslist.push(likesWineitem);
      }

      for (let i = 0; i < newlikedWines.length; i++) {
        const wineID = newlikedWines[i];
        const res = await axios.get(`/api/wines/${wineID}`);
        const likesWinesitem = {
          iswinelist: "wine",
          id: res.data.wineID,
          image: res.data.images[0],
          lastUpdatedAt: res.data.lastUpdatedAt,
        };
        newlikeslist.push(likesWinesitem);
      }
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
      const res2 = await axios.get(`/api/users/${userID}/reviews`);
      const newreviewWineList = [];
      console.log(res.data);
      if (res2.status === 200) {
        const arr = res2.data;
        for (let i = 0; i < arr.length; i++) {
          const wineID = arr[i].wineID;
          const res1 = await axios.get(`/api/wines/${wineID}`);
          console.log(res1);
          const reviewwineitem = res1.data;
          newreviewWineList.push(reviewwineitem);
        }
        setreviewWineList(newreviewWineList);
      }
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
      <div className="profile">
        <div className="profile__name"> {userData.username}</div>
        <div className="proflie__proflie">
          <img className="profile__image" src={userData.profileImage}></img>
          <div className="profile__stats">
            <ul>
              <li>
                <span className="profile__stats__count">
                  {userData.likedWinelists.length + userData.likedWines.length}
                </span>
                likes
              </li>
              <li>
                <span className="profile__stats__count">
                  {dummpyReviewdata.length}
                </span>
                reviews
              </li>
              <li>
                <span className="profile__stats__count">
                  {userData.followers.length}
                </span>{" "}
                followers
              </li>
              <li>
                <span className="profile__stats__count">
                  {userData.followings.length}
                </span>{" "}
                follows
              </li>
            </ul>
          </div>
        </div>

        {Number(status.userID) === Number(userID) ? (
          <div
            className="profile__editporfile"
            onClick={() => {
              toggleStatus("EditProfileModal");
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
  );
};

export default ProfilePage;
