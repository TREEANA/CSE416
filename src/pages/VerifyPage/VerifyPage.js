import React, { useState, useEffect } from "react";
import axios from "axios";

import "./VerifyPage.css";
import SommVerify from "../../components/SommVerify/SommVerify";

const VerifyPage = ({ status }) => {
  //list of tickets fetched from db
  const [verTickets, setVerTickets] = useState([]);

  // filterStatus : filter requests by filter (0 : view all tickets, 1: answered, 2: pending)
  const [filterStatus, setFilterStatus] = useState(0);

  // fetch verification tickets from database
  const fetchVerifyReq = async (filterStatus) => {
    try {
      const res = await axios.get(
        `/api/verification-tickets/?userID=${status.userID}&?status=${filterStatus}`
      );
      // console.log("res.data from fetchVerifyReq", res.data);
      setVerTickets(res.data);
      // console.log("verTickets:", verTickets);
    } catch (e) {
      console.log(e);
    }
  };
  //fetch verification tickets when the page is initially loaded
  useEffect(() => {
    fetchVerifyReq(filterStatus);
    displayVerRequest();
  }, [filterStatus]);

  const displayVerRequest = () => {
    // return verTickets.map((each) => {
    //   return <SommVerify request={each} status={status} key={each.ticketID} />;
    // });
    const result = [];
    if (verTickets.length === 0) return;
    verTickets.forEach((each, index) => {
      result.push(
        <>
          <SommVerify request={each} key={index} status={status} />
        </>
      );
    });
    console.log("displayVerRequest: ", result);
    return result;
  };

  return (
    <>
      <div className="verifypage">
        <div className="verifypage__title"> Verify Sommelier </div>
        <div className="verifypage__status">
          <div className="verifypage__statusIcon">
            <button
              className={
                filterStatus === 0
                  ? "verifypage__statusButton--active verifypage__statusButton"
                  : "verifypage__statusButton"
              }
              onClick={() => {
                setFilterStatus(0);
                console.log("onClick setFilterStatus 0");
              }}
            >
              show all
            </button>
          </div>
          <div className="verifypage__statusIcon">
            <button
              className={
                filterStatus === 1
                  ? "verifypage__statusButton--active verifypage__statusButton"
                  : "verifypage__statusButton"
              }
              onClick={() => {
                setFilterStatus(1);
                console.log("onClick setFilterStatus 1");
              }}
            >
              show only answered
            </button>
          </div>
          <div className="verifypage__statusIcon">
            <button
              className={
                filterStatus === 2
                  ? "verifypage__statusButton--active verifypage__statusButton"
                  : "verifypage__statusButton"
              }
              onClick={() => {
                setFilterStatus(2);
                console.log("onClick setFilterStatus 2");
              }}
            >
              show only pending
            </button>
          </div>
        </div>
        <div className="verifypage__requests">
          {/* <SommVerify /> */}
          {displayVerRequest()}
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
// 	https://cdn.slidesharecdn.com/ss_thumbnails/winece…ficate-170520142158-thumbnail-4.jpg?cb=1495290251
