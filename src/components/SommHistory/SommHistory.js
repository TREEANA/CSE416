import React, { useState } from "react";
import { BsXLg, BsFillCheckCircleFill, BsThreeDots } from "react-icons/bs";
import "./SommHistory.css";

const dummy = {
  userID: 74,
  adminID: null,
  verificationImage:
    "http://res.cloudinary.com/dx0q9mebc/image/upload/v1653492779/kptdxeqhcljsnnhd23n7.png",
  userExplanation: "asdasd",
  status: 2,
  adminFeedback: "",
  isDeleted: false,
  createdAt: "2022-05-26 00:16:33",
  lastUpdatedAt: "2022-05-26 00:16:33",
  ticketID: 12,
};

const SommHistory = ({ status, data }) => {
  const [ind2Status, setInd2Status] = useState(false);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };
  const toggleInd2Status = () => {
    setInd2Status(!ind2Status);
  };
  const verifybtn = () => {
    if (data.status === 0) {
      return (
        <div className="sommverify__verifyBtn">
          <div className="sommverify__verifyReject">
            <BsXLg />
          </div>
        </div>
      );
    } else if (data.status === 1) {
      return (
        <div className="sommverify__verifyBtn">
          <div className="sommverify__verifyApprove">
            <BsFillCheckCircleFill />
          </div>
        </div>
      );
    } else if (data.status === 2) {
      return (
        <div className="sommverify__verifyBtn">
          <div className="sommverify__verifyPending">
            <BsThreeDots />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="sommverify__verifyInd" onClick={toggleInd2Status}>
        <div className="sommverify__verifyInfo">
          <img
            className="sommverify__img"
            src={status.userinfo.profileImage}
          ></img>
          <div className="sommverify__verifyName">
            {formatDate(new Date(data.createdAt))}
          </div>
        </div>
        {verifybtn()}
      </div>
      {ind2Status && (
        <div className="sommverify__verifyDetail">
          <div className="sommverify__verifyDetailImg">
            <img src={data.verificationImage}></img>
          </div>
          <div className="sommverify__verifyDetailComment">
            <div className="sommverify_verifyUserComment">
              {data.userExplanation}
            </div>
            <div className="sommverify__verfiyAdminComment">
              {data.adminFeedback === ""
                ? "no admin feedback"
                : data.adminFeedback}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SommHistory;
