import React, { useEffect, useState } from "react";
import "./FAQ.css";
import {
  BsFilePlusFill,
  BsFillCheckCircleFill,
  BsThreeDots,
} from "react-icons/bs";
import axios from "axios";

const FAQdummydata = {
  title: "I cannot add winelists to my favorites",
  question: "I cannot log in ",
  answer: "you should try logging in again",
};

const FAQ = ({ data = FAQdummydata }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="FAQ">
        <div className="FAQ__header" onClick={toggleIsOpen}>
          <div>{data.title}</div>
        </div>
        <div className={isOpen ? "faq__box" : "faq__box faq__box--close"}>
          <div className="faq__question">
            <b>Q. </b>
            {data.question}
          </div>
          <hr></hr>
          <div className="faq__answer">
            <b>A. </b>
            {data.answer}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
