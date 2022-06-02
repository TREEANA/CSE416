import React, { useState } from "react";
import "./FaqPage.css";
import FAQ from "../../components/FAQ/FAQ";

const FaqPage = () => {
  // FAQ data for mapping
  const FAQdata1 = {
    title: "I want to reset my password",
    question: "I have trouble logging in with my account",
    answer:
      "Please try agan with another browser - Our recommendation of choice for this website is Google Chrome.  ",
  };

  const FAQdata2 = {
    title: "Registering multiple Accounts",
    question: "Is having multiple accounts possible?",
    answer:
      "Yes. it is possible. You can register as many as google accounts you have, and each account can have different user status(rank) - such as general user, sommelier, and admin account ",
  };

  const FAQdata3 = {
    title: "Sommelier badge",
    question: "How can I get sommlier badge?",
    answer:
      "If you are a general user right now, you have to submit a picture of your sommelier verification. Clicking on the sidebar would show you the 'become sommelier' button at the end of the items ",
  };

  const FAQdata4 = {
    title: "Wine List",
    question: " How can I make wine list? ",
    answer:
      "The minimum requirement is that you should be a sommelier-level user to create a wine list. If you are not, please apply for sommelier verification through 'become sommelier' on the sidebar. If you are already a sommelier, click on 'Create Wine List' from the top of the sidebar. ",
  };
  const FAQdata5 = {
    title: "Verification of sommelier certificate",
    question: "When will the verification result be out ? ",
    answer:
      "The administrators are manually checking the verification, so we need some time to go over your request. On average, it takes 1~2 business days to be fully processed.",
  };

  // const displayFAQ = () => {
  //   let result = [];
  //   FAQdata.forEach((each, index) => {
  //     result.push(<FAQ data={each} key={index} />);
  //   });
  // };
  return (
    <>
      <div className="FAQpage">
        <div className="FAQpage__title">FAQ</div>
        {/* {displayFAQ()} */}
        <div className="FAQpage__part">Part 1 : Login</div>
        <hr />
        <FAQ data={FAQdata1} />
        <FAQ data={FAQdata2} />
        <div className="FAQpage__part">Part 2 : Sommelier</div>
        <hr />
        <FAQ data={FAQdata3} />
        <FAQ data={FAQdata4} />
        <FAQ data={FAQdata5} />
      </div>
    </>
  );
};

export default FaqPage;
