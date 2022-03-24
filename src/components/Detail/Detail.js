import React from "react";
import "./Detail.css";
import Review from "../Review/Review";
// import Search from "../Search/Search";
import Filter from "../Filter/Filter";

const Detail = ({userstatus}) => {
  return (
    <>

      <div className = "detail">
        <Filter/>
      </div>

      <div className="detail">
        <Review userstatus = {userstatus}/>
      </div>
      
    </>
  );
};

export default Detail;
