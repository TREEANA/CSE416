import React from "react";
import "./Detail.css";
import Review from "../Review/Review";
// import Search from "../Search/Search";
// import Filter from "../Filter/Filter";
// import Sort from "../Sort/Sort";
import Register from "../Register/Register";
import RegisterTag from "../RegisterTag/RegisterTag";

const Detail = ({userstatus }) => {
  
  return (
    <>

      <div className = "detail">
        {/* <Filter filterpage = {filterpage} togglefilterpage = {togglefilterpage}/> */}
        {/* <Sort/> */}
        <RegisterTag/>
      </div>

      {/* <div className="detail">
        <Review userstatus = {userstatus}/>
      </div> */}
      
      <div>
        {/* <Register/> */}
      </div>
    </>
  );
};

export default Detail;
