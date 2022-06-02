import "./TicketAdminModal.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Ticket from "../../components/Ticket/Ticket";
import { BsXLg } from "react-icons/bs";

const TicketAdminModal = ({ status, toggleStatus }) => {
  //support tickets retreived from adminID
  const [supportTickets, setSupportTickets] = useState([]);

  //userID of Admin: fetched from status
  // const userID = status.userID;
  // //
  // const userStatus = status.userinfo.status;
  //fetch tickets from db
  const fetchAdminTickets = async (userID) => {
    try {
      const res = await axios.get(
        `/api/support-tickets/?userID=${status.userID}`
      );
      console.log("res.data from fetchAdminTickets: ", res.data);
      setSupportTickets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [userStatus, setUserStatus] = useState(-1);

  const fetchUserData = async (userID) => {
    try {
      const res = await axios.get(`/api/users/${userID}`);
      console.log("fetchUserData from TicketAdminModal: ", res.data);
      setUserStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData(status.userID);
  }, []);

  useEffect(() => {
    console.log(
      "log from useEffect, TicketAdminModal : userStatus is ",
      status.userinfo.status
    );
    if (status.userinfo.status === 2) {
      fetchAdminTickets(status.userID);
    }
  }, []);

  //refers to "status" in api calls
  // 0 (all the tickets), 1(answered tickets), 2(pending tick           ets)
  const [viewStatus, setViewStatus] = useState(0);

  const displayAdminTickets = (viewStatus) => {
    let result = [];
    if (viewStatus === 0) {
      supportTickets.forEach((each, index) => {
        result.push(<Ticket type="ticket" ticketData={each} key={index} />);
      });
    } else if (viewStatus === 1) {
      supportTickets.forEach((each, index) => {
        if (each.adminID !== null) {
          result.push(<Ticket type="ticket" ticketData={each} key={index} />);
        }
      });
    } else if (viewStatus === 2) {
      supportTickets.forEach((each, index) => {
        if (each.adminID === null) {
          result.push(<Ticket type="ticket" ticketData={each} key={index} />);
        }
      });
    }
    return result;
  };

  return (
    <>
      <div
        className={
          status.ticketAdminModal ? "ticketAdmin" : "ticketAdmin--inactive"
        }
      >
        <div className="ticketAdmin__container">
          <div className="ticketAdmin__header">
            <div className="ticketAdmin__title"> Manage Tickets</div>
            <BsXLg
              className="ticketAdmin__close"
              onClick={() => {
                toggleStatus("ticketAdminModal");
              }}
            />
          </div>
          <div className="ticketAdmin__status">
            <div className="ticketAdmin__statusIcon">
              <button
                className={
                  viewStatus === 0
                    ? "ticketAdmin__statusButton--active ticketAdmin__statusButton"
                    : "ticketAdmin__statusButton"
                }
                onClick={() => {
                  setViewStatus(0);
                }}
              >
                show all
              </button>
            </div>
            <div className="ticketAdmin__statusIcon">
              <button
                className={
                  viewStatus === 1
                    ? "ticketAdmin__statusButton--active ticketAdmin__statusButton"
                    : "ticketAdmin__statusButton"
                }
                onClick={() => {
                  setViewStatus(1);
                }}
              >
                show only answered
              </button>
            </div>
            <div className="ticketAdmin__statusIcon">
              <button
                className={
                  viewStatus === 2
                    ? "ticketAdmin__statusButton--active ticketAdmin__statusButton"
                    : "ticketAdmin__statusButton"
                }
                onClick={() => {
                  setViewStatus(2);
                }}
              >
                show only pending
              </button>
            </div>
          </div>

          <div className="ticketAdmin__tickets">
            {displayAdminTickets(viewStatus)}
            {/* <Ticket status={status} type="ticket" />
            <Ticket status={status} type="ticket" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketAdminModal;
