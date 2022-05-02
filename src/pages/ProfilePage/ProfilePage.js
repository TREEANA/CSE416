import React, { useState } from "react";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
const ProfilePage = ({ status, toggleStatus }) => {
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

  const dummpyReviewdata = [];

  const [profile__like, setProfile__like] = useState("profile__selected");
  const [profile__review, setProfile__review] = useState("profile__unselected");
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
    // for로 3개씩 해서 result에 append
    console.log(arr.length);
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
          className="profile__editporfile"
          onClick={() => {
            toggleStatus("EditProfileModal");
          }}
        >
          Edit Profile
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
    </>
  );
};

export default ProfilePage;
