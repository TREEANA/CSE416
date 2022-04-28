import React, { useState } from "react";
import "./FaqPage.css";
import $ from "jquery";
import Ticket from "../../components/Ticket/Ticket";

const FaqPage = () => {
  const [FAQ_resetStatus, setFAQ_reset] = useState(0);
  const reset = () => {
    setFAQ_reset(!FAQ_resetStatus);
    if (FAQ_resetStatus) {
      $(".FAQ_reset").hide();
    } else {
      $(".FAQ_reset").show();
    }
  };

  const [FAQ_modifyStatus, setFAQ_modify] = useState(0);
  const modify = () => {
    setFAQ_modify(!FAQ_modifyStatus);
    if (FAQ_modifyStatus) {
      $(".FAQ_modify").hide();
    } else {
      $(".FAQ_modify").show();
    }
  };
  const [FAQ_deleteStatus, setFAQ_delete] = useState(0);
  const hide = () => {
    setFAQ_delete(!FAQ_deleteStatus);
    if (FAQ_deleteStatus) {
      $(".FAQ_delete").hide();
    } else {
      $(".FAQ_delete").show();
    }
  };

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
        />
        <Ticket
          type="faq"
          title={"I want to modlify my account information"}
          question={"I have trouble logging in with my account"}
          answer={
            "Please click on forgot my password button to reset your password."
          }
        />
        <Ticket
          type="faq"
          title={"I want to delete my account"}
          question={"I have trouble logging in with my account"}
          answer={
            "Please click on forgot my password button to reset your password."
          }
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
