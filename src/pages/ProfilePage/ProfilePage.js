import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProfilePage = ({ status, toggleStatus }) => {
  const dummpyReviewdata = [];
  const { userID } = useParams();
  const [isFollowd, setFollowd] = useState(false);
  const [profile__like, setProfile__like] = useState("profile__selected");
  const [profile__review, setProfile__review] = useState("profile__unselected");
  const [userData, setUserData] = useState({
    userID: 0,
    username: "DukYoung",
    email: "amdy1997@gmail.com",
    profileImage: "https://s3.bucket.somewhere.myprofile.jpg",
    phone: "01085265331",
    gender: "male",
    status: 2,
    likedWine: [],
    likedWinelist: [],
    createdAt: "2022-04-04 20:20:21",
    tags: [],
    following: [],
    follwer: [],
    isDeleted: false,
    // rev
  });
  const [Profileimage, setProfileimage] = useState(
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  );

  const getProfileimage = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${status.accesstoken}`
      );

      if (res.status === 200) {
        setProfileimage(res.data.picture);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserdata = async () => {
    console.log(status.userID);
    try {
      const res = await axios.get(
        `/api/users/${status.userID}?requesterID=${status.userID}`
      );
      if (res.status === 200) {
        setUserData(res.data);
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserdata();
    getProfileimage();
  }, []);

  const dummpyUserdata = {
    userID: 0,
    username: "DukYoung",
    email: "amdy1997@gmail.com",
    profileImage: "https://s3.bucket.somewhere.myprofile.jpg",
    phone: "01085265331",
    gender: "male",
    status: 2,
    likedWine: [],
    likedWinelist: [],
    createdAt: "2022-04-04 20:20:21",
    tags: [],
    following: [],
    follwer: [],
    isDeleted: false,
    // rev
  };
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
      {userID !== userData.userID ? (
        <div className="profile">
          <div className="profile__name"> {dummpyUserdata.username}</div>
          <div className="proflie__proflie">
            <img className="profile__image" src={Profileimage}></img>
            <div className="profile__stats">
              <ul>
                <li>
                  <span className="profile__stats__count">
                    {dummpyUserdata.likedWine.length +
                      dummpyUserdata.likedWinelist.length}
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
                  <span className="profile__stats__count">181</span> followers
                </li>
                <li>
                  <span className="profile__stats__count">114</span> follows
                </li>
              </ul>
            </div>
          </div>
          <div
            className="profile__editporfile"
            onClick={() => {
              toggleStatus("EditProfileModal");
            }}
          >
            Edit Profile
          </div>

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
        </div>
      ) : (
        <div className="profile">
          <div className="profile__name"> {dummpyUserdata.username}</div>
          <div className="proflie__proflie">
            <img
              className="profile__image"
              src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152/h=152/fit=crop/crop=faces"
            ></img>
            <div className="profile__stats">
              <ul>
                <li>
                  <span className="profile__stats__count">
                    {dummpyUserdata.likedWine.length +
                      dummpyUserdata.likedWinelist.length}
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
                  <span className="profile__stats__count">181</span> followers
                </li>
                <li>
                  <span className="profile__stats__count">114</span> follows
                </li>
              </ul>
            </div>
          </div>

          <div
            className={
              isFollowd
                ? "profile__editporfile_unfilled "
                : "profile__editporfile"
            }
            onClick={() => setFollowd(!isFollowd)}
          >
            {isFollowd ? "following" : "follow"}
          </div>
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
        </div>
      )}
    </>
  );
};

export default ProfilePage;
