import React from "react";
import "./Comment.css";
import Review from "../Review/Review";
import Wine from "../Wine/Wine";
import WineList from "../WineList/WineList";
import Tag from "../Tag/Tag";
import {BsHeart, BsFillPencilFill, BsHeartFill, BsStar,BsPlus,BsPatchCheckFill, BsStarFill,BsReplyFill} from 'react-icons/bs';

const Comment = ({commentModalStatus,togglecommentModal}) => {
  
  return (
    <>
      <div className = {commentModalStatus ? "comment":"comment--inactive"}>
          <div className="comment__container">
            <div className="comment__header">
                <div className="comment__header__title">Comment</div>
                <BsReplyFill className = "comment__close" onClick = {togglecommentModal}/>
            </div>
            <div className="comment__review_container">
                <Review userstatus={1}/>
            </div>
            <div className="comment__comment__container">
                <div className = "comment__user">
                    <div className = "comment__user-info"> 
                        <div className = "comment__user-name">Marc Almert</div>
                        <div className = "comment__user-date"> 2022.02.27 </div>
                    </div>
                    <div className = "comment__user-icon" >  <BsPatchCheckFill/></div>
                </div>
                <div className="comment__comment__font">Great comment</div>
            </div>
            <div className="comment__comment__container">
                <div className = "comment__user">
                    <div className = "comment__user-info"> 
                        <div className = "comment__user-name">Mr.eom</div>
                        <div className = "comment__user-date"> 2022.02.27 </div>
                    </div>
                </div>
                <div className="comment__comment__font">I totally agree.</div>
            </div>
            <div className="comment__comment__container">
                <div className = "comment__user">
                    <div className = "comment__user-info"> 
                        <div className = "comment__user-name">zzaerynn</div>
                        <div className = "comment__user-date"> 2022.02.29 </div>
                    </div>
                </div>
                <div className="comment__comment__font">zzzzzzzzzz</div>
            </div>

            <div className="comment_tag_container">
                <div className="comment__tag_button">
                    <input className="comment__tag-input"placeholder="leave a comment"></input>
                </div>
                <BsPlus className="comment__plus_icon"/>
            </div>

          </div>

      </div>
    </>
  );
};

// <img alt="Meiomi Pinot Noir" src="//images.vivino.com/thumbs/fjBaM_ZHTxqQtDa5Qj94JQ_pb_x600.png" height="500" width="147">

export default Comment;
