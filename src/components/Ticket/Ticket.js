import React, { useState } from "react";
import "./Ticket.css";
// import $ from "jquery";
import {
  BsXLg,
  BsFilePlusFill,
  BsFillCheckCircleFill,
  BsThreeDots,
} from "react-icons/bs";

const Ticket = ({ type, ticketStatus, title, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  const displayTicketStatus = () => {
    if (type === "faq") {
      return;
    } else if (type === "ticket") {
      if (ticketStatus === 0) {
        return (
          <div className="ticket__progress ticket__progress--0">
            <BsFillCheckCircleFill />
          </div>
        );
      } else if (ticketStatus === 1) {
        return (
          <div className="ticket__progress ticket__progress--1">
            <BsThreeDots />
          </div>
        );
      }
    }
  };
  const displayAnswer = () => {
    if (type === "faq") {
      return (
        <div className="ticket__answer">
          <b>A</b>
          {answer}
        </div>
      );
    } else if (type === "ticket") {
      if (ticketStatus === 0) {
        return (
          <div className="ticket__answer">
            <b>A</b>
            {answer}
          </div>
        );
      }
    }
  };
  return (
    <div className="ticket__cont">
      <div
        className={
          type === "faq"
            ? "ticket__button ticket__button--faq"
            : "ticket__button"
        }
        onClick={onClick}
      >
        <div className="ticket__buttonTxt">{title}</div>
        {displayTicketStatus()}
      </div>
      <div
        className={isOpen ? "ticket__box" : "ticket__box ticket__box--close"}
      >
        <div className="ticket__question">
          <b>Q</b>
          {question}
        </div>
        {displayAnswer()}
      </div>
    </div>
  );
};

export default Ticket;
