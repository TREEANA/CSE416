import React, { useState } from "react";
import { BsXLg, BsFillCheckCircleFill, BsThreeDots } from "react-icons/bs";
import "./VerifyPage.css";
import SommVerify from "../../components/SommVerify/SommVerify";

const VerifyPage = () => {
  const [ind1Status, setInd1Status] = useState(false);
  const toggleInd1Status = () => {
    setInd1Status(!ind1Status);
  };
  const [ind2Status, setInd2Status] = useState(false);
  const toggleInd2Status = () => {
    setInd2Status(!ind2Status);
  };
  const [ind3Status, setInd3Status] = useState(false);
  const toggleInd3Status = () => {
    setInd3Status(!ind3Status);
  };

  const [resStatus, setResStatus] = useState(false);
  const toggleResStatus = () => {
    setResStatus(resStatus);
  };

  // const

  return (
    <>
      {/* <SommVerify /> */}

      <div className="verifysomm">
        <div className="verifysomm__title">
          <div className="verifysomm__title-title"> Verify Sommelier </div>
          {/* <BsXLg></BsXLg> */}
        </div>
        <div className="verifysomm__verify">
          <div className="verifysomm__verify-ind" onClick={toggleInd1Status}>
            <div className="verifysomm__verify-info">
              <img src="//images.vivino.com/avatars/MutAcRi8Th-OYQwBJHsb3w.jpg"></img>
              <div className="verifysomm__verify-name"> iamdooddi</div>
            </div>

            <div
              className={
                ind1Status
                  ? "verifysomm__verify-btn verifysomm__verify-btn--open"
                  : "verifysomm__verify-btn"
              }
            >
              {ind1Status && (
                <>
                  <div className="verifysomm__verify-approve-btn">approve</div>
                  <div className="verifysomm__verify-reject-btn"> reject </div>
                </>
              )}

              <div className="verifysomm__verify-pending">
                <BsThreeDots />
              </div>
            </div>
          </div>

          {ind1Status && (
            <div className="verifysomm__verify-detail">
              <div className="verifysomm__verify-detail-img">
                <img src="https://edu.wine/vendor/10328/pics/images/WEI-somm-adv.jpg"></img>
              </div>
              <div className="verifysomm__verify-detail-comment">
                <div className="verifysomm_verify-usercomment">
                  I request verification with my certificate. Let me know if
                  this is too blurred.
                </div>
                <div className="verifysomm__verfiy-admincomment">
                  <input placeholder="write a comment"></input>
                </div>
              </div>
            </div>
          )}

          <div className="verifysomm__verify-ind" onClick={toggleInd2Status}>
            <div className="verifysomm__verify-info">
              <img src="https://img.jamieoliver.com/home/wp-content/uploads/features-import/2015/09/feature-header8.jpg"></img>
              <div className="verifysomm__verify-name"> zzaerynn</div>
            </div>
            <div className="verifysomm__verify-btn">
              <div className="verifysomm__verify-approve">
                <BsFillCheckCircleFill />
              </div>
            </div>
          </div>

          {ind2Status && (
            <div className="verifysomm__verify-detail">
              <div className="verifysomm__verify-detail-img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaP4OqblIDCQJm3iCLap4B54afd_InVdqdVfauOESpHpJUosOh3kEXFkZMdC8yhLIbcvI&usqp=CAU"></img>
              </div>
              <div className="verifysomm__verify-detail-comment">
                <div className="verifysomm_verify-usercomment">
                  Submitting my sommelier certificate, contact me
                </div>
                <div className="verifysomm__verfiy-admincomment">
                  Your certificate regarded valid, your user status will be
                  promoted to "Sommelier".
                </div>
              </div>
            </div>
          )}

          <div className="verifysomm__verify-ind" onClick={toggleInd3Status}>
            <div className="verifysomm__verify-info">
              <img src="https://pbs.twimg.com/profile_images/1314366221035266049/sfu8TW_P_400x400.jpg"></img>
              <div className="verifysomm__verify-name"> jennierubyjane</div>
            </div>

            <div className="verifysomm__verify-btn">
              <div className="verifysomm__verify-reject">
                <BsXLg />
              </div>
            </div>
          </div>

          {ind3Status && (
            <div className="verifysomm__verify-detail">
              <div className="verifysomm__verify-detail-img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaP4OqblIDCQJm3iCLap4B54afd_InVdqdVfauOESpHpJUosOh3kEXFkZMdC8yhLIbcvI&usqp=CAU"></img>
              </div>
              <div className="verifysomm__verify-detail-comment">
                <div className="verifysomm_verify-usercomment">
                  Jennie Ruby Jane's certificate
                </div>
                <div className="verifysomm__verfiy-admincomment">
                  Your certificate is not valid, it refers to specific wine, not
                  sommelier.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
// 	https://cdn.slidesharecdn.com/ss_thumbnails/winece…ficate-170520142158-thumbnail-4.jpg?cb=1495290251
