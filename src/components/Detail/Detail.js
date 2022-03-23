import React from "react";
import "./Detail.css";
import Review from "../Review/Review";
import Search from "../Search/Search";

const Detail = ({userstatus}) => {
  return (
    <>

      {/* <div className = "detail">
        <Search/>
      </div> */}


      <div className="detail">
        <Review userstatus = {userstatus}/>
      </div>


      
    </>
  );
};

export default Detail;
