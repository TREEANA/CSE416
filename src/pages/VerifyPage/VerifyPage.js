import React, { useState, useEffect } from "react";
import axios from "axios";

import "./VerifyPage.css";
import SommVerify from "../../components/SommVerify/SommVerify";

// import { BsXLg, BsFillCheckCircleFill, BsThreeDots } from "react-icons/bs";

const VerifyPage = ({ status }) => {
  //list of tickets fetched from db
  const [verTickets, setVerTickets] = useState([]);

  // fetch verification tickets from database
  const fetchVerifyReq = async () => {
    try {
      const res = await axios.get(
        `/api/verification-tickets/?userID=${status.userID}`
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
    fetchVerifyReq();
  }, []);

  const displayVerRequest = () => {
    // return verTickets.map((each) => {
    //   return <SommVerify request={each} status={status} key={each.ticketID} />;
    // });
    const result = [];
    if (verTickets.length === 0) return;
    verTickets.forEach((each, index) => {
      // if (verTicket.)
      result.push(
        <>
          <SommVerify request={each} key={index} status={status} />
        </>
      );
    });
    // console.log("displayVerRequest: ", result);
    return result;
  };

  return (
    <>
      <div className="verifypage">
        <div className="verifypage__title"> Verify Sommelier </div>
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
