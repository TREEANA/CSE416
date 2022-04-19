import React, { useState } from "react";
import "./ProfilePage.css";
import { Link } from "react-router-dom";

const ProfilePage = () => {
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
  return (
    <>
      <div className="profile">
        <div className="profile__name">iamdooddi </div>
        <div className="proflie__proflie">
          <img
            className="profile__image"
            src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152/h=152/fit=crop/crop=faces"
          ></img>
          <div className="profile__stats">
            <ul>
              <li>
                <span className="profile__stats__count">338</span> likes
              </li>
              <li>
                <span className="profile__stats__count">42</span> reviews
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

        <div className="profile__editporfile">Edit Profile</div>

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
            <img
              className="gallery__image"
              src="https://images.unsplash.com/photo-1553682544-4ccf2778c9a8"
            ></img>
            <img
              className="gallery__image"
              src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"
            ></img>
            <img
              className="gallery__image"
              src="https://images.unsplash.com/photo-1529543544282-ea669407fca3"
            ></img>
            <img
              className="gallery__image"
              src="https://images.unsplash.com/photo-1566331551467-0dc72cc80ec0"
            ></img>
            <img
              className="gallery__image"
              src="https://images.unsplash.com/photo-1532117472055-4d0734b51f31"
            ></img>
            <img
              className="gallery__image"
              src="https://images.unsplash.com/photo-1467003909585-2f8a72700288"
            ></img>
            <img
              className="gallery__image"
              src="https://images.unsplash.com/photo-1551790629-9d5c2d781d8b"
            ></img>
            <img
              className="gallery__image"
              src="https://images.unsplash.com/photo-1479796099910-b137a80acde4"
            ></img>
            <img
              className="gallery__image"
              src="https://images.unsplash.com/photo-1611765083444-a3ce30f1c885"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
