import React, { useState } from "react";
import "./FaqPage.css";
import Ticket from "../../components/Ticket/Ticket";

const FaqPage = () => {
  // const [faq1, setFaq1] = useState(0);
  // const [faq2, setFaq2] = useState(0);
  // const [faq3, setFaq3] = useState(0);
  // const toggleFAQ = ({ faq }) => {
  //   if (faq === faq1) {
  //     setFaq1(!faq1);
  //   } else if (faq === faq2) {
  //     setFaq2(!faq2);
  //   } else if (faq === faq3) {
  //     setFaq3(!faq3);
  //   }
  // };

  return (
    <>
      <div className="FAQ">
        <div className="FAQ__name">FAQ</div>

        <Ticket
          type="faq"
          title={"I want to reset my password"}
          question={"I have trouble logging in with my account"}
          answer={
            "Please click on forgot my password button to reset your password."
          }
          // onClick={toggleFAQ(faq1)}
        />
        <Ticket
          type="faq"
          title={"I want to modlify my account information"}
          question={"I have trouble logging in with my account"}
          answer={
            "Please click on forgot my password button to reset your password."
          }
          // onClick={toggleFAQ(faq2)}
        />
        <Ticket
          type="faq"
          title={"I want to delete my account"}
          question={"I have trouble logging in with my account"}
          answer={
            "Please click on forgot my password button to reset your password."
          }
          // onClick={toggleFAQ(faq3)}
        />

        {/* <Ticket
          type="verify"
          title={"testing for Verify ticket"}
          question={"hello for verify !! "}
          answer={"I hereby request for verification."}
        />

        <Ticket
          type="ticket"
          ticketStatus={2}
          title={"testing for Verify ticket"}
          question={"hello for ticket"}
          answer={"I hereby request for verification."}
        /> */}
      </div>
    </>
  );
};

export default FaqPage;
