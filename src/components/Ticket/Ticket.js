import React, { useEffect, useState } from "react";
import "./Ticket.css";
import {
  BsFilePlusFill,
  BsFillCheckCircleFill,
  BsThreeDots,
} from "react-icons/bs";

const ticketDummyData = {
  ticketID: 1,
  userID: 1,
  username: "zzaerynn",
  adminID: 9999,
  title: "I cannot add winelists to my favorites",
  userQuestion:
    "Everytime I click the add to favorites button, it somehow does not work",
  adminResponse:
    "This is now fixed! try it again and tell us if it still doesnt work",
  createdAt: "2022-04-04 18:11:12",
  lastUpdatedAt: "2022-04-04 18:11:12",
};

const Ticket = ({ type, ticketData = ticketDummyData }) => {
  const [tempTicket, setTempTicket] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  //ticket status (0 : not answered (pending, yellow), 1: answered (green))
  const [ticketStatus, setTicketStatus] = useState(0);
  //load status for each ticket when page is initially loaded
  useEffect(() => {
    if (ticketData.adminID === "null") {
      setTicketStatus(0);
    } else {
      setTicketStatus(1);
    }
    setTempTicket(ticketData);
  }, []);

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

  // const displayAnswer = () => {
  //   if (type === "faq") {
  //     return (
  //       // <div className="ticket__answer">
  //         {tempTicket.adminResponse}
  //       // </div>
  //     );
  //   } else if (type === "ticket") {
  //     if (ticketStatus === 0) {
  //       return (
  //         // <div className="ticket__answer">

  //           {tempTicket.adminResponse}
  //         {/* </div> */}
  //       );
  //     }
  //     //verification ticket은 다른 모달/페이지/컴포 사용
  //     // } else if (type === "verify") {
  //     //   if (ticketStatus === 0) {
  //     //     return (
  //     //       <div className="ticket__answer">
  //     //         <b>{"hella assignment"}</b>
  //     //       </div>
  //     //     );
  //     //   }
  //   }
  // };

  const onChange = (e) => {
    const { value, name } = e.target;
    let tempNewTicket = {
      ...tempTicket,
      [name]: value,
    };
    setTempTicket(tempNewTicket);
    console.log("tempTicket OnChange:", tempNewTicket);
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
          <b>Q</b> <br />
          {tempTicket.userQuestion}
        </div>
        <hr></hr>
        <div className="ticket__answer">
          <b>A.</b>
          <textarea
            className="ticket__answerInput"
            //read only only if when adminId is not null
            //(implies that another admin has already answered this ticket)
            readOnly={ticketData.adminID !== null}
            name="adminResponse"
            onChange={onChange}
            value={
              tempTicket.adminResponse !== "" ? tempTicket.adminResponse : ""
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
};
``;

export default Ticket;
