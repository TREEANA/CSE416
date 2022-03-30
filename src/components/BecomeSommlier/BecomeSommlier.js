import React, { useState } from "react";
import { BsXLg, BsFillPlusCircleFill } from "react-icons/bs";
import "./BecomeSommlier.css";
import $ from "jquery";
const BecomeSommlier = ({
  becomeSommlierModalStatus,
  togglebecomeSommlierModal,
}) => {
  const choose = () => {
    $(".becomesommlier__section1").hide();
    $(".becomesommlier__section2").show();
  };

  const submit = () => {
    $(".becomesommlier__section2").hide();
    $(".becomesommlier__section3").show();
  };

  const close = () => {
    $(".becomesommlier__section2").hide();
    $(".becomesommlier__section3").hide();
    $(".becomesommlier__section1").show();
  };

  return (
    <>
      <div
        className={
          becomeSommlierModalStatus
            ? "becomesommlier"
            : "becomesommlier--inactive"
        }
      >
        <div className="becomesommlier__container">
          <div className="becomesommlier__header">
            <div className="becomesommlier__header__title">become sommlier</div>
            <BsXLg
              className="becomesommlier__top-close"
              onClick={togglebecomeSommlierModal}
            />
          </div>
          <div className="becomesommlier__section1">
            <div className="becomesommlier__create" onClick={choose}>
              <BsFillPlusCircleFill className="becomesommlier__create__icon" />
              Choose a photo of your sommlier certiticate to be verified{" "}
            </div>
            <div className="becomesommlier__history">view request history</div>
          </div>

          <div className="becomesommlier__section2">
            <img
              className="becomesommlier_poto"
              src="https://mblogthumb-phinf.pstatic.net/MjAxOTAzMjJfMjA2/MDAxNTUzMjI3NDU5NzU0.MB7x7Bu9pbwOeZ_vXg11Q8MstK3C6MkAZ6UnhQ6ki0Yg.rOy-j6vpy3UbmWMEnBNo2LJLrV9lKzDUvMoeTGU-elAg.JPEG.onwinnersmd/2.jpg?type=w800"
            ></img>
            <div className="becomesommlier__button" onClick={submit}>
              Submit
            </div>
          </div>

          <div className="becomesommlier__section3">
            <div className="becomesommlier__section3_font" onClick={close}>
              Submission complete!<br></br>
              The rsult will be notified in 2-3 businness days
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeSommlier;
