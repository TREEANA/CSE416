import React, { useState } from "react";
import "./Review.css";

const Review = () => {
    return (
      <>
        <div className = "review"> 
            <div className = "review__title">
                <div className = "review__user">
                    <div className = "review__user-image"> Img </div>
                    <div className = "review__user-info"> 
                        <div className = "review__user-name">Marc Almert</div>
                        <div className = "review__user-date"> 2022.02.27 </div>
                    
                    </div>
                </div>
                <div className = "review__user-rate"> 4.5 </div>
            </div>

            <div className = "review__tag"> 
                <div className = "review__ind-tag"> light </div>
                <div className = "review__ind-tag"> steak </div>
                <div className = "review__ind-tag"> picnic </div>
                <div className = "review__ind-tag"> dry </div>
            </div>

            <div className = "review__content">Fantastic Tinta de toro! Strong Flabors of tobacco, vanilla, leather, oak, earthly hints of pure toro. Matsu el regio 4.5 to a great wine.</div>
        </div>
      </>
    );
  };
  
export default Review;
  