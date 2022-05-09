import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { set } from "lodash";
const ProfilePage = ({ status, toggleStatus }) => {
  const dummpyReviewdata = [];
  const { userID } = useParams();
  const [isFollowd, setFollowd] = useState(false);
  const [profile__like, setProfile__like] = useState("profile__selected");
  const [profile__review, setProfile__review] = useState("profile__unselected");
  const [islikewine, setlikewine] = useState(true);
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

  const getProfileimage = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${status.accesstoken}`
      );

      if (res.status === 200) {
        console.log(res.data.picture);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserdata = async () => {
    try {
      const res = await axios.get(`/api/users/${userID}?requesterID=${userID}`);
      if (res.status === 200) {
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
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(userID, status.userID);
    getUserdata();
  }, [userID]);

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
  useEffect(() => {
    checkfollow();
  }, [userID]);

  const dummpyLikedata = [{}];
  const likeimagelist = [
    { url: "https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0" },
    { url: "https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0" },
    { url: "https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0" },
    { url: "https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0" },
    { url: "https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0" },
    { url: "https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0" },
    { url: "https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0" },
    { url: "https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0" },
    { url: "https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0" },
    { url: "https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0" },
  ];

  const reviewimagelist = [
    {
      url: "https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152/h=152/fit=crop/crop=faces",
    },
    {
      url: "https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152/h=152/fit=crop/crop=faces",
    },
    {
      url: "https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152/h=152/fit=crop/crop=faces",
    },
    {
      url: "https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152/h=152/fit=crop/crop=faces",
    },
    {
      url: "https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152/h=152/fit=crop/crop=faces",
    },
    {
      url: "https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152/h=152/fit=crop/crop=faces",
    },
  ];

  const click_like = () => {
    setProfile__like("profile__selected");
    setProfile__review("profile__unselected");
  };

  const click__review = () => {
    setProfile__like("profile__unselected");
    setProfile__review("profile__selected");
  };

  const displayPictures = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length; i = i + 3) {
      if (i === arr.length - 1) {
        result.push(
          <div className="gallery__cont">
            <div className="gallery__imageCont">
              <img className="gallery__image" src={arr[i].url}></img>
            </div>
          </div>
        );
      } else if (i === arr.length - 2) {
        result.push(
          <div className="gallery__cont">
            <div className="gallery__imageCont">
              <img className="gallery__image" src={arr[i].url}></img>
            </div>
            <div className="gallery__imageCont">
              <img className="gallery__image" src={arr[i + 1].url}></img>
            </div>
          </div>
        );
      } else {
        result.push(
          <div className="gallery__cont">
            <div className="gallery__imageCont">
              <img className="gallery__image" src={arr[i].url}></img>
            </div>
            <div className="gallery__imageCont">
              <img className="gallery__image" src={arr[i + 1].url}></img>
            </div>
            <div className="gallery__imageCont">
              <img className="gallery__image" src={arr[i + 2].url}></img>
            </div>
          </div>
        );
      }
    }

    return result;
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

        {status.userID === Number(userID) ? (
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

        {/* <div
      className={
        isFollowd
          ? "profile__editporfile_unfilled "
          : "profile__editporfile"
      }
      onClick={() => setFollowd(!isFollowd)}
    >
      {isFollowd ? "following" : "follow"}
    </div> */}
        <div className="profile__listcontainer">
          <div className={profile__like} onClick={click_like}>
            like
          </div>
          <div className={profile__review} onClick={click__review}>
            review
          </div>
        </div>
        <div className="profile__list">
          <div className="gallery">
            {profile__like === "profile__selected"
              ? displayPictures(likeimagelist)
              : displayPictures(reviewimagelist)}
          </div>
        </div>
        {profile__like === "profile__selected" && islikewine && (
          <div
            className="proflie__history"
            onClick={() => {
              setlikewine(!islikewine);
            }}
          >
            {" "}
            wine
          </div>
        )}
        {profile__like === "profile__selected" && !islikewine && (
          <div
            className="proflie__history"
            onClick={() => {
              setlikewine(!islikewine);
            }}
          >
            {" "}
            winelist
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
