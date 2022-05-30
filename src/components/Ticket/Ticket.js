import React, { useEffect, useState } from "react";
import "./Ticket.css";
import {
  BsFilePlusFill,
  BsFillCheckCircleFill,
  BsThreeDots,
} from "react-icons/bs";
import axios from "axios";

const ticketDummyData = {
  ticketID: 1,
  userID: 1,
  username: "zzaerynn",
  adminID: null,
  title: "I cannot add winelists to my favorites",
  userQuestion:
    "Everytime I click the add to favorites button, it somehow does not work",
  adminResponse: "",
  createdAt: "2022-04-04 18:11:12",
  lastUpdatedAt: "2022-04-04 18:11:12",
};

const Ticket = ({ status, type, ticketData = ticketDummyData }) => {
  //temporary ticketData
  const [tempTicket, setTempTicket] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  // // isAnswered : whether the ticket ifself already has answers or not
  // const [isAnswered, setIsAnswered] = useState(0);
  // const checkIsAnswered = () => {
  //   if (tempTicket.adminID === null && tempTicket.adminResponse === "") {
  //     setIsAnswered(1);
  //   }
  // };

  //ticket status (0 : not answered (pending, yellow), 1: answered (green))
  const [ticketStatus, setTicketStatus] = useState(0);
  //load status for each ticket when page is initially loaded
  useEffect(() => {
    if (ticketData.adminID === null) {
      setTicketStatus(0);
    } else {
      setTicketStatus(1);
    }
    setTempTicket(ticketData);
    // checkIsAnswered();
    console.log(
      "ticketStatus : ",
      ticketStatus,
      "tempTicket.adminRespone: ",
      tempTicket.adminResponse,
      "readOnly value : ",
      ticketStatus === 1 || userStatus !== 2
    );
  }, []);
  // current user Status, to check whether one can edit the textarea
  const userStatus = status.userinfo.status;
  const userID = status.userID;
  const displayTicketStatus = () => {
    if (type === "faq") {
      return;
    } else if (type === "ticket") {
      if (ticketStatus === 0) {
        return (
          //pending
          <div className="ticket__progress ticket__progress--0">
            <BsThreeDots />
          </div>
        );
      } else if (ticketStatus === 1) {
        return (
          // approved(answered)
          <div className="ticket__progress ticket__progress--1">
            <BsFillCheckCircleFill />
          </div>
        );
      }
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    let tempNewTicket = {
      ...tempTicket,
      [name]: value,
    };
    setTempTicket(tempNewTicket);
    console.log("tempTicket OnChange:", tempNewTicket);
  };

  const onSubmit = () => {
    const body = {
      adminID: userID,
      adminResponse: tempTicket.adminResponse,
      ticketID: tempTicket.ticketID,
    };
    try {
      const res = axios.put(`/api/support-tickets/answer`, body);
      console.log("res.data from onSubmit: ", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ticket__cont">
      <div
        className={
          type === "faq"
            ? "ticket__button ticket__button--faq"
            : // : type === "verify"
              // ? "ticket__button ticket__verify"
              "ticket__button"
        }
        onClick={onClick}
      >
        <div className="ticket__buttonTxt">{tempTicket.title}</div>
        {displayTicketStatus()}
      </div>
      <div
        className={isOpen ? "ticket__box" : "ticket__box ticket__box--close"}
      >
        <div className="ticket__question">
          <b>Q</b>
          <br />
          {tempTicket.userQuestion}
        </div>
        <hr></hr>
        <div className="ticket__answer">
          <b>A.</b>
          <textarea
            className="ticket__answerInput"
            //readOnly if adminId is not null(answered) or if userStatus is not Admin
            //(implies that another adㅇmin has already answered this ticket)
            readOnly={ticketStatus === 1 || userStatus !== 2}
            //readonly iff the ticket is already answered
            name="adminResponse"
            onChange={onChange}
            // value = when already answered, show adminResponse
            value={
              ticketStatus === 1 && tempTicket?.adminResponse
                ? ""
                : tempTicket?.adminResponse
            }
            // placeholder={ticketStatus === 1 ? "" : "Not answered yet"}
            placeholder="Not answered yet"
          ></textarea>
        </div>
        <div className="ticket__submit">
          <button className="ticket__submitButton" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
