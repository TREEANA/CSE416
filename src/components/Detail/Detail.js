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
import {BsHeart, BsFillPencilFill, BsHeartFill, BsStar, BsStarFill} from 'react-icons/bs';

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

          {/* <div className="detail__wine-taste">
            <table>
              <tr className = "detail__wine-char">
                <td className = "detail__wine-char1">light</td>
                <td className = "detail__wine-range"> 
                  <div className = "detail__wine-range-div">
                    <span className = "detail__wine-range-span">  </span>
                  </div>
                </td>
                <td className = "detail__wine-char2">bold</td>
              </tr>  
            </table>
          </div> */}

          {/* <table class="tasteStructure__tasteStructure--15VDn">
            <tbody>
              <tr class="tasteStructure__tasteCharacteristic--1rMFl">
                <td>
                  <div class="tasteStructure__property--loYWN">Light</div>
                </td>
                <td class="tasteStructure__progressBar--hjNb2">
                  <div class="indicatorBar__meter--2t_YL tasteStructure__progressBar--hjNb2">
                    <span class="indicatorBar__progress--3aXLX" style="width: 20%; left: 80%;"></span>
                  </div>
                </td>
                <td>
                  <div class="tasteStructure__property--loYWN">Bold</div>
                </td>
              </tr>
              <tr class="tasteStructure__tasteCharacteristic--1rMFl">
                <td>
                  <div class="tasteStructure__property--loYWN">Smooth</div>
                </td>
                <td class="tasteStructure__progressBar--hjNb2">
                  <div class="indicatorBar__meter--2t_YL tasteStructure__progressBar--hjNb2">
                    <span class="indicatorBar__progress--3aXLX" style="width: 20%; left: 44.41%;"></span>
                  </div>
                </td>
                <td>
                  <div class="tasteStructure__property--loYWN">Tannic</div>
                </td>
              </tr>
              <tr class="tasteStructure__tasteCharacteristic--1rMFl">
                <td>
                  <div class="tasteStructure__property--loYWN">Dry</div>
                </td>
                <td class="tasteStructure__progressBar--hjNb2">
                  <div class="indicatorBar__meter--2t_YL tasteStructure__progressBar--hjNb2">
                    <span class="indicatorBar__progress--3aXLX" style="width: 20%; left: 13.1148%;"></span>
                  </div>
                </td>
                <td>
                  <div class="tasteStructure__property--loYWN">Sweet</div>
                </td>
              </tr>
              <tr class="tasteStructure__tasteCharacteristic--1rMFl">
                <td>
                  <div class="tasteStructure__property--loYWN">Soft</div>
                </td>
                <td class="tasteStructure__progressBar--hjNb2">
                  <div class="indicatorBar__meter--2t_YL tasteStructure__progressBar--hjNb2">
                    <span class="indicatorBar__progress--3aXLX" style="width: 20%; left: 37.3993%;"></span>
                  </div>
                </td>
                <td>
                  <div class="tasteStructure__property--loYWN">Acidic</div>
                </td>
              </tr>
            </tbody>
          </table> */}

        </div>
        <hr className = "detail__line"></hr>
          <div className = "detail__review">
            <div className = "detail__review-title"> Reviews </div>

            <div className = "detail__one-review">
              <div className = "detail__review-title">
                <div className = "detail__review-star"> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStar/> </div>
                <div className = "detail__review-icons">
                  <BsHeartFill/>  
                  <BsFillPencilFill/>
                </div>
              </div>

              <div className = "detail__review-addtag">
                <div className = "detail__review-tagcont"> 
                  <input className = "detail__review-input" placeholder = "add tags "></input>
                  <div className = "detail__review-plus"> +</div>
                </div>
                <div>
                  <Tag isDisabled = {0} isFilled = {1} txt = "x acidic"></Tag>
                  <Tag isDisabled = {0} isFilled = {1} txt = "x dry"></Tag>
                  <Tag isDisabled = {0} isFilled = {1} txt = "x light"></Tag>
                  <Tag isDisabled = {0} isFilled = {1} txt = "x steak"></Tag>
                  <Tag isDisabled = {0} isFilled = {1} txt = "x picnic"></Tag>
                </div>
              </div>

              <div className = "detail__review-content">
                  Great autumn wine. Clean leather, mint, cherry, blackberry and chocolate. Worth opening ahead of drinking - smooth and mellow.
              </div>
              <div className = "detail__review-post"> post a review </div>
              <div>

              </div>
            </div>



            <Review userstatus={1}/>
            <Review userStatus={0}/>
          </div>
        <hr className = "detail__line"></hr>
          <div className = "detail__winerecomm">
            <div className = "detail__winerecomm-title"> You may also like</div>
            <Wine/>
            <Wine/>
          </div>
        <hr className = "detail__line"></hr>
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
