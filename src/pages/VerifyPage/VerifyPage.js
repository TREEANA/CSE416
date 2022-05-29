import React, { useState, useEffect } from "react";
import { BsXLg, BsFillCheckCircleFill, BsThreeDots } from "react-icons/bs";
import "./VerifyPage.css";
import SommVerify from "../../components/SommVerify/SommVerify";
import axios from "axios";

const VerifyPage = (status) => {
  const [verTickets, setVerTickets] = useState({});

  // fetch verification tickets from database
  const fetchVerifyReq = async () => {
    try {
      const res = await axios.get(`/api/verification-tickets`);
      setVerTickets(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  //fetch verification tickets when the page is initially loaded
  useEffect(() => {
    fetchVerifyReq();
  }, []);

  const displayVerRequest = () => {
    return verTickets.map((each) => {
      return <SommVerify request={each} status={status} />;
    });
  };

  return (
    <>
      {/* verify sommelier from admin view */}

      <div className="sommverify">
        <div>
          <SommVerify />
          {/* {displayVerRequest} */}
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
// 	https://cdn.slidesharecdn.com/ss_thumbnails/winece…ficate-170520142158-thumbnail-4.jpg?cb=1495290251
