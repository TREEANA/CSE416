import React, { useState } from "react";
import { BsXLg, BsFillCheckCircleFill, BsThreeDots } from "react-icons/bs";
import "./SommHistory.css";

const dummyData = {
  ticketID: 1,
  userID: 1,
  adminID: 9999,
  verificationImage: "https://s3.bucket.podo/verficationImage/1/1.jpg",
  userExplanation: "I got my sommelier degree from Canada",
  adminFeedback: "Image is somewhat blurry please upload the more clear image",
  createdAt: "2022-04-04 18:11:12",
  lastUpdatedAt: "2022-04-05 18:11:12",
  status: 0, //0 declined 1 인정 2 진행중
  // 유저 프로파일 이미지가 필요합니다.
  // 날짜를 쓰자
};

const dummy = [
  //returns list of verification tickets
  {
    ticketID: 1,
    userID: 1,
    adminID: 9999,
    verificationImage: "https://s3.bucket.podo/verficationImage/1/1.jpg",
    userExplanation: "I got my sommelier degree from Canada",
    adminFeedback:
      "Image is somewhat blurry please upload the more clear image",
    createdAt: "2022-04-04 18:11:12",
    lastUpdatedAt: "2022-04-05 18:11:12",
    status: 0, //declined
  },
  {
    ticketID: 2,
    userID: 1,
    adminID: "",
    verificationImage: "https://s3.bucket.podo/verficationImage/1/2.jpg",
    userExplanation: "I got my sommelier degree from Canada",
    adminFeedback: "",
    createdAt: "2022-04-05 20:11:12",
    lastUpdatedAt: "2022-04-05 20:11:12",
    status: 2, // pending
  },
];

const SommHistory = ({ num }) => {
  const [ind2Status, setInd2Status] = useState(false);

  const toggleInd2Status = () => {
    setInd2Status(!ind2Status);
  };
  const verifybtn = () => {
    if (num === 0) {
      return (
        <div className="verifysomm__verifyBtn">
          <div className="verifysomm__verifyReject">
            <BsXLg />
          </div>
        </div>
      );
    } else if (num === 1) {
      return (
        <div className="verifysomm__verifyBtn">
          <div className="verifysomm__verifyApprove">
            <BsFillCheckCircleFill />
          </div>
        </div>
      );
    } else if (num === 2) {
      return (
        <div className="verifysomm__verifyBtn">
          <div className="verifysomm__verifyPending">
            <BsThreeDots />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="verifysomm__verifyInd" onClick={toggleInd2Status}>
        <div className="verifysomm__verifyInfo">
          <img src="https://img.jamieoliver.com/home/wp-content/uploads/features-import/2015/09/feature-header8.jpg"></img>
          <div className="verifysomm__verifyName"> {dummyData.createdAt}</div>
        </div>
        {verifybtn()}
      </div>
      {ind2Status && (
        <div className="verifysomm__verifyDetail">
          <div className="verifysomm__verifyDetailImg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaP4OqblIDCQJm3iCLap4B54afd_InVdqdVfauOESpHpJUosOh3kEXFkZMdC8yhLIbcvI&usqp=CAU"></img>
          </div>
          <div className="verifysomm__verifyDetailComment">
            <div className="verifysomm_verifyUserComment">
              Submitting my sommelier certificate, contact me if any issue
            </div>
            <div className="verifysomm__verfiyAdminComment">
              Your certificate regarded valid, your user status will be promoted
              to "Sommelier".
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SommHistory;
