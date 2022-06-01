import React, { useState } from "react";
import "./FaqPage.css";
import FAQ from "../../components/FAQ/FAQ";

const FaqPage = () => {
  // FAQ data for mapping
  const FAQdata = {
    // {
    //   title: "I cannot add winelists to my favorites",
    //   question: "I cannot log in ",
    //   answer: "you should try logging in again",
    //   // Nissan: [
    //   //   { model: "Sentra", doors: 4 },
    //   //   { model: "Maxima", doors: 4 },
    //   //   { model: "Skyline", doors: 2 },
    //   // ],
    //   // Ford: [
    //   //   { model: "Taurus", doors: 4 },
    //   //   { model: "Escort", doors: 4 },
    //   // ],
    // },
    // {
    //   title: "I cannot add winelists to my favorites2",
    //   question: "I cannot log in2 ",
    //   answer: "you should try logging in again2",
    // },
  };

  const displayFAQ = () => {
    let result = [];
    FAQdata.forEach((each, index) => {
      result.push(<FAQ data={each} key={index} />);
    });
  };
  return (
    <>
      <div className="FAQpage">
        <div className="FAQpage__title">FAQ</div>
        {/* {displayFAQ()} */}
        <FAQ />
        {/* <Ticket
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
        /> */}
      </div>
    </>
  );
};

export default FaqPage;
