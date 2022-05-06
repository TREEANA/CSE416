import React, { useState } from "react";
import {
  BsXLg,
  BsFillCheckCircleFill,
  BsThreeDots,
  BsFillXCircleFill,
} from "react-icons/bs";
import "./SommVerify.css";

const verifyDummyData = {
  ticketID: 0,
  userID: 0,
  adminID: 1,
  verificationImage: "",
  userExplanatio: "hi i uploaded my verification1",
  status: 2,
  adminFeedback: "",
  createdAt: "1011.01.11",
  lastUpdatedAt: "1011.11.11",
};

const SommVerify = (sommdata = { ...verifyDummyData }) => {
  const [toggleStatus, setToggleStatus] = useState(0);
  //   toggle status 0(closed), 1(open)
  const toggleButton = () => {
    setToggleStatus(!toggleStatus);
  };
  //   const [status, setStatus] = useState(sommdata.status);
  //   status : 0(approved),1(pending), 2(rejected)
  //   const [userExp, setUserExp] = useState(sommdata.userExplanation);
  const [sommData, setSommData] = useState(verifyDummyData);
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
              {toggleStatus && sommData.status !== 1 && (
                <>
                  <div className="sommverify__verifyApprove">approve</div>
                  <div className="sommverify__verifyReject"> reject </div>
                </>
              )}
            </div>
            <div className="sommverify__statusIcon">
              {/* <BsFillCheckCircleFill /> */}
              {status === 0 ? (
                <BsFillCheckCircleFill />
              ) : status === 1 ? (
                <BsThreeDots />
              ) : (
                <BsFillXCircleFill />
              )}
              {/* {status === 0 && <BsFillCheckCircleFill />}
              {status === 1 && <BsThreeDots />}
              {status === 2 && <BsXLg />} */}
            </div>
          </div>
        </div>
        {toggleStatus && (
          <div className="sommverify__body">
            <div className="sommverify__bodyGrid">
              <div className="sommverify__img">
                <img
                  className="sommverify__verifyImg"
                  src="https://edu.wine/vendor/10328/pics/images/WEI-somm-adv.jpg"
                ></img>
              </div>
              <div className="sommverify__comment">
                <div className="sommverify__userComment">
                  {/* {verifyDummyData.userExplanation} */}
                  Hello this is sommelier woohyun park. i would like to get my
                  sommelier badge by using this image. This is the certificate I
                  got from my home country, I am not sure it would work here as
                  well. Please thoroughly go over the document and let me know
                  the result. Thank you!
                </div>

                <form className="sommverify__adminComment" method="POST">
                  <textarea
                    className="sommverify__adminInput"
                    placeholder="write a comment here"
                  ></textarea>
                </form>
              </div>
            </div>
          </div>
        )}
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
