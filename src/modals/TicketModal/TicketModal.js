import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import "./TicketModal.css";
import {
  BsXLg,
  BsFilePlusFill,
  BsFillCheckCircleFill,
  BsThreeDots,
  BsFillPlusCircleFill,
} from "react-icons/bs";

import Ticket from "../../components/Ticket/Ticket";
import Loader from "../../components/Loader/Loader";

import axios from "axios";

const TicketModal = ({ status, toggleStatus }) => {
  //새로 만드는 ticket에 관한 useState
  const [tempSuppTicket, setTempSuppTicket] = useState({
    ticketTitle: "",
    ticketContent: "",
  });

  //새로 만드는 ticket의 visibility property
  const [ticketVisible, setTicketVisible] = useState(0);
  const toggleTempTicket = () => {
    setTicketVisible(!ticketVisible);
  };

  //새로 만드는 Ticket의 input onChange
  //근데 아직 서버에 저장은 안하는,, 로컬에만 저장됨
  const onChange = (e) => {
    const { value, name } = e.target;
    let newTempSuppTicket = {
      ...tempSuppTicket,
      [name]: value,
    };
    setTempSuppTicket(newTempSuppTicket);
    // console.log(newTempTicket);
    // saveQuestionsOnServer(newTempQuestion);
  };

  //user가 이전에 submit한 티켓들
  const [prevTickets, setPrevTickets] = useState([]);

  // const userID = status.userID;
  //fetch tickets that the user has previously sent

  //page number
  const [pageNum, setPageNum] = useState(1);
  const [numTicket, setNumTicket] = useState(8);

  const fetchUserTickets = async () => {
    try {
      if (status.userID) {
        const res = await axios.get(
          `/api/support-tickets/?userID=${status.userID}&num=${
            numTicket * pageNum
          }`
        );

        // console.log("res.data from fetchUserTickets: ", res.data);
        setPrevTickets(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (status.userID) {
    fetchUserTickets(status.userID);
    // }
  }, []);

  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inView && !loading) {
      setPageNum(pageNum + 1);
    }
  }, [inView]);

  useEffect(async () => {
    setLoading(true);
    await fetchUserTickets();
    setLoading(false);
  }, []);

  useEffect(async () => {
    setLoading(true);
    await fetchUserTickets();
    setLoading(false);
  }, [pageNum]);

  const onSubmit = async () => {
    const body = {
      userID: status.userID,
      title: tempSuppTicket.ticketTitle,
      userQuestion: tempSuppTicket.ticketContent,
    };
    try {
      console.log("onSubmit body: ", body);
      const res = await axios.post(`/api/support-tickets`, body);
      console.log("onSubmit from TicketModal: ", res.data);
    } catch (error) {
      console.log(error);
    }
    fetchUserTickets(status.userID);
  };

  const [viewStatus, setViewStatus] = useState(0);

  const displayUserTickets = (viewStatus) => {
    let result = [];
    if (viewStatus === 0) {
      prevTickets.forEach((each, index) => {
        result.push(
          <div className="ticketModal__eachTicket">
            <div className="ticketModal__eachTicketNum"> {index + 1}</div>
            <Ticket
              type="ticket"
              ticketData={each}
              key={index}
              status={status}
            />
          </div>
        );
      });
    } else if (viewStatus === 1) {
      prevTickets.forEach((each, index) => {
        if (each.status === 1) {
          result.push(
            <div className="ticketModal__eachTicket">
              <div className="ticketModal__eachTicketNum"> {index + 1}</div>
              <Ticket
                type="ticket"
                ticketData={each}
                key={index}
                status={status}
              />
            </div>
          );
        }
      });
    } else if (viewStatus === 2) {
      prevTickets.forEach((each, index) => {
        if (each.status === 2) {
          result.push(
            <div className="ticketModal__eachTicket">
              <div className="ticketModal__eachTicketNum"> {index + 1}</div>
              <Ticket
                type="ticket"
                ticketData={each}
                key={index}
                status={status}
              />
            </div>
          );
        }
      });
    }
    return result;
  };

  return (
    <>
      <div
        className={status.ticketModal ? "ticketModal" : "ticketModal--inactive"}
      >
        <div className="ticketModal__container">
          <div className="ticketModal__header">
            <div className="ticketModal__headerTitle">view tickets</div>
            <BsXLg
              className="ticketModal__topClose"
              onClick={() => {
                toggleStatus("ticketModal");
              }}
            />
          </div>
          {status.userinfo.status !== -1 && status.userinfo.status !== 2 && (
            <div className="ticketModal__create" onClick={toggleTempTicket}>
              <BsFillPlusCircleFill />
              create a new ticket
            </div>
          )}
          {ticketVisible ? (
            <>
              <div className="ticketModal__temp">
                <div className="ticketModal__title">
                  <div className="ticketModal__titleTitle">New Ticket</div>
                  {/* <button className="ticketModal__tempSubmit">Submit</button> */}
                  <BsXLg
                    className="ticketModal__close"
                    onClick={toggleTempTicket}
                  />
                </div>
                <div className="ticketModal__tempTitle">
                  <div className="ticketModal__tempTitleTitle">Title </div>
                  <input
                    name="ticketTitle"
                    // type="text"
                    className="ticketModal__tempTitleInput"
                    placeholder="Title"
                    onChange={onChange}
                    value={tempSuppTicket.ticketTitle || ""}
                  ></input>
                </div>
                <hr></hr>
                <div className="ticketModal__tempContent">
                  <div className="ticketModal__tempContentTitle">Content</div>
                  <input
                    name="ticketContent"
                    // type="text"
                    className="ticketModal__tempContentInput"
                    placeholder="Have any issues? Feel free to report it to us! \n 사실 지금 새벽 두시반.. 졸라리 늦은ㅅ ㅣ간.. 눈이 너무 감기는데 한게 없어서 감기면 안돼.. 진짜로..."
                    onChange={onChange}
                    value={tempSuppTicket?.ticketContent || ""}
                  />

                  {/* </input> */}
                </div>
                <div className="ticketModal__button">
                  <button
                    className="ticketModal__tempSubmit"
                    onClick={() => {
                      toggleTempTicket();
                      onSubmit();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
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
          {displayUserTickets(viewStatus)}
          <div ref={ref}>{loading && <Loader />}</div>
          {/* <Ticket status={status} />
          <Ticket status={status} /> */}
        </div>
      </div>
    </>
  );
};

export default TicketModal;
