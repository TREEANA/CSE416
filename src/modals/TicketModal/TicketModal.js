import React, { useState } from "react";
import "./TicketModal.css";
import $ from "jquery";
import {
  BsXLg,
  BsFilePlusFill,
  BsFillCheckCircleFill,
  BsThreeDots,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import Ticket from "../../components/Ticket/Ticket";

const TicketModal = ({ ticketModalStatus, toggleTicketModal }) => {
  //
  // const { ticketID } = useParams();
  // const fetchTicket = async (ticketID) => {
  //   try {
  //     const res = await axios.get(`/api/support-tickets/${ticketID}`);
  //     setTicket(res.data);
  //     console.log(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  //새로 만드는 ticket에 관한 useState
  const [tempTicket, setTempTicket] = useState({
    ticketTitle: "",
    ticketContent: "",
    createdAt: "",
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
    console.log(name);
    console.log(value);
    let newTempTicket = {
      ...tempTicket,
      [name]: value,
    };
    setTempTicket(newTempTicket);
    // console.log(newTempTicket);
    // saveQuestionsOnServer(newTempQuestion);
  };

  // <div className="view_body">
  //   <div className="view_graph">
  //     <div className="view_wrapper">
  //       <div className="view_graphWrapper">
  //         {tempQuestions
  //           .slice()
  //           .reverse()
  //           .map((question) => (
  //             // displayData(question)
  //             <ViewData
  //               question={question}
  //               responses={tempResponses}
  //               key={question._id}
  //             />
  //           ))}
  //       </div>
  //     </div>
  //   </div>
  // </div>;

  return (
    <>
      <div
        className={ticketModalStatus ? "ticketModal" : "ticketModal--inactive"}
      >
        <div className="ticketModal__container">
          <div className="ticketModal__header">
            <div className="ticketModal__headerTitle">view tickets</div>
            <BsXLg
              className="ticketModal__topClose"
              onClick={toggleTicketModal}
            />
          </div>
          <div className="ticketModal__create" onClick={toggleTempTicket}>
            <BsFillPlusCircleFill />
            create a new ticket
          </div>
          {ticketVisible && (
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
                {/* <hr></hr> */}
                <div className="ticketModal__tempTitle">
                  <div className="ticketModal__tempTitleTitle">Title </div>
                  <input
                    name="ticketTitle"
                    type="text"
                    className="ticketModal__tempTitleInput"
                    placeholder="Title"
                    onChange={onChange}
                    value={tempTicket.ticketTitle || ""}
                  ></input>
                </div>
                <hr></hr>
                <div className="ticketModal__tempContent">
                  <div className="ticketModal__tempContentTitle">Content</div>
                  <input
                    name="ticketContent"
                    type="text"
                    className="ticketModal__tempContentInput"
                    placeholder="Have any issues? Feel free to report it to us! \n 사실 지금 새벽 두시반.. 졸라리 늦은ㅅ ㅣ간.. 눈이 너무 감기는데 한게 없어서 감기면 안돼.. 진짜로..."
                    onChange={onChange}
                    value={tempTicket.ticketContent || ""}
                  ></input>
                </div>
                <div className="ticketModal__button">
                  {/* <div></div> */}
                  <button
                    className="ticketModal__tempSubmit"
                    onClick={toggleTempTicket}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
          <Ticket
            type="ticket"
            ticketStatus={0}
            title={"Trouble Logging in"}
            question={"I have trouble logging in with my account"}
            answer={
              "Please click on forgot my password button to reset your password."
            }
          />
          <Ticket
            type="ticket"
            ticketStatus={1}
            title={"Trouble Logging in"}
            question={"I have trouble logging in with my account"}
            answer={
              "Please click on forgot my password button to reset your password."
            }
          />
        </div>
      </div>
    </>
  );
};

export default TicketModal;
