import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useState } from "react";

import {
  BsXLg,
  BsFillCheckCircleFill,
  BsThreeDots,
  BsFillXCircleFill,
} from "react-icons/bs";

import "./SommVerify.css";

const verifyDummyData = {
  ticketID: 1,
  userID: 60,
  username: "zzaerynn",
  adminID: null,
  verificationImage: "https://s3.bucket.podo/verficationImage/1/1.jpg",
  userExplanation: "I got my sommelier degree from Canada",
  adminFeedback: "",
  createdAt: "2022-04-04 18:11:12",
  lastUpdatedAt: "2022-04-05 18:11:12",
  status: 2,
};

const SommVerify = ({ status, request = verifyDummyData }) => {
  // toggled status of each component- either open or closed
  // toggle status 0(closed), 1(open)
  const [toggleStatus, setToggleStatus] = useState(0);

  const toggleButton = () => {
    setToggleStatus(!toggleStatus);
  };

  // current status of the Verification Ticket
  // //(Before) status: 0(approved), 1(pending), 2(rejected);
  // status: 0(declined), 1(approved), 2(pending);
  const [curStatus, setCurStatus] = useState(request.status);

  //admin
  const [adminFeedback, setAdminFeedback] = useState("");

  //sommdata = tempRequest
  const [tempRequest, setTempRequest] = useState({});

  // initialize tempRequest with the data of request
  useEffect(() => {
    setTempRequest(request);
    // console.log("tempRequest:", tempRequest);
  }, []);

  const onSubmit = async (curStatus) => {
    const body = {
      ticketID: request.ticketID,
      adminID: status.userinfo.userID,
      adminFeedback: tempRequest.adminFeedback,
      status: curStatus,
    };
    console.log("body from onSubmit:", body);
    //prevent empty adminFeedback
    if (tempRequest.adminFeedback !== "") {
      console.log("onSubmit, tempRequest not empty");
      axios
        .put(`/api/verification-tickets/answer`, body)
        .then((response) => {
          console.log("response:", JSON.stringify(response.data, null));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("no feedback from the admin user! Try again!");
      setCurStatus(2);
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    let newTempRequest = {
      ...tempRequest,
      [name]: value,
    };
    setTempRequest(newTempRequest);
    // console.log(newTempRequest);
  };

  const displayStatus = (curStatus) => {
    if (curStatus === 0) {
      return (
        <BsFillXCircleFill className="sommverify__statusIcon0"></BsFillXCircleFill>
      );
    } else if (curStatus === 1) {
      return (
        <BsFillCheckCircleFill className="sommverify__statusIcon1"></BsFillCheckCircleFill>
      );
    } else {
      return <BsThreeDots className="sommverify__statusIcon2"></BsThreeDots>;
    }
  };

  //able to edit (only when the curStatus === 2)
  const [editRequest, setEditRequest] = useState(0);
  //editRequest should change whenver curStatus changes
  useEffect(() => {
    if (curStatus !== 2) {
      setEditRequest(0);
    } else {
      setEditRequest(1);
    }
  }, [curStatus]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <>
      <div className="sommverify">
        <div className="sommverify__header" onClick={toggleButton}>
          <div className="sommverify__info">{tempRequest.username}</div>
          <div className="sommverify__status">
            <div className="sommverify__verifyButton">
              <div
                className={
                  toggleStatus && editRequest
                    ? "sommverify__button"
                    : "sommverify__button--inactive"
                }
              >
                <div
                  className="sommverify__verifyApprove"
                  onClick={() => {
                    setCurStatus(1);
                    onSubmit(1);
                  }}
                >
                  approve
                </div>
                <div
                  className="sommverify__verifyReject"
                  onClick={() => {
                    setCurStatus(0);
                    onSubmit(0);
                  }}
                >
                  reject
                </div>
              </div>
            </div>
            <div className="sommverify__statusIcon">
              {displayStatus(curStatus)}
            </div>
          </div>
        </div>
        <div
          className={
            toggleStatus ? "sommverify__body" : "sommverify__body--inactive"
          }
        >
          <div className="sommverify__bodyGrid">
            <div className="sommverify__img">
              <img
                className="sommverify__verifyImg"
                src={tempRequest.verificationImage}
              ></img>
              <div className="sommverify__appDate">
                requested on {formatDate(new Date(tempRequest.lastUpdatedAt))}
              </div>
              {/* <div className="sommverify__verDate">verified {}</div> */}
            </div>
            <div className="sommverify__comment">
              <div className="sommverify__userComment">
                {tempRequest.userExplanation}
              </div>

              <div className="sommverify__adminComment">
                <textarea
                  className="sommverify__adminInput"
                  placeholder={editRequest ? "write a comment here" : ""}
                  name="adminFeedback"
                  onChange={onChange}
                  readOnly={!editRequest}
                  value={tempRequest?.adminFeedback || ""}
                >
                  {/* {editRequest ? "" : tempRequest.adminFeedback} */}
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SommVerify;
