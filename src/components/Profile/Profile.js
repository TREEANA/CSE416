import React, { useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {

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

      <div className ="profile__name">iamdooddi</div>
      <div className ='proflie__proflie'>
        <div className="profile__image">abc</div>
        <div className="profile__stats">
          <ul>
            <li><span className="profile__stats__count">338</span> likes</li>
            <li><span className="profile__stats__count">42</span> reviews</li>
            <li><span className="profile__stats__count">181</span> followers</li>
            <li><span className="profile__stats__count">114</span> follows</li>
          </ul>
        </div>
      </div>
      
      <div className="profile__editporfile">Edit Profile</div>

      <div className="profile__listcontainer">
        <div className={profile__like} onClick={click_like}>like</div>
        <div className={profile__review} onClick={click__review}>review</div>
      </div>
      <div className="profile__list">
        <div className="gallery"> 
        <div className="gallery__image"> 
         200px x 200px
        </div>
        <div className="gallery__image"> 
         200px x 200px
        </div>
        <div className="gallery__image"> 
         200px x 200px
        </div>
        <div className="gallery__image"> 
         200px x 200px
        </div>
        <div className="gallery__image"> 
         200px x 200px
        </div>
        <div className="gallery__image"> 
         200px x 200px
        </div>
        <div className="gallery__image"> 
         200px x 200px
        </div>
        <div className="gallery__image"> 
         200px x 200px
        </div>
         <div className="gallery__image"> 
         200px x 200px
        </div>

        </div>

      </div>
    

  
    

    

    </div>
    
      
    </>
  );
};

export default Profile;