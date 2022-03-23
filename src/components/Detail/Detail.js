import React from "react";
import "./Detail.css";
import Review from "../Review/Review";
import Search from "../Search/Search";

const Detail = ({userType}) => {
  return (
    <>

      <div className = "detail">
        <Search/>
      </div>


      <div className="detail">
        <Review userType = {userType}/>
      </div>


      
    </>
  );
};

export default Detail;
