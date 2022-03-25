import React from "react";
import "./Detail.css";
import Review from "../Review/Review";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";

const Detail = ({userstatus}) => {
  return (
    <>

      <div className = "detail">
        {/* <Filter/> */}
        <Sort/>
      </div>

      {/* <div className="detail">
        <Review userstatus = {userstatus}/>
      </div> */}
      
    </>
  );
};

export default Detail;
