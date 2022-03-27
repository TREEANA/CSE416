import React from "react";
import "./Register.css";

const Detail = ({userstatus, filterpage, togglefilterpage}) => {
  
  return (
    <>

      <div className = "detail">
        {/* <Filter filterpage = {filterpage} togglefilterpage = {togglefilterpage}/> */}
        {/* <Sort/> */}
      </div>

      <div className="detail">
        <Review userstatus = {userstatus}/>
      </div>
      
    </>
  );
};

export default Detail;
