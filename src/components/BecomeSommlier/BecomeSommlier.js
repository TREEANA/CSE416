import React, { useState } from "react";
import { BsXLg,BsFilePlusFill} from "react-icons/bs";
import "./BecomeSommlier.css";
import $ from "jquery";
const BecomeSommlier = ({becomeSommlierModalStatus,togglebecomeSommlierModal}) => {
    
    const  choose= () => {
        $('.becomesommlier__section1').hide();
        $('.becomesommlier__section2').show();
      };

      const  submit= () => {
        $('.becomesommlier__section2').hide();
        $('.becomesommlier__section3').show();
      };

      const  close= () => {
        $('.becomesommlier__section2').hide();
        $('.becomesommlier__section3').hide();
        $('.becomesommlier__section1').show();
      };


    return (
        <>
         <div className={becomeSommlierModalStatus ? "becomesommlier": "becomesommlier--inactive"}>
            <div className="becomesommlier__container"> 
                <div className="becomesommlier__header">
                        <div className="becomesommlier__header__title" >become sommlier</div> 
                        <BsXLg className = "becomesommlier__top-close" onClick = {togglebecomeSommlierModal}/>
                </div>
                <div className="becomesommlier__section1">
                    <div className="becomesommlier__create"> <BsFilePlusFill className="becomesommlier__create__icon" onClick={choose}/> Choose a photo of your sommlier certiticate to be verified </div>
                    <div className="becomesommlier__history">view request history</div>
                </div>

                <div className="becomesommlier__section2">
                    <div className="becomesommlier_poto">image</div>
                    <div className="becomesommlier__button" onClick={submit}>Submit</div>
                </div>

                <div className="becomesommlier__section3">
                    <div className="becomesommlier__section3_font" onClick={close}>Submission complete!<br></br>
                    The rsult will be notified in 2-3 businness days</div>
                </div>
               

            </div>
         </div>
        </>
        
        );
        
};

export default BecomeSommlier;