import React, { useState } from "react";
import { BsXLg, BsFillCheckCircleFill, BsThreeDots } from "react-icons/bs";
import "./SommVerify.css";

const verifyDummyData = {
  0: {
    ticketID: 0,
    userID: 0,
    adminID: 1,
    verificationImage: "",
    userExplanation: "hi i uploaded my verification1",
    status: 2,
    adminFeedback: "",
    createdAt: "1011.01.11",
    lastUpdatedAt: "1011.11.11",
  },
  1: {
    ticketID: 1,
    userID: 1,
    adminID: 1,
    verificationImage: "",
    userExplanation: "hi i uploaded my verification2",
    status: 1,
    adminFeedback: "",
    createdAt: "2022.02.22",
    lastUpdatedAt: "2022.02.20",
  },
  2: {
    ticketID: 2,
    userID: 1,
    adminID: 1,
    verificationImage: "",
    userExplanation: "hi i uploaded my verification3",
    status: 2,
    adminFeedback: "",
    createdAt: "3033.03.03",
    lastUpdatedAt: "3033.03.33",
  },
};

const SommVerify = (sommdata = { ...verifyDummyData }) => {
  const [toggleStatus, setToggleStatus] = useState(0);
  //   toggle status 0(closed), 1(open)
  const toggleButton = () => {
    setToggleStatus(!toggleStatus);
  };
  const [status, setStatus] = useState(sommdata.status);
  //   status : 0(approved),1(pending), 2(rejected)
  return (
    <>
      <div className="sommverify">
        <div className="sommverify__header" onClick={toggleButton}>
          <div className="sommverify__info">
            <img
              className="sommverify__infoImg"
              src={sommdata.VerificationImage}
            />
            <div className="sommverify__infoName">{sommdata.userID}</div>
          </div>
          <div className="sommverify__status">
            <div className="sommverify__verifyButton">
              {toggleStatus && (
                <>
                  <div className="sommverify__verifyApprove">approve</div>
                  <div className="sommverify__verifyReject"> reject </div>
                </>
              )}
            </div>
            <div className="sommverify__statusIcon">
              {status === 0 && <BsFillCheckCircleFill />}
              {status === 1 && <BsThreeDots />}
              {status === 2 && <BsXLg />}
            </div>
          </div>
        </div>
        <div className="sommverify__body">
          <div className="sommverify__bodyGrid">
            <div
              className="sommverify__verifyImg"
              src="https://edu.wine/vendor/10328/pics/images/WEI-somm-adv.jpg"
            >
              {/* image */}
            </div>
            <div className="sommverify__rightText">
              <div className="sommverfiy__userComment">
                {verifyDummyData.userExplanation}
              </div>
              <div className="sommverfiy__adminComment"></div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="sommverify">
        <div className="sommverify__verify">
          <div className="verifysomm__verify-ind">
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
        </div>
      </div> */}
    </>
  );
};

export default SommVerify;
