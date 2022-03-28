import React, { useState } from "react";
import "./Ticket.css";
import $ from "jquery";
import { BsXLg,BsFilePlusFill,BsFillCheckCircleFill,BsThreeDots  } from "react-icons/bs";
const Ticket = ({ticketModalStatus,toggleTicketModal}) => {

    const [TicketAnswerStatus, setTicketAnswerStatus] = useState(0);
    const answer = () => {
        setTicketAnswerStatus(!TicketAnswerStatus);
        if (TicketAnswerStatus){
          $('.ticket_answer').hide();
        }else{
          $('.ticket_answer').show();};
      };


    return (
        <>
        <div className={ticketModalStatus ? "ticket": "ticket--inactive"}>
            
            <div className="ticket__container"> 
                <div className="ticket__header">
                    <div className="ticket__header-title" >view tickets</div> 
                    <BsXLg className = "ticket__top-close" onClick = {toggleTicketModal}/>
                </div>
                <div className="ticket__create"> <BsFilePlusFill/> create a new ticket </div>
                <div className="ticket__button__container">
                    <div className="ticket__button">
                        <div className="ticket__button__text">Trouble Changing Password</div>
                        <div className="ticket__progressicon"><BsThreeDots/></div>
                    </div>
            
                </div>
                <div className="ticket__button__container">
                    <div className="ticket__button">
                        <div className="ticket__button__text">Trouble Logging in</div>
                        <div className="ticket__progressicon"><BsThreeDots/></div>
                    </div>
                </div>

                <div className="ticket__button__container">
                    <div className="ticket__button">
                        <div className="ticket__button__text">What should I do?</div>
                        <div className="ticket_checkicon"><BsFillCheckCircleFill onClick={answer}/></div>
                    </div>
                    <div className="ticket_answer"><b>Q</b> I forget my password, What should I do </div>
                    <div className="ticket_answer"><b>A</b> You can reset your password on the login page </div>
                </div>
         
                
            </div>
            
        
        </div>
        </>
        
        );
};

export default Ticket;