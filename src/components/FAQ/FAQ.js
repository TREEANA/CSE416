import React, { useState } from "react";
import "./FAQ.css";
import $ from "jquery";


const FAQ = () => {
  const [FAQ_resetStatus, setFAQ_reset] = useState(0);
  const reset = () => {
    setFAQ_reset(!FAQ_resetStatus);
    if (FAQ_resetStatus){
      $('.FAQ_reset').hide();
    }else{
      $('.FAQ_reset').show();

    }
    ;
   
  };
  
  const [FAQ_modifyStatus, setFAQ_modify] = useState(0);
  const modify = () => {
    setFAQ_modify(!FAQ_modifyStatus);
    if (FAQ_modifyStatus){
      $('.FAQ_modify').hide();
    }else{
      $('.FAQ_modify').show();

    }
    ;
   
  };
  const [FAQ_deleteStatus, setFAQ_delete] = useState(0);
  const hide = () => {
    setFAQ_delete(!FAQ_deleteStatus);
    if (FAQ_deleteStatus){
      
      $('.FAQ_delete').hide();
    }else{
      $('.FAQ_delete').show();

    }
    ;
   
  };
    return (
    <>
    <div className="FAQ">
       <div className ="FAQ__name">FAQ</div>

       <div className="FAQ_container">
        <div className="FAQ__button" onClick={reset}>  I want to reset my password</div>
        <div className="FAQ_reset"><b>Q</b> default </div>
        <div className="FAQ_reset"><b>A</b> default </div>
      </div>

       <div className="FAQ_container">
        <div className="FAQ__button" onClick={modify}>  I want to modlify my account information</div>
        <div className="FAQ_modify"><b>Q</b> default </div>
        <div className="FAQ_modify"><b>A</b> default </div>
      </div>

        <div className="FAQ_container">
          <div className="FAQ__button" onClick={hide}>I want to delete my account</div>
          <div className="FAQ_delete"><b>Q</b> I want to delete my account </div>
          <div className="FAQ_delete"><b>A</b> Go to my Page and click "Delete my account" </div>
        </div>

      </div>

             
    </>
  );
};

export default FAQ;