import React from "react";
import "./Detail.css";
import Review from "../Review/Review";
// import Search from "../Search/Search";
// import Filter from "../Filter/Filter";
// import Sort from "../Sort/Sort";
// import Register from "../Register/Register";
// import RegisterTag from "../RegisterTag/RegisterTag";
import Wine from "../Wine/Wine";
import WineList from "../WineList/WineList";
import Tag from "../Tag/Tag";

const Detail = () => {
  
  return (
    <>
      <div className = "detail">
        <div>
          <div className = "detail__wine">
            <div className="detail__wine-image">
              <img src="https://images.vivino.com/thumbs/MhiwIbE4TmSLMfjD-EKYjg_pb_x300.png"></img>
            </div>

            <div className="detail__wine-detail">
              <div className="detail__wine-title">La Crema Sonoma Coast Pinot Noir</div>
              <div className="detail__wine-tags">
                <Tag isFilled={1} isDisabled={1} txt="picnic" />
                <Tag isDisabled={1} txt="dry" />
                <Tag isDisabled={1} txt="steak" />
                <Tag isDisabled={1} txt="oak" />
                <Tag isDisabled={1} txt="rose" />
                <Tag isDisabled={1} txt="cherry" />
              </div>
              <div className="detail__wine-rate">★4.5</div>
              <div className="detail__wine-price">₩17,000</div>
            </div>

          </div>
          
        </div>
        <hr></hr>
          <div className = "detail__review">
            <div className = "detail__review-title"> </div>
            <Review userstatus={1}/>
            <Review userStatus={0}/>
          </div>
        <hr></hr>
          <div className = "detail__winerecomm">
            <div className = "detail__winerecomm-title"> You may also like</div>
            <Wine/>
            <Wine/>
          </div>
        <hr></hr>
          <div className = "detail__winelistrecomm">
            <div className = "detail__winelistrecomm-title"> List that contains this wine </div>
            <WineList/>
            <WineList/>
          </div>

      </div>
    </>
  );
};

// <img alt="Meiomi Pinot Noir" src="//images.vivino.com/thumbs/fjBaM_ZHTxqQtDa5Qj94JQ_pb_x600.png" height="500" width="147">

export default Detail;
