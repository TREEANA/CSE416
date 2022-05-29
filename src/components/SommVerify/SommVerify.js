import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BsXLg,
  BsFillCheckCircleFill,
  BsThreeDots,
  BsFillXCircleFill,
} from "react-icons/bs";
import "./SommVerify.css";

const verifyDummyData = {
  ticketID: 0,
  userID: 60,
  adminID: 1,
  verificationImage:
    "https://edu.wine/vendor/10328/pics/images/WEI-somm-adv.jpg",
  userExplanation: "hi i uploaded my verification1",
  status: 1,
  adminFeedback: "",
  createdAt: "1011.01.11",
  lastUpdatedAt: "1011.11.11",
};

const SommVerify = ({ status, request = verifyDummyData }) => {
  // toggled status of each component- either open or closed
  // toggle status 0(closed), 1(open)
  const [toggleStatus, setToggleStatus] = useState(0);

  const toggleButton = () => {
    setToggleStatus(!toggleStatus);
  };

  // current status of the Verification Ticket
  // status: 0(approved), 1(pending), 2(rejected);
  const [curStatus, setCurStatus] = useState(request.status);

  //admin
  const [adminFeedback, setAdminFeedback] = useState("");

  //sommdata = tempRequest
  const [tempRequest, setTempRequest] = useState({});
  // initialize tempRequest with the data of request
  useEffect(() => {
    setTempRequest(request);
    console.log("tempRequest:", tempRequest);
  }, []);

  //username
  const [username, setUsername] = useState("");
  //fetch username using the userID
  const getUserName = async (userID) => {
    try {
      const res = await axios.get(`/api/users/${userID}`);
      setUsername(res.data.username);
      console.log("username after useEffect : ", username);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserName(request.userID);
  }, []);

  const onSubmit = async () => {
    const body = {
      ticketID: request.ticketID,
      adminID: status.userID,
      adminFeedback: adminFeedback,
      status: curStatus,
    };

    axios
      .put(`/api/verification-tickets/answer`, body)
      .then((response) => {
        console.log("response:", JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    let newTempRequest = {
      ...tempRequest,
      [name]: value,
    };
    setTempRequest(newTempRequest);
    console.log(newTempRequest);
  };

  return (
    <>
      <div className="sommverify">
        <div className="sommverify__header" onClick={toggleButton}>
          <div className="sommverify__info">
            {/* <img
              className="sommverify__infoImg"
              src={tempRequest.verificationImage}
            /> */}
            {/* <div className="sommverify__infoName">somm1</div> */}
            {username}
          </div>
          <div className="sommverify__status">
            <div className="sommverify__verifyButton">
              {toggleStatus &&
                tempRequest.status !== 0 &&
                tempRequest.status !== 2 && (
                  <>
                    <div className="sommverify__verifyApprove">approve</div>
                    <div className="sommverify__verifyReject"> reject </div>
                  </>
                )}
            </div>
            <div className="sommverify__statusIcon">
              {/* <BsFillCheckCircleFill /> */}
              {tempRequest.status === 0 ? (
                <BsFillCheckCircleFill className="sommverify__statusIcon0" />
              ) : tempRequest.status === 1 ? (
                <BsThreeDots className="sommverify__statusIcon1" />
              ) : (
                <BsFillXCircleFill className="sommverify__statusIcon2" />
              )}
              {/* {status === 0 && <BsFillCheckCircleFill className="sommverify__statusIcon0" />}
              {status === 1 && <BsThreeDots className="sommverify__statusIcon1" />}
              {status === 2 && <BsXLg  className="sommverify__statusIcon2"  />} */}
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
                  {tempRequest.userExplanation}
                  {/* Hello this is sommelier woohyun park. i would like to get my
                  sommelier badge by using this image. This is the certificate I
                  got from my home country, I am not sure it would work here as
                  well. Please thoroughly go over the document and let me know
                  the result. Thank you! */}
                </div>

                <div className="sommverify__adminComment" method="POST">
                  <textarea
                    className="sommverify__adminInput"
                    placeholder="write a comment here"
                    name="adminFeedback"
                    onChange={onChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SommVerify;
