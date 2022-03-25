import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
    <div>
    <div class="profile">

<div class ="profile__name">iamdooddi</div>
<div class ='proflie__proflie'>
  <div class="profile__image">abc</div>
  <div class="profile__stats">
    <ul>
      <li><span class="profile__stats__count">338</span> likes</li>
      <li><span class="profile__stats__count">42</span> reviews</li>
      <li><span class="profile__stats__count">181</span> followers</li>
      <li><span class="profile__stats__count">114</span> follows</li>
    </ul>
  </div>
</div>

<div className="profile__editporfile">Edit Profile</div>




</div>
    </div>
    
    
      
    </>
  );
};

export default Profile;